// /google-callback səhifəsində
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get("code");

    if (code) {
      fetch(`https://localhost:7298/api/GoogleAuth/google-callback?code=${code}`)
        .then(res => res.json())
        .then(data => {
       
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          navigate("/");
        })
        .catch(err => {
          console.error("Auth error:", err);
        });
    }
  }, []);

  return <div>Included with Google...</div>;
};

export default GoogleCallback;
