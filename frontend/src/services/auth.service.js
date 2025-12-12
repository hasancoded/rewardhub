import api from "./api";

/**
 * Authentication Service
 * Endpoints: 1-3
 */

// POST /api/auth/register
export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// POST /api/auth/login
export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

// GET /api/auth/profile
export const getProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};
