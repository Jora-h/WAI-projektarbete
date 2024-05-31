const db = require("../utils/db");

const createInvite = async (email, token) => {
  const [result] = await db.execute(
    "INSERT INTO invites (email, token) VALUES (?, ?)",
    [email, token]
  );
  return result;
};

const findInviteByToken = async (token) => {
  const [rows] = await db.execute("SELECT * FROM invites WHERE token = ?", [
    token,
  ]);
  return rows[0];
};

const deleteInviteByEmail = async (email) => {
  const [result] = await db.execute("DELETE FROM invites WHERE email = ?", [
    email,
  ]);
  return result;
};

module.exports = { createInvite, findInviteByToken, deleteInviteByEmail };
