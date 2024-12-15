import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";
import {message} from 'antd';

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/user/userdata", {
        name,
        email,
        password,
      });
      message.success("User Created",)
      setName('')
      setEmail('')
      setPassword('')
    } catch (error) {
      message.error(error.message || "user creation failed");
    }
  };

  return (
    <div className="auth-container">
      <h1>Create User</h1>
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
        <button type="submit">CreateUser</button>
      </form>
    </div>
  );
};

export default CreateUser;
