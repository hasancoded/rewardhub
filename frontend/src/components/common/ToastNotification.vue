<template>
  <div class="toast-container">
    <transition-group name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="['toast', `toast-${toast.type}`]"
      >
        <div class="toast-content">
          <span class="toast-icon">{{ getIcon(toast.type) }}</span>
          <span class="toast-message">{{ toast.message }}</span>
        </div>
        <button class="toast-close" @click="removeToast(toast.id)">×</button>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { ref } from "vue";

const toasts = ref([]);
let nextId = 1;

function getIcon(type) {
  const icons = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ",
  };
  return icons[type] || "ℹ";
}

function addToast(message, type = "info", duration = 3000) {
  const id = nextId++;
  toasts.value.push({ id, message, type });

  if (duration > 0) {
    setTimeout(() => removeToast(id), duration);
  }
}

function removeToast(id) {
  const index = toasts.value.findIndex((t) => t.id === id);
  if (index !== -1) {
    toasts.value.splice(index, 1);
  }
}

defineExpose({ addToast });
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 420px;
}

.toast {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  background: var(--bg-elevated);
  border: 1px solid var(--border-color);
  border-left-width: 4px;
  min-width: 320px;
  backdrop-filter: blur(8px);
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  flex: 1;
}

.toast-icon {
  font-size: 1.25rem;
  font-weight: var(--font-weight-bold);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--border-radius-full);
  flex-shrink: 0;
}

.toast-message {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  line-height: 1.5;
  font-weight: var(--font-weight-medium);
}

.toast-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-tertiary);
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius);
  transition: all var(--transition-base);
  flex-shrink: 0;
  line-height: 1;
}

.toast-close:hover {
  background-color: var(--gray-100);
  color: var(--text-primary);
}

.toast-success {
  border-left-color: var(--success-color);
  background: linear-gradient(
    135deg,
    var(--bg-elevated) 0%,
    var(--success-subtle) 100%
  );
}

.toast-success .toast-icon {
  color: var(--success-color);
  background-color: var(--success-subtle);
}

.toast-error {
  border-left-color: var(--danger-color);
  background: linear-gradient(
    135deg,
    var(--bg-elevated) 0%,
    var(--danger-subtle) 100%
  );
}

.toast-error .toast-icon {
  color: var(--danger-color);
  background-color: var(--danger-subtle);
}

.toast-warning {
  border-left-color: var(--warning-color);
  background: linear-gradient(
    135deg,
    var(--bg-elevated) 0%,
    var(--warning-subtle) 100%
  );
}

.toast-warning .toast-icon {
  color: var(--warning-color);
  background-color: var(--warning-subtle);
}

.toast-info {
  border-left-color: var(--info-color);
  background: linear-gradient(
    135deg,
    var(--bg-elevated) 0%,
    var(--info-subtle) 100%
  );
}

.toast-info .toast-icon {
  color: var(--info-color);
  background-color: var(--info-subtle);
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}
</style>
