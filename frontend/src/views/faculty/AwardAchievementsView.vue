<template>
  <div class="dashboard-layout">
    <AppHeader />
    <div class="dashboard-content">
      <AppSidebar />
      <main class="main-content">
        <div class="page-header">
          <div class="header-content">
            <h1>Award Achievements</h1>
            <p class="header-subtitle">
              Recognize student accomplishments with achievement awards
            </p>
          </div>
        </div>

        <div class="award-container">
          <div class="award-card">
            <div class="card-header">
              <div class="icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="trophy-icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
                  />
                </svg>
              </div>
              <div class="header-text">
                <h2>Award Details</h2>
                <p>Select the student and achievement to award</p>
              </div>
            </div>

            <form @submit.prevent="handleAward" class="award-form">
              <div class="form-section">
                <div class="form-group">
                  <label class="form-label">
                    <span class="label-text">Student Recipient</span>
                    <span class="label-hint"
                      >Who is receiving this achievement?</span
                    >
                  </label>
                  <div class="select-wrapper">
                    <select
                      v-model="form.studentId"
                      class="form-select"
                      required
                    >
                      <option value="">Choose a student...</option>
                      <option
                        v-for="student in students"
                        :key="student._id"
                        :value="student._id"
                      >
                        {{ student.name }} • {{ student.email }}
                      </option>
                    </select>
                    <div class="select-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">
                    <span class="label-text">Achievement Type</span>
                    <span class="label-hint"
                      >What are they being recognized for?</span
                    >
                  </label>
                  <div class="select-wrapper">
                    <select
                      v-model="form.achievementId"
                      class="form-select"
                      required
                    >
                      <option value="">Choose an achievement...</option>
                      <option
                        v-for="achievement in achievements"
                        :key="achievement._id"
                        :value="achievement._id"
                      >
                        {{ achievement.title }} •
                        {{ achievement.tokenReward }} tokens
                      </option>
                    </select>
                    <div class="select-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-footer">
                <div
                  class="info-banner"
                  v-if="form.studentId && form.achievementId"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="info-icon"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                    />
                  </svg>
                  <span
                    >Ready to award! This action will notify the student and
                    update their token balance.</span
                  >
                </div>

                <button
                  type="submit"
                  class="btn btn-primary btn-award"
                  :disabled="loading"
                >
                  <svg
                    v-if="!loading"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="btn-icon"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span v-if="loading" class="spinner-sm"></span>
                  <span>{{
                    loading ? "Awarding..." : "Award Achievement"
                  }}</span>
                </button>
              </div>
            </form>
          </div>

          <div class="info-panel">
            <div class="info-card">
              <div class="info-header">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="info-card-icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                  />
                </svg>
                <h3>Quick Tips</h3>
              </div>
              <ul class="tips-list">
                <li>
                  <span class="tip-bullet"></span>
                  <span>Students will receive instant notifications</span>
                </li>
                <li>
                  <span class="tip-bullet"></span>
                  <span>Tokens are automatically credited</span>
                </li>
                <li>
                  <span class="tip-bullet"></span>
                  <span>All awards are recorded on-chain</span>
                </li>
                <li>
                  <span class="tip-bullet"></span>
                  <span>Awards cannot be revoked once granted</span>
                </li>
              </ul>
            </div>

            <div class="stats-mini">
              <div class="stat-mini-item">
                <div class="stat-mini-label">Students</div>
                <div class="stat-mini-value">{{ students.length }}</div>
              </div>
              <div class="stat-mini-item">
                <div class="stat-mini-label">Achievements</div>
                <div class="stat-mini-value">{{ achievements.length }}</div>
              </div>
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
import { getStudents } from "@/services/admin.service";
import { useAchievementsStore } from "@/stores/achievements";
import { awardAchievement } from "@/services/studentAchievement.service";
import { parseApiError } from "@/utils/errorParser";

const achievementsStore = useAchievementsStore();
const students = ref([]);
const achievements = ref([]);
const loading = ref(false);
const form = ref({ studentId: "", achievementId: "" });

async function loadData() {
  try {
    const studentsData = await getStudents();
    students.value = studentsData.students;

    await achievementsStore.fetchPublicAchievements();
    achievements.value = achievementsStore.achievements;
  } catch (error) {
    console.error("Error loading data:", error);
    window.$toast?.(parseApiError(error), "error");
  }
}

async function handleAward() {
  loading.value = true;
  try {
    await awardAchievement(form.value);
    window.$toast?.("Achievement awarded successfully!", "success");
    form.value = { studentId: "", achievementId: "" };
  } catch (error) {
    console.error("Error awarding achievement:", error);
    window.$toast?.(parseApiError(error), "error");
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadData();
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
  margin-bottom: 2.5rem;
}

.header-content h1 {
  font-size: var(--font-size-3xl);
  margin-bottom: 0.5rem;
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--accent-teal) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.02em;
}

.header-subtitle {
  color: var(--text-secondary);
  font-size: var(--font-size-base);
  margin: 0;
}

.award-container {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 2rem;
  align-items: start;
}

.award-card {
  background: var(--bg-elevated);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 2rem;
  background: linear-gradient(
    135deg,
    var(--primary-subtle) 0%,
    var(--accent-teal-subtle) 100%
  );
  border-bottom: 1px solid var(--border-color);
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--accent-teal) 100%
  );
  border-radius: var(--border-radius-lg);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
  flex-shrink: 0;
}

.trophy-icon {
  width: 28px;
  height: 28px;
  color: white;
  stroke-width: 2.5;
}

.header-text h2 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin: 0 0 0.25rem 0;
  letter-spacing: -0.01em;
}

.header-text p {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0;
}

.award-form {
  padding: 2rem;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
}

.label-text {
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  font-size: var(--font-size-sm);
}

.label-hint {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  font-weight: var(--font-weight-normal);
}

.select-wrapper {
  position: relative;
}

.form-select {
  width: 100%;
  padding: 0.875rem 3rem 0.875rem 1rem;
  font-size: var(--font-size-sm);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: all var(--transition-base);
  appearance: none;
  cursor: pointer;
  font-weight: var(--font-weight-medium);
}

.form-select:hover {
  border-color: var(--gray-300);
  background-color: var(--gray-50);
}

.form-select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: var(--focus-ring);
  background-color: var(--bg-primary);
}

.select-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: var(--text-tertiary);
  pointer-events: none;
  transition: color var(--transition-base);
}

.form-select:focus ~ .select-icon {
  color: var(--primary-color);
}

.form-footer {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.info-banner {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 1rem 1.25rem;
  background: linear-gradient(
    135deg,
    var(--accent-teal-subtle) 0%,
    rgba(6, 182, 212, 0.03) 100%
  );
  border: 1px solid var(--accent-teal);
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-sm);
  color: var(--accent-teal-dark);
  font-weight: var(--font-weight-medium);
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.info-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: var(--accent-teal);
}

.btn-award {
  padding: 1rem 1.75rem;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  width: 100%;
  position: relative;
}

.btn-icon {
  width: 20px;
  height: 20px;
}

.info-panel {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-card {
  background: var(--bg-elevated);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  padding: 1.75rem;
}

.info-header {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.info-card-icon {
  width: 22px;
  height: 22px;
  color: var(--primary-color);
}

.info-header h3 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0;
}

.tips-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.tips-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.6;
}

.tip-bullet {
  width: 6px;
  height: 6px;
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--accent-teal) 100%
  );
  border-radius: 50%;
  margin-top: 0.5rem;
  flex-shrink: 0;
}

.stats-mini {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.stat-mini-item {
  background: linear-gradient(
    135deg,
    var(--primary-subtle) 0%,
    var(--accent-teal-subtle) 100%
  );
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 1.25rem;
  text-align: center;
  transition: all var(--transition-base);
}

.stat-mini-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.stat-mini-label {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: var(--font-weight-semibold);
  margin-bottom: 0.5rem;
}

.stat-mini-value {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--accent-teal) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

@media (max-width: 1024px) {
  .award-container {
    grid-template-columns: 1fr;
  }

  .info-panel {
    order: -1;
  }

  .stats-mini {
    display: flex;
    gap: 1rem;
  }

  .stat-mini-item {
    flex: 1;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 1rem;
  }

  .page-header {
    margin-bottom: 1.5rem;
  }

  .header-content h1 {
    font-size: var(--font-size-2xl);
  }

  .card-header {
    padding: 1.5rem;
  }

  .icon-wrapper {
    width: 48px;
    height: 48px;
  }

  .trophy-icon {
    width: 24px;
    height: 24px;
  }

  .award-form {
    padding: 1.5rem;
  }

  .info-card {
    padding: 1.5rem;
  }
}
</style>
