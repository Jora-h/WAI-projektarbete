const { findUserByEmail, findUserById } = require("../models/userModel");
const verifyToken = require("../middlewares/authMiddleware");

const getUser = async (req, res) => {
  const user = await findUserById(req.user._id);
  if (!user) return res.status(404).send("User not found");

  res.send(user);
};

module.exports = { getUser };
