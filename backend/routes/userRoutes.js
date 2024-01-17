const express = require("express");
const { registerUser, authUser } = require("../controller/userController");
const router = express.Router();

// router.route("/").post(authUser);
// router.route("/signup").post(registerUser);
router.post("/signup", registerUser);
router.post("/", authUser);

module.exports = router;
