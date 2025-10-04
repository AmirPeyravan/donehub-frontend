<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const handleLogout = async () => {
  await authStore.logout()
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <header class="bg-surface shadow-soft">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-xl font-bold text-primary">Auth App</NuxtLink>
          </div>
          
          <div v-if="authStore.isAuthenticated" class="flex items-center gap-4">
            <div class="text-sm">
              <span class="text-text-muted">Welcome,</span>
              <span class="font-medium text-text-primary ml-1">{{ user?.username }}</span>
            </div>
            
            <BaseButton
              variant="secondary"
              size="sm"
              @click="handleLogout"
            >
              Logout
            </BaseButton>
          </div>
        </div>
      </div>
    </header>
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>
    
    <footer class="mt-auto py-6 text-center text-sm text-text-muted">
      <p>&copy; 2025 Auth App. All rights reserved.</p>
    </footer>
    
    <!-- This component will display notifications from useNotification -->
    <NotificationToast />
  </div>
</template>