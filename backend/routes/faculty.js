const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const {
  getFacultyStats,
  getRecentActivity,
} = require("../controllers/facultyController");

// All routes require authentication
router.use(verifyToken);

// Middleware to check faculty role
const requireFaculty = (req, res, next) => {
  if (req.user.role !== "faculty") {
    return res.status(403).json({
      msg: "Access denied. Faculty role required.",
    });
  }
  next();
};

router.use(requireFaculty);

// GET /api/faculty/stats
router.get("/stats", getFacultyStats);

// GET /api/faculty/recent-activity
router.get("/recent-activity", getRecentActivity);

module.exports = router;
