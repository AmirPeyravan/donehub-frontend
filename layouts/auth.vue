<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-background p-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-primary mb-2">Auth App</h1>
        <p class="text-text-secondary">Welcome back!</p>
      </div>
      
      <BaseCard elevated padding="lg">
        <slot />
      </BaseCard>
      
      <p class="text-center text-sm text-text-muted mt-6">
        &copy; 2025 Auth App. All rights reserved.
      </p>
    </div>
    
    <NotificationToast />
  </div>
</template>