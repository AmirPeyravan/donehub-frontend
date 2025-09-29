<template>
  <div class="flex h-screen bg-gray-900 text-white">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-800 p-4">
      <h1 class="text-2xl font-bold mb-8">{{ $t('admin_panel') }}</h1>
      <nav class="flex flex-col gap-4">
        <NuxtLink
          to="/admin/users"
          class="px-4 py-2 rounded hover:bg-gray-700"
          active-class="bg-blue-600 font-bold"
        >
          {{ $t('user_management') }}
        </NuxtLink>
        <NuxtLink
          to="/admin/roles"
          class="px-4 py-2 rounded hover:bg-gray-700"
          active-class="bg-blue-600 font-bold"
        >
          {{ $t('role_management') }}
        </NuxtLink>
        <NuxtLink
          to="/admin/permissions"
          class="px-4 py-2 rounded hover:bg-gray-700"
          active-class="bg-blue-600 font-bold"
        >
          {{ $t('permission_management') }}
        </NuxtLink>
      </nav>
      <div class="mt-auto">
        <NuxtLink to="/profile" class="block px-4 py-2 mt-4 rounded hover:bg-gray-700">
          &larr; {{ $t('back_to_profile') }}
        </NuxtLink>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8 overflow-y-auto">
      <slot />
    </main>
  </div>
</template>

<script setup>
const { t } = useI18n();
</script>

<style scoped>
/* Scoped styles for the admin layout */
.router-link-exact-active {
  background-color: #2563eb; /* bg-blue-600 */
  font-weight: bold;
}
</style>