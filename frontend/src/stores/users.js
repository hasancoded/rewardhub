import { defineStore } from "pinia";
import { ref } from "vue";
import * as adminService from "@/services/admin.service";

export const useUsersStore = defineStore("users", () => {
  const users = ref([]);
  const students = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // Fetch all users
  async function fetchUsers(params = {}) {
    try {
      loading.value = true;
      error.value = null;

      const data = await adminService.getUsers(params);
      users.value = data.users;

      return data;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  // Fetch students only
  async function fetchStudents() {
    try {
      loading.value = true;
      error.value = null;

      const data = await adminService.getStudents();
      students.value = data.students;

      return data;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  // Create user
  async function createUser(userData) {
    try {
      loading.value = true;
      error.value = null;

      const data = await adminService.createUser(userData);

      // Add to list
      users.value.push(data.user);

      return data;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  // Update user
  async function updateUser(id, userData) {
    try {
      loading.value = true;
      error.value = null;

      const data = await adminService.updateUser(id, userData);

      // Update in list
      const index = users.value.findIndex((u) => u._id === id);
      if (index !== -1) {
        users.value[index] = data.user;
      }

      return data;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  // Delete user
  async function deleteUser(id) {
    try {
      loading.value = true;
      error.value = null;

      await adminService.deleteUser(id);

      // Remove from list
      users.value = users.value.filter((u) => u._id !== id);

      return true;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    users,
    students,
    loading,
    error,
    fetchUsers,
    fetchStudents,
    createUser,
    updateUser,
    deleteUser,
  };
});
