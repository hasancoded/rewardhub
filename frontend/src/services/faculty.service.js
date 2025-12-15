import api from "./api";

/**
 * Faculty Service
 * Handles faculty-specific operations
 */

/**
 * Get faculty activity statistics
 * @returns {Promise} Faculty stats data
 */
export const getFacultyStats = async () => {
  const response = await api.get("/faculty/stats");
  return response.data;
};

/**
 * Get recent activity for faculty
 * @param {number} limit - Number of recent activities to fetch
 * @returns {Promise} Recent activities
 */
export const getRecentActivity = async (limit = 10) => {
  const response = await api.get(`/faculty/recent-activity?limit=${limit}`);
  return response.data;
};
