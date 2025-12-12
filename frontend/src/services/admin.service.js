import api from "./api";

/**
 * Admin Service
 * Endpoints: 8-12, 23
 */

// POST /api/admin/users
export const createUser = async (userData) => {
  const response = await api.post("/admin/users", userData);
  return response.data;
};

// GET /api/admin/users
export const getUsers = async (params = {}) => {
  const response = await api.get("/admin/users", { params });
  return response.data;
};

// PUT /api/admin/users/:id
export const updateUser = async (id, userData) => {
  const response = await api.put(`/admin/users/${id}`, userData);
  return response.data;
};

// DELETE /api/admin/users/:id
export const deleteUser = async (id) => {
  const response = await api.delete(`/admin/users/${id}`);
  return response.data;
};

// GET /api/admin/dashboard-stats
export const getDashboardStats = async () => {
  const response = await api.get("/admin/dashboard-stats");
  return response.data;
};

// GET /api/admin/students
export const getStudents = async () => {
  const response = await api.get("/admin/students");
  return response.data;
};
