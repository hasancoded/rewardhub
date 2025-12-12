import { defineStore } from "pinia";
import { ref, computed } from "vue";
import * as authService from "@/services/auth.service";
import { STORAGE_KEYS } from "@/utils/constants";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const token = ref(null);
  const loading = ref(false);
  const error = ref(null);

  // Computed
  const isAuthenticated = computed(() => !!token.value);
  const userRole = computed(() => user.value?.role || null);
  const isAdmin = computed(() => userRole.value === "admin");
  const isFaculty = computed(() => userRole.value === "faculty");
  const isStudent = computed(() => userRole.value === "student");

  // Initialize from localStorage
  function init() {
    const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER);

    if (storedToken && storedUser) {
      token.value = storedToken;
      user.value = JSON.parse(storedUser);
    }
  }

  // Login
  async function login(credentials) {
    try {
      loading.value = true;
      error.value = null;

      const data = await authService.login(credentials);

      token.value = data.token;
      user.value = data.user;

      // Store in localStorage
      localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
      localStorage.setItem(STORAGE_KEYS.USER_ROLE, data.user.role);

      return data;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  // Register
  async function register(userData) {
    try {
      loading.value = true;
      error.value = null;

      const data = await authService.register(userData);

      if (data.token) {
        token.value = data.token;
        user.value = data.user;

        localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
        localStorage.setItem(STORAGE_KEYS.USER_ROLE, data.user.role);
      }

      return data;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  // Fetch profile
  async function fetchProfile() {
    try {
      loading.value = true;
      error.value = null;

      const data = await authService.getProfile();
      user.value = data.user;

      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));

      return data;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  // Logout
  function logout() {
    user.value = null;
    token.value = null;

    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
  }

  // Update user data (e.g., after wallet connection)
  function updateUser(userData) {
    user.value = { ...user.value, ...userData };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user.value));
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    userRole,
    isAdmin,
    isFaculty,
    isStudent,
    init,
    login,
    register,
    fetchProfile,
    logout,
    updateUser,
  };
});
