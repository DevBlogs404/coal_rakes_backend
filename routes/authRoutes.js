const express = require("express");
const {
  RegisterController,
  LogInController,
  me,
} = require("../controllers/auth/authController");

const router = express.Router();

router.post("/register", RegisterController);

router.post("/log-in", LogInController);
router.get("/user", me);
module.exports = router;
