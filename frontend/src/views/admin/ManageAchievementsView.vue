<template>
  <div class="dashboard-layout">
    <AppHeader />
    <div class="dashboard-content">
      <AppSidebar />
      <main class="main-content">
        <div class="page-header">
          <h1>Manage Achievements</h1>
          <button @click="showCreateModal = true" class="btn btn-primary">
            Add Achievement
          </button>
        </div>

        <LoadingSpinner v-if="loading" />

        <div v-else class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Token Reward</th>
                <th>On-Chain</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="achievement in achievements" :key="achievement._id">
                <td>{{ achievement.title }}</td>
                <td>{{ achievement.tokenReward }} tokens</td>
                <td>
                  <span
                    v-if="achievement.onChainCreated"
                    class="badge badge-success"
                    >Yes</span
                  >
                  <span v-else class="badge badge-secondary">No</span>
                </td>
                <td>
                  <div class="action-buttons">
                    <button
                      @click="deleteAchievement(achievement._id)"
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

        <BaseModal v-model="showCreateModal" title="Create Achievement">
          <form @submit.prevent="handleCreate">
            <div class="form-group">
              <label class="form-label">Title</label>
              <input v-model="form.title" class="form-input" required />
            </div>
            <div class="form-group">
              <label class="form-label">Description</label>
              <textarea
                v-model="form.description"
                class="form-textarea"
                required
              ></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Token Reward</label>
              <input
                v-model.number="form.tokenReward"
                type="number"
                class="form-input"
                required
              />
            </div>
            <div class="form-group">
              <label class="form-label">
                <input v-model="form.syncToBlockchain" type="checkbox" />
                Sync to Blockchain
              </label>
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
            <button @click="handleCreate" class="btn btn-primary">
              Create
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
import { useAchievementsStore } from "@/stores/achievements";

const achievementsStore = useAchievementsStore();
const achievements = ref([]);
const loading = ref(false);
const showCreateModal = ref(false);
const form = ref({
  title: "",
  description: "",
  tokenReward: 0,
  syncToBlockchain: false,
});

async function loadAchievements() {
  loading.value = true;
  try {
    await achievementsStore.fetchAchievements();
    achievements.value = achievementsStore.achievements;
  } finally {
    loading.value = false;
  }
}

async function handleCreate() {
  try {
    await achievementsStore.createAchievement(form.value);
    showCreateModal.value = false;
    form.value = {
      title: "",
      description: "",
      tokenReward: 0,
      syncToBlockchain: false,
    };
    await loadAchievements();
  } catch (error) {
    console.error("Error creating achievement:", error);
  }
}

async function deleteAchievement(id) {
  if (confirm("Delete this achievement?")) {
    try {
      await achievementsStore.deleteAchievement(id);
      await loadAchievements();
    } catch (error) {
      console.error("Error deleting achievement:", error);
    }
  }
}

onMounted(() => {
  loadAchievements();
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

.action-buttons {
  display: flex;
  gap: 0.5rem;
}
</style>
