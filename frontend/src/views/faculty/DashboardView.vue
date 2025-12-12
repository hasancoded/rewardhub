<template>
  <div class="dashboard-layout">
    <AppHeader />
    <div class="dashboard-content">
      <AppSidebar />
      <main class="main-content">
        <div class="page-header">
          <h1>Faculty Dashboard</h1>
          <p class="text-secondary">Award achievements to students</p>
        </div>

        <div class="card">
          <h3>Quick Stats</h3>
          <p>
            Welcome to the faculty dashboard. Use the Award Achievements page to
            recognize student accomplishments.
          </p>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import AppHeader from "@/components/common/AppHeader.vue";
import AppSidebar from "@/components/common/AppSidebar.vue";
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
</style>
