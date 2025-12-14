<template>
  <div class="auth-container">
    <div class="auth-card card">
      <div class="auth-header">
        <h1>RewardHub</h1>
        <p>Create your account</p>
      </div>

      <form @submit.prevent="handleRegister" class="auth-form">
        <div class="form-group">
          <label class="form-label" for="name">Full Name</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            class="form-input"
            :class="{ error: errors.name }"
            placeholder="Enter your full name"
            required
          />
          <p v-if="errors.name" class="form-error">{{ errors.name }}</p>
        </div>

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
        <p v-if="successMessage" class="text-success">{{ successMessage }}</p>

        <button
          type="submit"
          class="btn btn-primary w-full"
          :disabled="loading"
        >
          {{ loading ? "Creating account..." : "Register" }}
        </button>
      </form>

      <div class="auth-footer">
        <p>
          Already have an account?
          <router-link to="/login">Sign in</router-link>
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

const router = useRouter();
const authStore = useAuthStore();

const form = ref({
  name: "",
  email: "",
  password: "",
});

const errors = ref({});
const loading = ref(false);
const successMessage = ref("");

async function handleRegister() {
  errors.value = {};
  successMessage.value = "";
  loading.value = true;

  try {
    await authStore.register(form.value);
    successMessage.value = "Registration successful! Redirecting to login...";

    setTimeout(() => {
      router.push("/login");
    }, 1500);
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
