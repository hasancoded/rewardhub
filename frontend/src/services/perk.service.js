import api from "./api";

/**
 * Perk/Reward Service
 * Endpoints: 18-22, 31-32
 */

// POST /api/admin/perks
export const createPerk = async (perkData) => {
  const response = await api.post("/admin/perks", perkData);
  return response.data;
};

// GET /api/admin/perks
export const getAdminPerks = async () => {
  const response = await api.get("/admin/perks");
  return response.data;
};

// GET /api/admin/perks/:id
export const getPerkById = async (id) => {
  const response = await api.get(`/admin/perks/${id}`);
  return response.data;
};

// PUT /api/admin/perks/:id
export const updatePerk = async (id, perkData) => {
  const response = await api.put(`/admin/perks/${id}`, perkData);
  return response.data;
};

// DELETE /api/admin/perks/:id
export const deletePerk = async (id) => {
  const response = await api.delete(`/admin/perks/${id}`);
  return response.data;
};

// GET /api/rewards (public)
export const getRewards = async () => {
  const response = await api.get("/rewards");
  return response.data;
};

// POST /api/rewards (legacy)
export const createRewardLegacy = async (rewardData) => {
  const response = await api.post("/rewards", rewardData);
  return response.data;
};
