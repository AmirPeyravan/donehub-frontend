<script setup lang="ts">
import type { NotificationType } from '~/types/auth'

const { notifications, remove } = useNotification()

const getIcon = (type: NotificationType) => {
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  }
  return icons[type]
}

const getColorClasses = (type: NotificationType) => {
  const colors = {
    success: 'bg-success-light text-success border-success',
    error: 'bg-error-light text-error border-error',
    warning: 'bg-warning-light text-warning border-warning',
    info: 'bg-blue-50 text-blue-600 border-blue-600'
  }
  return colors[type]
}
</script>

<template>
  <div class="fixed top-4 right-4 z-50 space-y-2">
    <TransitionGroup
      name="notification"
      tag="div"
      class="space-y-2"
    >
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="[
          'flex items-start gap-3 p-4 rounded-lg border-l-4 shadow-medium min-w-[300px] max-w-md',
          getColorClasses(notification.type)
        ]"
      >
        <span class="text-xl font-bold flex-shrink-0">
          {{ getIcon(notification.type) }}
        </span>
        
        <p class="flex-1 text-sm font-medium">
          {{ notification.message }}
        </p>
        
        <button
          @click="remove(notification.id)"
          class="flex-shrink-0 text-current opacity-60 hover:opacity-100 transition-opacity"
        >
          ✕
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.notification-enter-active {
  animation: slideIn 0.3s ease-out;
}

.notification-leave-active {
  animation: slideOut 0.2s ease-in;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>