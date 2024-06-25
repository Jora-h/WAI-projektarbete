import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const SetPassword = () => {
  const [success, setSuccess] = useState(null);
  const [password, setPassword] = useState("");
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");

  const handleSetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/invites/set-password`,
        { token, password }
      );
      setSuccess(true);
    } catch (err) {
      console.error("Setting password failed:", err);
      setSuccess(false);
    }
  };

  return (
    <form onSubmit={handleSetPassword}>
      <h1>Set Password</h1>
      {success &&
        typeof success === "boolean" &&
        "Password changed successfully!"}
      {!success && typeof success === "boolean" && "Something went wrong"}
      <input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setSuccess(null);
        }}
        placeholder="New Password"
      />
      <button type="submit">Set Password</button>
    </form>
  );
};

export default SetPassword;
