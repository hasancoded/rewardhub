<template>
  <div class="faculty-stats">
    <LoadingSpinner v-if="loading" />

    <div v-else-if="error" class="error-state card">
      <p class="text-error">{{ error }}</p>
      <button @click="fetchStats" class="btn btn-primary btn-sm">Retry</button>
    </div>

    <div v-else class="stats-grid">
      <!-- Total Achievements -->
      <div class="stat-card card">
        <div class="stat-icon-wrapper trophy">
          <TrophyIcon class="stat-icon" />
        </div>
        <div class="stat-content">
          <h3 class="stat-label">Achievements Awarded</h3>
          <p class="stat-value">{{ stats.totalAchievements }}</p>
          <p
            v-if="stats.trends.achievementsChange !== 0"
            class="stat-trend"
            :class="trendClass(stats.trends.achievementsChange)"
          >
            <span class="trend-icon">{{
              trendIcon(stats.trends.achievementsChange)
            }}</span>
            {{ Math.abs(stats.trends.achievementsChange) }} this week
          </p>
        </div>
      </div>

      <!-- Unique Students -->
      <div class="stat-card card">
        <div class="stat-icon-wrapper students">
          <UsersIcon class="stat-icon" />
        </div>
        <div class="stat-content">
          <h3 class="stat-label">Students Recognized</h3>
          <p class="stat-value">{{ stats.uniqueStudents }}</p>
          <p class="stat-subtitle">Unique students</p>
        </div>
      </div>

      <!-- This Week -->
      <div class="stat-card card">
        <div class="stat-icon-wrapper week">
          <svg
            class="stat-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
        <div class="stat-content">
          <h3 class="stat-label">Achievements This Week</h3>
          <p class="stat-value">{{ stats.thisWeek }}</p>
          <p
            v-if="stats.trends.weekComparison !== undefined"
            class="stat-subtitle"
          >
            vs {{ stats.trends.weekComparison }} last week
          </p>
        </div>
      </div>

      <!-- Total Tokens -->
      <div class="stat-card card">
        <div class="stat-icon-wrapper tokens">
          <svg
            class="stat-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        </div>
        <div class="stat-content">
          <h3 class="stat-label">Total Tokens</h3>
          <p class="stat-value">{{ formatNumber(stats.totalTokens) }}</p>
          <p class="stat-subtitle">Distributed</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";
import TrophyIcon from "@/components/icons/TrophyIcon.vue";
import UsersIcon from "@/components/icons/UsersIcon.vue";
import { getFacultyStats } from "@/services/faculty.service";

const stats = ref({
  totalAchievements: 0,
  uniqueStudents: 0,
  thisWeek: 0,
  totalTokens: 0,
  trends: {
    achievementsChange: 0,
    weekComparison: 0,
  },
});

const loading = ref(true);
const error = ref(null);

async function fetchStats() {
  loading.value = true;
  error.value = null;

  try {
    const data = await getFacultyStats();
    stats.value = data.stats;
  } catch (err) {
    error.value = "Failed to load statistics";
    console.error("Error fetching faculty stats:", err);
  } finally {
    loading.value = false;
  }
}

function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num;
}

function trendClass(change) {
  return change > 0 ? "trend-up" : "trend-down";
}

function trendIcon(change) {
  return change > 0 ? "↑" : "↓";
}

onMounted(() => {
  fetchStats();
});
</script>

<style scoped>
.faculty-stats {
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.stat-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--border-radius);
  flex-shrink: 0;
}

.stat-icon-wrapper.trophy {
  background: linear-gradient(
    135deg,
    rgba(251, 191, 36, 0.1) 0%,
    rgba(245, 158, 11, 0.1) 100%
  );
}

.stat-icon-wrapper.students {
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.1) 0%,
    rgba(79, 70, 229, 0.1) 100%
  );
}

.stat-icon-wrapper.week {
  background: linear-gradient(
    135deg,
    rgba(16, 185, 129, 0.1) 0%,
    rgba(5, 150, 105, 0.1) 100%
  );
}

.stat-icon-wrapper.tokens {
  background: linear-gradient(
    135deg,
    rgba(139, 92, 246, 0.1) 0%,
    rgba(124, 58, 237, 0.1) 100%
  );
}

.stat-icon {
  width: 24px;
  height: 24px;
  color: var(--primary-color);
}

.stat-icon-wrapper.trophy .stat-icon {
  color: #f59e0b;
}

.stat-icon-wrapper.students .stat-icon {
  color: #6366f1;
}

.stat-icon-wrapper.week .stat-icon {
  color: #10b981;
}

.stat-icon-wrapper.tokens .stat-icon {
  color: #8b5cf6;
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 0.5rem 0;
}

.stat-value {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--primary-color);
  margin: 0 0 0.25rem 0;
  line-height: 1;
}

.stat-subtitle {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0;
}

.stat-trend {
  font-size: var(--font-size-sm);
  font-weight: 600;
  margin: 0.5rem 0 0 0;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.trend-up {
  color: var(--success-color);
}

.trend-down {
  color: var(--error-color);
}

.trend-icon {
  font-size: var(--font-size-base);
}

.error-state {
  padding: 2rem;
  text-align: center;
}

.error-state p {
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
