const db = require("../utils/db");

const createUser = async (username, email, password, role) => {
  const [result] = await db.execute(
    "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
    [username, email, password, role]
  );
  return result;
};

const findUserByEmail = async (email) => {
  const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows[0];
};

const findUserById = async (id) => {
  if (!id) {
    throw new Error("ID is required");
  }
  const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0];
};

// Additional methods for user retrieval, update, and delete

module.exports = { createUser, findUserByEmail, findUserById };
