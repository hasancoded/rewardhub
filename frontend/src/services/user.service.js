import api from "./api";

/**
 * User Service
 * Handles user profile operations
 */

/**
 * Get current user profile
 * @returns {Promise} User profile data
 */
export const getCurrentUser = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};

/**
 * Update current user profile
 * @param {Object} data - Profile data to update
 * @param {string} data.name - User's name
 * @param {string} [data.walletAddress] - User's wallet address (optional)
 * @returns {Promise} Updated user data
 */
export const updateProfile = async (data) => {
  const response = await api.put("/auth/profile", data);
  return response.data;
};
