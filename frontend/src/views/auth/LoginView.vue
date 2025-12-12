<template>
  <div class="auth-container">
    <div class="auth-card card">
      <div class="auth-header">
        <h1>RewardHub</h1>
        <p>Sign in to your account</p>
      </div>

      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group">
          <label class="form-label" for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="form-input"
            :class="{ error: errors.email }"
            placeholder="Enter your email"
            required
          />
          <p v-if="errors.email" class="form-error">{{ errors.email }}</p>
        </div>

        <div class="form-group">
          <label class="form-label" for="password">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            class="form-input"
            :class="{ error: errors.password }"
            placeholder="Enter your password"
            required
          />
          <p v-if="errors.password" class="form-error">{{ errors.password }}</p>
        </div>

        <p v-if="errors.general" class="form-error">{{ errors.general }}</p>

        <button
          type="submit"
          class="btn btn-primary w-full"
          :disabled="loading"
        >
          {{ loading ? "Signing in..." : "Sign In" }}
        </button>
      </form>

      <div class="auth-footer">
        <p>
          Don't have an account?
          <router-link to="/register">Register</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { getErrorMessage } from "@/utils/helpers";
import { USER_ROLES } from "@/utils/constants";

const router = useRouter();
const authStore = useAuthStore();

const form = ref({
  email: "",
  password: "",
});

const errors = ref({});
const loading = ref(false);

async function handleLogin() {
  errors.value = {};
  loading.value = true;

  try {
    const data = await authStore.login(form.value);

    // Redirect based on role
    const role = data.user.role;
    if (role === USER_ROLES.ADMIN) {
      router.push("/admin/dashboard");
    } else if (role === USER_ROLES.FACULTY) {
      router.push("/faculty/dashboard");
    } else if (role === USER_ROLES.STUDENT) {
      router.push("/student/dashboard");
    }
  } catch (error) {
    errors.value.general = getErrorMessage(error);
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.auth-card {
  max-width: 420px;
  width: 100%;
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-header h1 {
  font-size: var(--font-size-3xl);
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.auth-header p {
  color: var(--text-secondary);
  margin: 0;
}

.auth-form {
  margin-bottom: 1.5rem;
}

.auth-footer {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.auth-footer p {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}
</style>
