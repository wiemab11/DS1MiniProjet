const express = require("express");
const router = express.Router();
//hedha route mt3 authentication
const {
  register,
  login,
  getProfile,
} = require("../controllers/usercontroller");
const auth = require("../middlewares/authmiddlerwares");

router.post("/register", register);

router.post("/login", login);

router.get("/me", auth, getProfile);

module.exports = router;