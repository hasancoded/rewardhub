<template>
  <aside class="sidebar">
    <nav class="sidebar-nav">
      <router-link
        v-for="link in navLinks"
        :key="link.path"
        :to="link.path"
        class="sidebar-link"
        active-class="active"
      >
        <span class="link-icon">{{ link.icon }}</span>
        <span class="link-text">{{ link.label }}</span>
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const navLinks = computed(() => {
  const role = authStore.userRole;

  if (role === "admin") {
    return [
      { path: "/admin/dashboard", label: "Dashboard", icon: "📊" },
      { path: "/admin/users", label: "Manage Users", icon: "👥" },
      { path: "/admin/achievements", label: "Achievements", icon: "🏆" },
      { path: "/admin/perks", label: "Perks", icon: "🎁" },
    ];
  }

  if (role === "faculty") {
    return [
      { path: "/faculty/dashboard", label: "Dashboard", icon: "📊" },
      { path: "/faculty/award", label: "Award Achievements", icon: "🏆" },
    ];
  }

  if (role === "student") {
    return [
      { path: "/student/dashboard", label: "Dashboard", icon: "📊" },
      { path: "/student/achievements", label: "My Achievements", icon: "🏆" },
      { path: "/student/perks", label: "Perks", icon: "🎁" },
      { path: "/student/wallet", label: "Wallet", icon: "💳" },
    ];
  }

  return [];
});
</script>

<style scoped>
.sidebar {
  width: 250px;
  background: white;
  border-right: 1px solid var(--border-color);
  height: calc(100vh - 65px);
  position: sticky;
  top: 65px;
  overflow-y: auto;
}

.sidebar-nav {
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all var(--transition-fast);
  border-left: 3px solid transparent;
}

.sidebar-link:hover {
  background-color: var(--gray-50);
  color: var(--text-primary);
}

.sidebar-link.active {
  background-color: rgba(37, 99, 235, 0.05);
  color: var(--primary-color);
  border-left-color: var(--primary-color);
  font-weight: 500;
}

.link-icon {
  font-size: 1.25rem;
}

.link-text {
  font-size: var(--font-size-sm);
}

@media (max-width: 768px) {
  .sidebar {
    width: 60px;
  }

  .link-text {
    display: none;
  }

  .sidebar-link {
    justify-content: center;
    padding: 0.875rem;
  }
}
</style>
