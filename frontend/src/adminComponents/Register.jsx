import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";
import {Link} from 'react-router-dom'
import { message } from "antd";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role,setRole]=useState("admin")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/admin/adminData", {
        name,
        email,
        password,
        role
      });
      message.success("Admin created successfully! Now login")
      console.log(data);
    } catch (error) {
      message.error(error.response.data.message || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
