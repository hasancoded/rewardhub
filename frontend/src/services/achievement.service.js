import api from "./api";

/**
 * Achievement Service
 * Endpoints: 13-17, 29-30
 */

// POST /api/admin/achievements
export const createAchievement = async (achievementData) => {
  const response = await api.post("/admin/achievements", achievementData);
  return response.data;
};

// GET /api/admin/achievements
export const getAdminAchievements = async () => {
  const response = await api.get("/admin/achievements");
  return response.data;
};

// GET /api/admin/achievements/:id
export const getAchievementById = async (id) => {
  const response = await api.get(`/admin/achievements/${id}`);
  return response.data;
};

// PUT /api/admin/achievements/:id
export const updateAchievement = async (id, achievementData) => {
  const response = await api.put(`/admin/achievements/${id}`, achievementData);
  return response.data;
};

// DELETE /api/admin/achievements/:id
export const deleteAchievement = async (id) => {
  const response = await api.delete(`/admin/achievements/${id}`);
  return response.data;
};

// GET /api/achievements (public)
export const getAchievements = async () => {
  const response = await api.get("/achievements");
  return response.data;
};

// POST /api/achievements (legacy)
export const createAchievementLegacy = async (achievementData) => {
  const response = await api.post("/achievements", achievementData);
  return response.data;
};
