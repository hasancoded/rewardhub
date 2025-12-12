<template>
  <div class="dashboard-layout">
    <AppHeader />
    <div class="dashboard-content">
      <AppSidebar />
      <main class="main-content">
        <div class="page-header">
          <h1>Manage Users</h1>
          <button @click="showCreateModal = true" class="btn btn-primary">
            Add New User
          </button>
        </div>

        <!-- Filters -->
        <div class="card mb-3">
          <div class="filters">
            <select
              v-model="filters.role"
              class="form-select"
              @change="loadUsers"
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="faculty">Faculty</option>
              <option value="student">Student</option>
            </select>

            <select
              v-model="filters.walletConnected"
              class="form-select"
              @change="loadUsers"
            >
              <option value="">All Wallets</option>
              <option value="true">Connected</option>
              <option value="false">Not Connected</option>
            </select>

            <input
              v-model="filters.search"
              type="text"
              class="form-input"
              placeholder="Search by name or email..."
              @input="loadUsers"
            />
          </div>
        </div>

        <LoadingSpinner v-if="loading" />

        <div v-else class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Wallet</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user._id">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <span class="badge badge-primary">{{ user.role }}</span>
                </td>
                <td>
                  <span v-if="user.walletConnected" class="badge badge-success"
                    >Connected</span
                  >
                  <span v-else class="badge badge-secondary"
                    >Not Connected</span
                  >
                </td>
                <td>
                  <div class="action-buttons">
                    <button
                      @click="editUser(user)"
                      class="btn btn-sm btn-secondary"
                    >
                      Edit
                    </button>
                    <button
                      @click="confirmDelete(user)"
                      class="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Create/Edit Modal -->
        <BaseModal v-model="showCreateModal" title="Add New User">
          <form @submit.prevent="handleCreateUser">
            <div class="form-group">
              <label class="form-label">Name</label>
              <input v-model="userForm.name" class="form-input" required />
            </div>
            <div class="form-group">
              <label class="form-label">Email</label>
              <input
                v-model="userForm.email"
                type="email"
                class="form-input"
                required
              />
            </div>
            <div class="form-group">
              <label class="form-label">Password</label>
              <input
                v-model="userForm.password"
                type="password"
                class="form-input"
                required
              />
            </div>
            <div class="form-group">
              <label class="form-label">Role</label>
              <select v-model="userForm.role" class="form-select" required>
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </form>
          <template #footer>
            <button
              type="button"
              @click="showCreateModal = false"
              class="btn btn-secondary"
            >
              Cancel
            </button>
            <button @click="handleCreateUser" class="btn btn-primary">
              Create User
            </button>
          </template>
        </BaseModal>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AppHeader from "@/components/common/AppHeader.vue";
import AppSidebar from "@/components/common/AppSidebar.vue";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";
import BaseModal from "@/components/common/BaseModal.vue";
import { useUsersStore } from "@/stores/users";

const usersStore = useUsersStore();
const users = ref([]);
const loading = ref(false);
const showCreateModal = ref(false);
const filters = ref({ role: "", walletConnected: "", search: "" });
const userForm = ref({ name: "", email: "", password: "", role: "student" });

async function loadUsers() {
  loading.value = true;
  try {
    const params = {};
    if (filters.value.role) params.role = filters.value.role;
    if (filters.value.walletConnected)
      params.walletConnected = filters.value.walletConnected;
    if (filters.value.search) params.search = filters.value.search;

    const data = await usersStore.fetchUsers(params);
    users.value = data.users;
  } catch (error) {
    console.error("Error loading users:", error);
  } finally {
    loading.value = false;
  }
}

async function handleCreateUser() {
  try {
    await usersStore.createUser(userForm.value);
    showCreateModal.value = false;
    userForm.value = { name: "", email: "", password: "", role: "student" };
    await loadUsers();
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

function editUser(user) {
  // Implementation for edit
  console.log("Edit user:", user);
}

async function confirmDelete(user) {
  if (confirm(`Are you sure you want to delete ${user.name}?`)) {
    try {
      await usersStore.deleteUser(user._id);
      await loadUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }
}

onMounted(() => {
  loadUsers();
});
</script>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
  background: var(--bg-secondary);
}

.dashboard-content {
  display: flex;
}

.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}
</style>
