const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("../models/userModel");

const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  const user = await findUserByEmail(email);
  if (user) return res.status(400).send("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  await createUser(username, email, hashedPassword, role || "user");

  res.send("User registered successfully");
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) return res.status(400).send("Email or password is wrong");

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  const token = jwt.sign(
    { _id: user.id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: parseInt(process.env.JWT_EXPIRY) }
  );
  const refreshToken = jwt.sign(
    { _id: user.id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: parseInt(process.env.REFRESH_TOKEN_EXPIRY) }
  );

  res
    .header("auth-token", token)
    .send({ accessToken: token, refreshToken: refreshToken });
};

// Additional methods for logout, refresh token, etc.

module.exports = { register, login };
