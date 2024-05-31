const router = require("express").Router();
const { inviteUser, setPassword } = require("../controllers/inviteController");
const verifyToken = require("../middlewares/authMiddleware");

router.post("/invite", verifyToken, inviteUser);
router.post("/set-password", setPassword);

module.exports = router;
