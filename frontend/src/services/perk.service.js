import api from "./api";
import { handleApiError, ErrorContext } from "@/utils/errorHandler";

/**
 * Perk/Reward Service
 * Endpoints: 18-22, 31-32
 */

// POST /api/admin/perks
export const createPerk = async (perkData) => {
  try {
    const response = await api.post("/admin/perks", perkData);
    return response.data;
  } catch (error) {
    const userMessage = handleApiError(error, ErrorContext.PERK);
    throw new Error(userMessage);
  }
};

// GET /api/admin/perks
export const getAdminPerks = async () => {
  try {
    const response = await api.get("/admin/perks");
    return response.data;
  } catch (error) {
    const userMessage = handleApiError(error, ErrorContext.GENERAL);
    throw new Error(userMessage);
  }
};

// GET /api/admin/perks/:id
export const getPerkById = async (id) => {
  try {
    const response = await api.get(`/admin/perks/${id}`);
    return response.data;
  } catch (error) {
    const userMessage = handleApiError(error, ErrorContext.PERK);
    throw new Error(userMessage);
  }
};

// PUT /api/admin/perks/:id
export const updatePerk = async (id, perkData) => {
  try {
    const response = await api.put(`/admin/perks/${id}`, perkData);
    return response.data;
  } catch (error) {
    const userMessage = handleApiError(error, ErrorContext.PERK);
    throw new Error(userMessage);
  }
};

// DELETE /api/admin/perks/:id
export const deletePerk = async (id) => {
  try {
    const response = await api.delete(`/admin/perks/${id}`);
    return response.data;
  } catch (error) {
    const userMessage = handleApiError(error, ErrorContext.PERK);
    throw new Error(userMessage);
  }
};

// GET /api/rewards (public)
export const getRewards = async () => {
  try {
    const response = await api.get("/rewards");
    return response.data;
  } catch (error) {
    const userMessage = handleApiError(error, ErrorContext.GENERAL);
    throw new Error(userMessage);
  }
};

// POST /api/rewards (legacy)
export const createRewardLegacy = async (rewardData) => {
  try {
    const response = await api.post("/rewards", rewardData);
    return response.data;
  } catch (error) {
    const userMessage = handleApiError(error, ErrorContext.PERK);
    throw new Error(userMessage);
  }
};
