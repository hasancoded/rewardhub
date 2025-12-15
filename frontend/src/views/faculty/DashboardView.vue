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

        <!-- Faculty Activity Stats -->
        <FacultyStats />

        <!-- Faculty Profile Section -->
        <FacultyDetails />

        <!-- Quick Award Widget -->
        <QuickAward @award-success="handleAwardSuccess" />

        <!-- Recent Activity Feed -->
        <RecentActivity ref="recentActivityRef" />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AppHeader from "@/components/common/AppHeader.vue";
import AppSidebar from "@/components/common/AppSidebar.vue";
import FacultyDetails from "@/components/faculty/FacultyDetails.vue";
import FacultyStats from "@/components/faculty/FacultyStats.vue";
import QuickAward from "@/components/faculty/QuickAward.vue";
import RecentActivity from "@/components/faculty/RecentActivity.vue";

const recentActivityRef = ref(null);

function handleAwardSuccess() {
  // Refresh recent activity when award is successful
  if (recentActivityRef.value) {
    recentActivityRef.value.fetchActivity();
  }
}
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
