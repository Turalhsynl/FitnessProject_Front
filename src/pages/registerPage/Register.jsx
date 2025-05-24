import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "zustand";
import download from "../../assets/download.png";
import { useAuthStore } from "../../common/Store";

const Register = () => {
  const { setTokens } = useStore(useAuthStore);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    age: "",
    email: "",
    password: "",
  });

  const [showCodeModal, setShowCodeModal] = useState(false);
  const [codeInput, setCodeInput] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const registerResponse = await fetch("https://localhost:7298/api/User/Register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });


      if (!registerResponse.ok) {
        const errorData = await registerResponse.json();
        throw new Error(errorData.message || "Qeydiyyat uğursuz oldu.");
      }

      const codeResponse = await fetch("https://localhost:7298/api/GoogleAuth/send-email-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (!codeResponse.ok) {
        const errorData = await codeResponse.json();
        throw new Error(errorData.message || "Kod göndərilə bilmədi.");
      }

      setShowCodeModal(true);
    } catch (err) {
      console.error("Xəta:", err.message);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await fetch("https://localhost:7298/api/GoogleAuth/verify-email-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          code: codeInput,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Code is incorrect.");
      }

      setShowCodeModal(false);
      navigate("/login");
    } catch (err) {
      console.error("Code doesn't checked:", err.message);
    }
  };

  return (
    <div
      className="flex bg-center h-screen items-center justify-center min-h-screen bg-black/55 bg-blend-overlay"
      style={{ backgroundImage: `url(${download})` }}
    >
      <div className="bg-gray-800/40 p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2">First Name</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white"
              required
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white"
              required
              min="0"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition"
          >
            Register
          </button>
          <p className="text-gray-400 text-sm text-center mt-4">
            Already have an account?{" "}
            <span className="text-purple-400 hover:underline cursor-pointer" onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </form>
      </div>

      {showCodeModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 bg-opacity-50">
          <div className="bg-white p-6 w-[500px] h-[200px] rounded shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4 text-center">Enter 6 digit code from Email</h3>
            <input
              type="text"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full mb-4"
              placeholder="Code"
            />
            <button
              onClick={handleVerifyCode}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded w-full"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
