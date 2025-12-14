<template>
  <header class="app-header">
    <div class="header-container">
      <div class="header-brand">
        <h1 class="brand-title">RewardHub</h1>
      </div>

      <nav class="header-nav">
        <div class="user-info">
          <span class="user-name">{{ user?.name }}</span>
          <span class="user-role badge badge-primary">{{ user?.role }}</span>
        </div>

        <button @click="handleLogout" class="btn btn-secondary btn-sm">
          Logout
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const user = computed(() => authStore.user);

function handleLogout() {
  authStore.logout();
  router.push("/login");
}
</script>

<style scoped>
.app-header {
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(8px);
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-brand {
  display: flex;
  align-items: center;
}

.brand-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--accent-teal) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  letter-spacing: -0.02em;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  background: var(--gray-50);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
}

.user-name {
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  font-size: var(--font-size-sm);
}

@media (max-width: 768px) {
  .header-container {
    padding: 1rem;
  }

  .user-name {
    display: none;
  }

  .user-info {
    padding: 0.5rem;
  }
}
</style>
