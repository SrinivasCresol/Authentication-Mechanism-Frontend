import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminHome() {
  const navigate = useNavigate();

  const logoutAdmin = async () => {
    try {
      await axios.get("http://localhost:5000/user/logout", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
        },
      });
      sessionStorage.removeItem("adminToken");
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");

    if (token) {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <h1>Hello from Admin Page</h1>
      <button onClick={logoutAdmin}>Logout</button>
    </div>
  );
}
