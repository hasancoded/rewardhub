const StudentAchievement = require("../models/StudentAchievement");

/**
 * @route   GET /api/faculty/stats
 * @desc    Get faculty activity statistics
 * @access  Faculty only
 */
exports.getFacultyStats = async (req, res) => {
  try {
    const facultyId = req.user.id; // From JWT token

    // Total achievements awarded by this faculty
    const totalAchievements = await StudentAchievement.countDocuments({
      awardedBy: facultyId,
      status: { $in: ["pending_onchain", "confirmed"] },
    });

    // Unique students recognized
    const uniqueStudentsArray = await StudentAchievement.distinct("studentId", {
      awardedBy: facultyId,
      status: { $in: ["pending_onchain", "confirmed"] },
    });
    const uniqueStudents = uniqueStudentsArray.length;

    // Achievements awarded this week
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - 7);
    const thisWeek = await StudentAchievement.countDocuments({
      awardedBy: facultyId,
      status: { $in: ["pending_onchain", "confirmed"] },
      dateAwarded: { $gte: startOfWeek },
    });

    // Achievements awarded last week (for trend)
    const startOfLastWeek = new Date();
    startOfLastWeek.setDate(startOfLastWeek.getDate() - 14);
    const endOfLastWeek = new Date();
    endOfLastWeek.setDate(endOfLastWeek.getDate() - 7);
    const lastWeek = await StudentAchievement.countDocuments({
      awardedBy: facultyId,
      status: { $in: ["pending_onchain", "confirmed"] },
      dateAwarded: { $gte: startOfLastWeek, $lt: endOfLastWeek },
    });

    // Total tokens distributed
    const achievements = await StudentAchievement.find({
      awardedBy: facultyId,
      status: "confirmed",
    }).populate("achievementId", "tokenReward");

    const totalTokens = achievements.reduce(
      (sum, a) => sum + (a.achievementId?.tokenReward || 0),
      0
    );

    // Calculate trends
    const achievementsChange = thisWeek - lastWeek;

    res.json({
      stats: {
        totalAchievements,
        uniqueStudents,
        thisWeek,
        totalTokens,
        trends: {
          achievementsChange,
          weekComparison: lastWeek,
        },
      },
    });
  } catch (err) {
    console.error("Error fetching faculty stats:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * @route   GET /api/faculty/recent-activity
 * @desc    Get recent achievements awarded by this faculty
 * @access  Faculty only
 */
exports.getRecentActivity = async (req, res) => {
  try {
    const facultyId = req.user.id;
    const limit = parseInt(req.query.limit) || 10;

    const activities = await StudentAchievement.find({
      awardedBy: facultyId,
      status: { $in: ["pending_onchain", "confirmed"] },
    })
      .populate("studentId", "name")
      .populate("achievementId", "title tokenReward")
      .sort({ dateAwarded: -1 })
      .limit(limit);

    res.json({
      activities,
    });
  } catch (err) {
    console.error("Error fetching recent activity:", err);
    res.status(500).json({ error: err.message });
  }
};
