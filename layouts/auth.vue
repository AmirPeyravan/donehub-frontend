<template>
  <div class="relative min-h-screen w-full flex items-center justify-center bg-dark-bg p-4">
    <!-- Animated Background -->
    <AnimatedBackground class="opacity-10" />

    <!-- Auth Card -->
    <main class="relative z-10 w-full max-w-md">
      <div class="bg-dark-bg/60 backdrop-blur-sm border border-gray-800 rounded-lg shadow-lg p-8">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-primary">DoneHub</h1>
          <p class="text-dark-gray">Welcome to the future of productivity</p>
        </div>
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
// Logic for the auth layout
</script>