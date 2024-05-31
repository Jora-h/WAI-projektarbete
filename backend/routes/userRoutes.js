const router = require("express").Router();
const { getUser } = require("../controllers/userController");
const verifyToken = require("../middlewares/authMiddleware");

router.get("/me", verifyToken, getUser);

module.exports = router;
