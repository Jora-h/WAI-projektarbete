import React, { useState } from "react";
import axios from "axios";

const InviteUser = () => {
  const [success, setSuccess] = useState(null);
  const [email, setEmail] = useState("");

  const handleInvite = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.REACT_APP_API_URL}/invites/invite`,
        { email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(true);
    } catch (err) {
      console.error("Invite failed:", err);
      setSuccess(false);
    }
  };

  return (
    <form onSubmit={handleInvite}>
      <h1>Invite User</h1>
      <p>admin page</p>
      {success && typeof success === "boolean" && `invite sent to ${email}`}
      {!success && typeof success === "boolean" && "Something went wrong"}
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setSuccess(null);
        }}
        placeholder="Email"
      />
      <button type="submit">Invite User</button>
    </form>
  );
};

export default InviteUser;
