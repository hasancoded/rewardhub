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
  padding: 2rem;
  background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%);
  position: relative;
  overflow: hidden;
}

.auth-container::before {
  content: "";
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.1) 0%,
    transparent 70%
  );
  animation: float 20s infinite ease-in-out;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-20px, -20px);
  }
}

.auth-card {
  max-width: 460px;
  width: 100%;
  position: relative;
  z-index: 1;
  box-shadow: var(--shadow-2xl);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-header h1 {
  font-size: var(--font-size-3xl);
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--accent-teal) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.02em;
}

.auth-header p {
  color: var(--text-secondary);
  margin: 0;
  font-size: var(--font-size-base);
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

.auth-footer a {
  color: var(--primary-color);
  font-weight: var(--font-weight-semibold);
  transition: color var(--transition-fast);
}

.auth-footer a:hover {
  color: var(--primary-dark);
}
</style>
