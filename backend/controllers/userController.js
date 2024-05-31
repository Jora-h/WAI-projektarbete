const { findUserByEmail, findUserById } = require("../models/userModel");
const verifyToken = require("../middlewares/authMiddleware");

const getUser = async (req, res) => {
  // const user = await findUserByEmail(req.user.email);
  const user = await findUserById(req.user._id);
  if (!user) return res.status(404).send("User not found");

  res.send(user);
};

// Additional methods for user management

module.exports = { getUser };
