const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const { requireRole } = require("../middleware/requireRole");
const adminUserController = require("../controllers/adminUserController");
const adminAchievementController = require("../controllers/adminAchievementController");
const adminPerkController = require("../controllers/adminPerkController");
const adminController = require("../controllers/adminController");

// All admin routes require authentication
router.use(verifyToken);

// ======================
// Faculty-Accessible Routes (faculty + admin)
// ======================

// @route   GET /api/admin/students
// @desc    List all students (for faculty to award achievements)
// @access  Faculty, Admin
router.get(
  "/students",
  requireRole("faculty", "admin"),
  adminUserController.listStudents
);

// ======================
// Admin-Only Routes
// ======================

// @route   POST /api/admin/users
// @desc    Register a new user (admin-only)
// @access  Admin
router.post("/users", requireRole("admin"), adminUserController.registerUser);

// @route   GET /api/admin/users
// @desc    List all users with filters
// @access  Admin
router.get("/users", requireRole("admin"), adminUserController.listUsers);

// @route   PUT /api/admin/users/:id
// @desc    Update user details
// @access  Admin
router.put("/users/:id", requireRole("admin"), adminUserController.updateUser);

// @route   DELETE /api/admin/users/:id
// @desc    Delete user
// @access  Admin
router.delete(
  "/users/:id",
  requireRole("admin"),
  adminUserController.deleteUser
);

// ======================
// Dashboard Statistics
// ======================

// @route   GET /api/admin/dashboard-stats
// @desc    Get comprehensive dashboard statistics
// @access  Admin
router.get(
  "/dashboard-stats",
  requireRole("admin"),
  adminController.getDashboardStats
);

// ======================
// Achievement Management
// ======================

// @route   POST /api/admin/achievements
// @desc    Create a new achievement
// @access  Faculty, Admin
router.post(
  "/achievements",
  requireRole("faculty", "admin"),
  adminAchievementController.createAchievement
);

// @route   GET /api/admin/achievements
// @desc    List all achievements
// @access  Faculty, Admin
router.get(
  "/achievements",
  requireRole("faculty", "admin"),
  adminAchievementController.listAchievements
);

// @route   GET /api/admin/achievements/:id
// @desc    Get single achievement
// @access  Faculty, Admin
router.get(
  "/achievements/:id",
  requireRole("faculty", "admin"),
  adminAchievementController.getAchievement
);

// @route   PUT /api/admin/achievements/:id
// @desc    Update achievement
// @access  Faculty, Admin
router.put(
  "/achievements/:id",
  requireRole("faculty", "admin"),
  adminAchievementController.updateAchievement
);

// @route   DELETE /api/admin/achievements/:id
// @desc    Delete achievement
// @access  Faculty, Admin
router.delete(
  "/achievements/:id",
  requireRole("faculty", "admin"),
  adminAchievementController.deleteAchievement
);

// ======================
// Perk Management
// ======================

// @route   POST /api/admin/perks
// @desc    Create a new perk
// @access  Faculty, Admin
router.post(
  "/perks",
  requireRole("faculty", "admin"),
  adminPerkController.createPerk
);

// @route   GET /api/admin/perks
// @desc    List all perks
// @access  Faculty, Admin
router.get(
  "/perks",
  requireRole("faculty", "admin"),
  adminPerkController.listPerks
);

// @route   GET /api/admin/perks/:id
// @desc    Get single perk
// @access  Faculty, Admin
router.get(
  "/perks/:id",
  requireRole("faculty", "admin"),
  adminPerkController.getPerk
);

// @route   PUT /api/admin/perks/:id
// @desc    Update perk
// @access  Faculty, Admin
router.put(
  "/perks/:id",
  requireRole("faculty", "admin"),
  adminPerkController.updatePerk
);

// @route   DELETE /api/admin/perks/:id
// @desc    Delete perk
// @access  Faculty, Admin
router.delete(
  "/perks/:id",
  requireRole("faculty", "admin"),
  adminPerkController.deletePerk
);

module.exports = router;
