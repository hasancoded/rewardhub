<template>
  <div class="recent-activity card">
    <h2 class="section-title">Recent Activity</h2>

    <LoadingSpinner v-if="loading" />

    <div v-else-if="error" class="error-state">
      <p class="text-error">{{ error }}</p>
      <button @click="fetchActivity" class="btn btn-primary btn-sm">
        Retry
      </button>
    </div>

    <div v-else-if="activities.length === 0" class="empty-state">
      <p>No achievements awarded yet. Start recognizing your students!</p>
    </div>

    <div v-else class="activity-list">
      <div
        v-for="activity in activities"
        :key="activity._id"
        class="activity-item"
      >
        <div class="activity-icon-wrapper">
          <TrophyIcon class="activity-icon" />
        </div>
        <div class="activity-content">
          <h3 class="activity-title">
            {{ activity.achievementId?.title || "Achievement" }}
          </h3>
          <p class="activity-details">
            Awarded to
            <strong>{{ activity.studentId?.name || "Student" }}</strong>
          </p>
          <p class="activity-meta">
            {{ formatTimeAgo(activity.dateAwarded) }} •
            {{ activity.achievementId?.tokenReward || 0 }} tokens
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";
import TrophyIcon from "@/components/icons/TrophyIcon.vue";
import { getRecentActivity } from "@/services/faculty.service";

const activities = ref([]);
const loading = ref(true);
const error = ref(null);

async function fetchActivity() {
  loading.value = true;
  error.value = null;

  try {
    const data = await getRecentActivity(10);
    activities.value = data.activities;
  } catch (err) {
    error.value = "Failed to load recent activity";
    console.error("Error fetching recent activity:", err);
  } finally {
    loading.value = false;
  }
}

function formatTimeAgo(dateString) {
  if (!dateString) return "Recently";

  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

onMounted(() => {
  fetchActivity();
});

// Expose fetchActivity for parent component to refresh
defineExpose({
  fetchActivity,
});
</script>

<style scoped>
.recent-activity {
  margin-bottom: 2rem;
}

.section-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  color: var(--text-primary);
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-tertiary);
  border-radius: var(--border-radius-sm);
  transition: background 0.2s ease;
}

.activity-item:hover {
  background: var(--bg-secondary);
}

.activity-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--border-radius);
  background: linear-gradient(
    135deg,
    rgba(251, 191, 36, 0.1) 0%,
    rgba(245, 158, 11, 0.1) 100%
  );
  flex-shrink: 0;
}

.activity-icon {
  width: 20px;
  height: 20px;
  color: #f59e0b;
}

.activity-content {
  flex: 1;
  min-width: 0;
}

.activity-title {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.25rem 0;
}

.activity-details {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0 0 0.25rem 0;
}

.activity-details strong {
  color: var(--text-primary);
  font-weight: 600;
}

.activity-meta {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  margin: 0;
}

.empty-state,
.error-state {
  padding: 2rem;
  text-align: center;
  color: var(--text-secondary);
}

.error-state p {
  margin-bottom: 1rem;
}

@media (max-width: 480px) {
  .activity-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
