<template>
  <div class="logo" :class="[`logo-${variant}`, `logo-${size}`]">
    <svg
      class="logo-icon"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color: #4f46e5; stop-opacity: 1" />
          <stop offset="100%" style="stop-color: #06b6d4; stop-opacity: 1" />
        </linearGradient>
      </defs>

      <!-- Shield shape -->
      <path
        d="M24 4C24 4 14 7 10 7C10 7 10 18 10 24C10 32 17 42 24 44C31 42 38 32 38 24C38 18 38 7 38 7C34 7 24 4 24 4Z"
        fill="url(#shieldGradient)"
        stroke="url(#shieldGradient)"
        stroke-width="1.5"
        stroke-linejoin="round"
      />

      <!-- Star symbol -->
      <path
        d="M24 14L25.545 19.382H31.18L26.818 22.618L28.363 28L24 24.764L19.637 28L21.182 22.618L16.82 19.382H22.455L24 14Z"
        fill="white"
        opacity="0.95"
      />

      <!-- Inner glow -->
      <path
        d="M24 6C24 6 15.5 8.5 12 8.5C12 8.5 12 18.5 12 24C12 31 18.5 40 24 41.5C29.5 40 36 31 36 24C36 18.5 36 8.5 36 8.5C32.5 8.5 24 6 24 6Z"
        fill="none"
        stroke="white"
        stroke-width="0.5"
        stroke-opacity="0.2"
      />
    </svg>

    <span v-if="variant === 'full'" class="logo-text">RewardHub</span>
  </div>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: "full",
    validator: (value) => ["icon", "full"].includes(value),
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg"].includes(value),
  },
});
</script>

<style scoped>
.logo {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  user-select: none;
}

.logo-icon {
  flex-shrink: 0;
  display: block;
}

.logo-text {
  font-weight: var(--font-weight-bold);
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--accent-teal) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  white-space: nowrap;
}

/* Size variants */
.logo-sm .logo-icon {
  width: 32px;
  height: 32px;
}

.logo-sm .logo-text {
  font-size: var(--font-size-lg);
}

.logo-md .logo-icon {
  width: 40px;
  height: 40px;
}

.logo-md .logo-text {
  font-size: var(--font-size-xl);
}

.logo-lg .logo-icon {
  width: 48px;
  height: 48px;
}

.logo-lg .logo-text {
  font-size: var(--font-size-2xl);
}

/* Icon-only variant */
.logo-icon {
  gap: 0;
}

/* Responsive behavior */
@media (max-width: 768px) {
  .logo-md .logo-icon {
    width: 36px;
    height: 36px;
  }

  .logo-md .logo-text {
    font-size: var(--font-size-lg);
  }
}
</style>
