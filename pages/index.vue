<script setup lang="ts">
definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

const { user } = useAuth()

useHead({
  title: 'Dashboard - Auth App',
  meta: [
    { name: 'description', content: 'Your dashboard' }
  ]
})

const formattedDate = computed(() => {
  if (!user.value?.created_at) return ''
  return new Date(user.value.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold text-text-primary mb-2">Welcome back!</h1>
      <p class="text-text-secondary">Here's your account information</p>
    </div>
    
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <BaseCard elevated>
        <div class="space-y-2">
          <p class="text-sm text-text-muted">Username</p>
          <p class="text-xl font-semibold text-text-primary">{{ user?.username }}</p>
        </div>
      </BaseCard>
      
      <BaseCard elevated>
        <div class="space-y-2">
          <p class="text-sm text-text-muted">User ID</p>
          <p class="text-xl font-semibold text-text-primary">#{{ user?.id }}</p>
        </div>
      </BaseCard>
      
      <BaseCard elevated>
        <div class="space-y-2">
          <p class="text-sm text-text-muted">Member Since</p>
          <p class="text-xl font-semibold text-text-primary">{{ formattedDate }}</p>
        </div>
      </BaseCard>
    </div>
    
    <BaseCard>
      <template #header>
        <h2 class="text-xl font-semibold text-text-primary">Quick Actions</h2>
      </template>
      
      <div class="space-y-4">
        <p class="text-text-secondary">
          Your account is active and ready to use. You can now access all features of the application.
        </p>
        
        <div class="flex gap-3">
          <BaseButton variant="primary">
            View Profile
          </BaseButton>
          <BaseButton variant="secondary">
            Settings
          </BaseButton>
        </div>
      </div>
    </BaseCard>
    
    <BaseCard elevated>
      <template #header>
        <h2 class="text-xl font-semibold text-text-primary">Account Status</h2>
      </template>
      
      <div class="space-y-3">
        <div class="flex items-center justify-between py-2 border-b border-border-light">
          <span class="text-text-secondary">Authentication</span>
          <span class="px-3 py-1 bg-success-light text-success text-sm font-medium rounded-full">
            Active
          </span>
        </div>
        
        <div class="flex items-center justify-between py-2 border-b border-border-light">
          <span class="text-text-secondary">Email Verified</span>
          <span class="px-3 py-1 bg-warning-light text-warning text-sm font-medium rounded-full">
            Pending
          </span>
        </div>
        
        <div class="flex items-center justify-between py-2">
          <span class="text-text-secondary">Two-Factor Auth</span>
          <span class="px-3 py-1 bg-gray-100 text-text-muted text-sm font-medium rounded-full">
            Disabled
          </span>
        </div>
      </div>
    </BaseCard>
  </div>
</template>