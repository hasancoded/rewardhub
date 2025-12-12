import api from "./api";

/**
 * Redemption Service
 * Endpoints: 33-35
 */

// POST /api/redemptions
export const redeemPerk = async (rewardId) => {
  const response = await api.post("/redemptions", { rewardId });
  return response.data;
};

// GET /api/redemptions/student/:studentId
export const getStudentRedemptions = async (studentId) => {
  const response = await api.get(`/redemptions/student/${studentId}`);
  return response.data;
};

// GET /api/redemptions
export const getAllRedemptions = async () => {
  const response = await api.get("/redemptions");
  return response.data;
};
