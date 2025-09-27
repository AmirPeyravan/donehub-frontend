<template>
  <div class="relative min-h-screen w-full flex bg-dark-bg">
    <!-- Animated Background -->
    <AnimatedBackground class="opacity-20" />

    <!-- Sidebar -->
    <aside class="relative z-10 w-64 bg-dark-bg/50 backdrop-blur-sm border-r border-gray-800 p-6">
      <NuxtLink to="/" class="text-2xl font-bold text-primary mb-10 block">DoneHub</NuxtLink>
      <nav class="flex flex-col space-y-4">
        <NuxtLink to="/profile" class="flex items-center space-x-3 text-light-gray hover:text-primary transition-colors">
          <span>Profile</span>
        </NuxtLink>
        <NuxtLink to="/profile/settings" class="flex items-center space-x-3 text-light-gray hover:text-primary transition-colors">
          <span>Settings</span>
        </NuxtLink>
        <NuxtLink v-if="authStore.isAdmin" to="/admin/users" class="flex items-center space-x-3 text-light-gray hover:text-primary transition-colors">
          <span>User Management</span>
        </NuxtLink>
        <NuxtLink v-if="authStore.isAdmin" to="/admin/roles" class="flex items-center space-x-3 text-light-gray hover:text-primary transition-colors">
          <span>Role Management</span>
        </NuxtLink>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="relative z-10 flex-1 p-8">
      <slot />
    </main>
  </div>
</template>

<script setup>
const authStore = useAuthStore();
</script>

<style scoped>
.router-link-active {
  @apply text-primary font-semibold;
}
</style>