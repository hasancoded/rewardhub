<template>
  <div class="dashboard-layout">
    <AppHeader />
    <div class="dashboard-content">
      <AppSidebar />
      <main class="main-content">
        <div class="page-header">
          <h1>Available Perks</h1>
          <p class="text-secondary">Redeem your tokens for rewards</p>
        </div>

        <LoadingSpinner v-if="loading" />

        <div v-else class="perks-grid">
          <div v-for="perk in perks" :key="perk._id" class="perk-card card">
            <h3>{{ perk.title }}</h3>
            <p>{{ perk.description }}</p>
            <div class="perk-footer">
              <span class="badge badge-primary"
                >{{ perk.tokenCost }} tokens</span
              >
              <button
                @click="redeemPerk(perk._id)"
                class="btn btn-sm btn-success"
                :disabled="!walletStore.isConnected"
              >
                Redeem
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AppHeader from "@/components/common/AppHeader.vue";
import AppSidebar from "@/components/common/AppSidebar.vue";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";
import { useWalletStore } from "@/stores/wallet";
import { getRewards } from "@/services/perk.service";
import { redeemPerk as redeemPerkService } from "@/services/redemption.service";

const walletStore = useWalletStore();
const perks = ref([]);
const loading = ref(false);

async function loadPerks() {
  loading.value = true;
  try {
    const data = await getRewards();
    perks.value = data.rewards;
  } catch (error) {
    console.error("Error loading perks:", error);
  } finally {
    loading.value = false;
  }
}

async function redeemPerk(rewardId) {
  if (!walletStore.isConnected) {
    alert("Please connect your wallet first!");
    return;
  }

  try {
    await redeemPerkService(rewardId);
    alert("Perk redeemed successfully!");
    await walletStore.fetchBalance();
  } catch (error) {
    alert("Error redeeming perk: " + error.message);
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
  margin-bottom: 2rem;
}

.perks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.perk-card h3 {
  margin-bottom: 0.5rem;
}

.perk-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}
</style>
