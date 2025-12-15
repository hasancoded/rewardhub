const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
} = require("../controllers/authController");
const { verifyToken } = require("../middleware/auth");

// @route   POST /api/auth/register
router.post("/register", registerUser);

// @route   POST /api/auth/login
router.post("/login", loginUser);

// @route   GET /api/auth/profile
router.get("/profile", verifyToken, getProfile);

// @route   PUT /api/auth/profile
router.put("/profile", verifyToken, updateProfile);

module.exports = router;
