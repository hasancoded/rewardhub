<template>
  <div class="quick-award card">
    <h2 class="section-title">Quick Award</h2>
    <p class="section-subtitle">
      Award an achievement without leaving the dashboard
    </p>

    <form @submit.prevent="handleAward" class="award-form">
      <div class="form-row">
        <div class="form-group">
          <label for="student" class="form-label">Student</label>
          <select
            id="student"
            v-model="form.studentId"
            class="form-select"
            required
            :disabled="loading || awarding"
          >
            <option value="">Choose a student...</option>
            <option
              v-for="student in students"
              :key="student._id"
              :value="student._id"
            >
              {{ student.name }} - {{ student.email }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="achievement" class="form-label">Achievement</label>
          <select
            id="achievement"
            v-model="form.achievementId"
            class="form-select"
            required
            :disabled="loading || awarding"
          >
            <option value="">Choose an achievement...</option>
            <option
              v-for="achievement in achievements"
              :key="achievement._id"
              :value="achievement._id"
            >
              {{ achievement.title }} ({{ achievement.tokenReward }} tokens)
            </option>
          </select>
        </div>

        <div class="form-actions">
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="
              loading || awarding || !form.studentId || !form.achievementId
            "
          >
            {{ awarding ? "Awarding..." : "Award" }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getStudents } from "@/services/admin.service";
import { useAchievementsStore } from "@/stores/achievements";
import { awardAchievement } from "@/services/studentAchievement.service";

const emit = defineEmits(["award-success"]);

const achievementsStore = useAchievementsStore();
const students = ref([]);
const achievements = ref([]);
const loading = ref(false);
const awarding = ref(false);

const form = ref({
  studentId: "",
  achievementId: "",
});

async function loadData() {
  loading.value = true;
  try {
    // Fetch students
    const studentsData = await getStudents();
    students.value = studentsData.students;

    // Fetch achievements
    await achievementsStore.fetchPublicAchievements();
    achievements.value = achievementsStore.achievements;
  } catch (error) {
    console.error("Error loading data:", error);
    window.$toast?.("Error loading data: " + error.message, "error");
  } finally {
    loading.value = false;
  }
}

async function handleAward() {
  awarding.value = true;
  try {
    await awardAchievement(form.value);
    window.$toast?.("Achievement awarded successfully!", "success");

    // Reset form
    form.value = {
      studentId: "",
      achievementId: "",
    };

    // Emit success event to parent
    emit("award-success");
  } catch (error) {
    console.error("Error awarding achievement:", error);
    window.$toast?.("Error awarding achievement: " + error.message, "error");
  } finally {
    awarding.value = false;
  }
}

onMounted(() => {
  loadData();
});
</script>

<style scoped>
.quick-award {
  margin-bottom: 2rem;
}

.section-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
}

.section-subtitle {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0 0 1.5rem 0;
}

.award-form {
  max-width: 100%;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 1rem;
  align-items: end;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--text-primary);
}

.form-select {
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: var(--font-size-base);
  transition: all 0.2s ease;
}

.form-select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-select:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-actions {
  display: flex;
  align-items: flex-end;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-base);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: var(--primary-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .btn {
    width: 100%;
  }
}
</style>
