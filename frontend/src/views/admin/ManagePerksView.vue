<template>
  <div class="dashboard-layout">
    <AppHeader />
    <div class="dashboard-content">
      <AppSidebar />
      <main class="main-content">
        <div class="page-header">
          <h1>Manage Perks</h1>
          <button @click="showCreateModal = true" class="btn btn-primary">
            Add Perk
          </button>
        </div>

        <LoadingSpinner v-if="loading" />

        <div v-else class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Token Cost</th>
                <th>On-Chain</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="perk in perks" :key="perk._id">
                <td>{{ perk.title }}</td>
                <td>{{ perk.tokenCost }} tokens</td>
                <td>
                  <span v-if="perk.onChainCreated" class="badge badge-success"
                    >Yes</span
                  >
                  <span v-else class="badge badge-secondary">No</span>
                </td>
                <td>
                  <div class="action-buttons">
                    <button
                      @click="deletePerk(perk._id)"
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

        <BaseModal v-model="showCreateModal" title="Create Perk">
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
              <label class="form-label">Token Cost</label>
              <input
                v-model.number="form.tokenCost"
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
import { usePerksStore } from "@/stores/perks";

const perksStore = usePerksStore();
const perks = ref([]);
const loading = ref(false);
const showCreateModal = ref(false);
const form = ref({
  title: "",
  description: "",
  tokenCost: 0,
  syncToBlockchain: false,
});

async function loadPerks() {
  loading.value = true;
  try {
    await perksStore.fetchPerks();
    perks.value = perksStore.perks;
  } finally {
    loading.value = false;
  }
}

async function handleCreate() {
  try {
    await perksStore.createPerk(form.value);
    showCreateModal.value = false;
    form.value = {
      title: "",
      description: "",
      tokenCost: 0,
      syncToBlockchain: false,
    };
    await loadPerks();
  } catch (error) {
    console.error("Error creating perk:", error);
  }
}

async function deletePerk(id) {
  if (confirm("Delete this perk?")) {
    try {
      await perksStore.deletePerk(id);
      await loadPerks();
    } catch (error) {
      console.error("Error deleting perk:", error);
    }
  }
}

onMounted(() => {
  loadPerks();
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
