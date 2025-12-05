import React, { useState } from "react";
import {userapi } from "../api/user.api";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = {  email, password };
      
      await userapi.post("/login", data, { withCredentials: true });
      
      toast.success("User logged in successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "logged in failed");
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
     
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
