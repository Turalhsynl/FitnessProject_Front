import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../common/Store";
import download from "../../assets/download.png";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const Login = () => {
  const { setTokens } = useAuthStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:7298/api/User/Login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data?.data?.accessToken && data?.data?.refreshToken) {
        setTokens(data?.data?.accessToken, data?.data?.refreshToken);

        const accessToken = Cookies.get("accessToken");
        const decodedToken = jwt_decode(accessToken);

        const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

        const cartResponse = await fetch(`https://localhost:7298/api/Cart/get/${userId}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const cartData = await cartResponse.json();

        if (cartResponse.ok && !cartData?.id) {
          const createCartResponse = await fetch("https://localhost:7298/api/Cart/create", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (!createCartResponse.ok) {
            console.error("Yeni səbət yaradılmadı");
          }
        }

        navigate("/");
      } else {
        console.error("Tokenlər cavabda yoxdur:", data);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div
      className="flex bg-center h-screen items-center justify-center min-h-screen bg-black/55 bg-blend-overlay"
      style={{ backgroundImage: `url(${download})` }}
    >
      <div className="bg-gray-800/40 p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="text-right text-sm text-purple-400 hover:underline cursor-pointer mb-4">
            Forgot password?
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition"
          >
            Login
          </button>
          <p className="text-gray-400 text-sm text-center mt-4">
            Don't have an account? <span className="text-purple-400 hover:underline cursor-pointer" onClick={() => navigate("/register")}>Sign Up</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
