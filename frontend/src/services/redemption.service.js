import api from "./api";
import { handleApiError, ErrorContext } from "@/utils/errorHandler";

/**
 * Redemption Service
 * Endpoints: 33-35
 */

// POST /api/redemptions
export const redeemPerk = async (rewardId, walletAddress) => {
  try {
    const response = await api.post("/redemptions", {
      rewardId,
      walletAddress,
    });
    return response.data;
  } catch (error) {
    const userMessage = handleApiError(error, ErrorContext.REDEMPTION);
    throw new Error(userMessage);
  }
};

// GET /api/redemptions/student/:studentId
export const getStudentRedemptions = async (studentId) => {
  try {
    const response = await api.get(`/redemptions/student/${studentId}`);
    return response.data;
  } catch (error) {
    const userMessage = handleApiError(error, ErrorContext.GENERAL);
    throw new Error(userMessage);
  }
};

// GET /api/redemptions
export const getAllRedemptions = async () => {
  try {
    const response = await api.get("/redemptions");
    return response.data;
  } catch (error) {
    const userMessage = handleApiError(error, ErrorContext.GENERAL);
    throw new Error(userMessage);
  }
};
