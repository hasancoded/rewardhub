import { defineStore } from "pinia";
import { ref } from "vue";
import * as perkService from "@/services/perk.service";

export const usePerksStore = defineStore("perks", () => {
  const perks = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // Fetch perks (admin)
  async function fetchPerks() {
    try {
      loading.value = true;
      error.value = null;

      const data = await perkService.getAdminPerks();
      perks.value = data.perks;

      return data;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  // Fetch public perks/rewards
  async function fetchPublicPerks() {
    try {
      loading.value = true;
      error.value = null;

      const data = await perkService.getRewards();
      perks.value = data.rewards;

      return data;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  // Get perk by ID
  async function getPerkById(id) {
    try {
      loading.value = true;
      error.value = null;

      const data = await perkService.getPerkById(id);
      return data.perk;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  // Create perk
  async function createPerk(perkData) {
    try {
      loading.value = true;
      error.value = null;

      const data = await perkService.createPerk(perkData);

      // Add to list
      perks.value.push(data.perk);

      return data;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  // Update perk
  async function updatePerk(id, perkData) {
    try {
      loading.value = true;
      error.value = null;

      const data = await perkService.updatePerk(id, perkData);

      // Update in list
      const index = perks.value.findIndex((p) => p._id === id);
      if (index !== -1) {
        perks.value[index] = data.perk;
      }

      return data;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  // Delete perk
  async function deletePerk(id) {
    try {
      loading.value = true;
      error.value = null;

      await perkService.deletePerk(id);

      // Remove from list
      perks.value = perks.value.filter((p) => p._id !== id);

      return true;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    perks,
    loading,
    error,
    fetchPerks,
    fetchPublicPerks,
    getPerkById,
    createPerk,
    updatePerk,
    deletePerk,
  };
});
