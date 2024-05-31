const nodemailer = require("nodemailer");
const {
  createInvite,
  findInviteByToken,
  deleteInviteByEmail,
} = require("../models/inviteModel");
const { createUser } = require("../models/userModel");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const dotenv = require("dotenv");

dotenv.config();

const inviteUser = async (req, res) => {
  const { email } = req.body;
  console.log("email", email);
  const token = crypto.randomBytes(20).toString("hex");

  await createInvite(email, token);

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "You are invited!",
    text: `You are invited! Please set your password here: ${process.env.CLIENT_URL}/set-password?token=${token}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email", "500", error);
      return res.status(500).send("Error sending email");
    }
    res.send("Invitation sent");
  });
};

const setPassword = async (req, res) => {
  const { token, password } = req.body;

  // Find the invite by token
  const invite = await findInviteByToken(token);
  if (!invite) return res.status(400).send("Invalid or expired token");

  // Hash the new password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user
  await createUser("user", invite.email, hashedPassword, "user");

  // Delete the invite
  await deleteInviteByEmail(invite.email);

  res.send("Password set successfully, you can now log in");
};

module.exports = { inviteUser, setPassword };
