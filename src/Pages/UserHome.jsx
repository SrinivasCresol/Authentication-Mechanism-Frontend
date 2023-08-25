import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      await axios.get("http://localhost:5000/user/logout", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      });

      sessionStorage.removeItem("userToken");
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("userToken");

    if (token) {
      navigate("/user");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <h1>Hello From User Page</h1>
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
}
