<template>
  <div class="p-8 rounded-lg bg-dark-bg/50 border border-gray-800">
    <h1 class="text-3xl font-bold text-primary mb-6">User Management</h1>

    <div v-if="pending" class="text-center">
      <p>Loading users...</p>
    </div>
    <div v-else-if="error" class="text-center text-red-500">
      <p>Failed to load users. You may not have the required permissions.</p>
    </div>
    <div v-else-if="users && users.data.length > 0">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="border-b border-gray-700">
            <tr>
              <th class="p-4">Name</th>
              <th class="p-4">Email</th>
              <th class="p-4">Username</th>
              <th class="p-4">Status</th>
              <th class="p-4">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            <tr v-for="user in users.data" :key="user.id" class="hover:bg-dark-bg/30">
              <td class="p-4">{{ user.name }}</td>
              <td class="p-4">{{ user.email }}</td>
              <td class="p-4">{{ user.username || 'N/A' }}</td>
              <td class="p-4">
                <span :class="user.is_locked ? 'text-red-400' : 'text-secondary'">
                  {{ user.is_locked ? 'Locked' : 'Active' }}
                </span>
              </td>
              <td class="p-4">
                <NuxtLink :to="`/admin/users/${user.id}`" class="text-primary hover:underline">
                  Edit
                </NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Pagination will be added here later -->
    </div>
    <div v-else>
      <p class="text-center text-dark-gray">No users found.</p>
    </div>
  </div>
</template>

<script setup>
import { useApi } from '~/composables/useApi';

definePageMeta({
  middleware: ['auth', 'admin'],
  layout: 'default',
});

// The API is expected to return a paginated response, e.g., { data: [], links: {}, meta: {} }
const { data: users, pending, error } = await useApi('/auth/users', {
  lazy: true, // Use lazy loading for better UX
});
</script>