<template>
  <div class="p-8 rounded-lg bg-dark-bg/50 border border-gray-800">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-primary">Role Management</h1>
      <NuxtLink to="/admin/roles/create">
        <AppButton>Create New Role</AppButton>
      </NuxtLink>
    </div>

    <div v-if="pending" class="text-center">
      <p>Loading roles...</p>
    </div>
    <div v-else-if="error" class="text-center text-red-500">
      <p>Failed to load roles. You may not have the required permissions.</p>
    </div>
    <div v-else-if="roles && roles.length > 0">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="border-b border-gray-700">
            <tr>
              <th class="p-4">Display Name</th>
              <th class="p-4">Internal Name</th>
              <th class="p-4">Users Count</th>
              <th class="p-4">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            <tr v-for="role in roles" :key="role.id" class="hover:bg-dark-bg/30">
              <td class="p-4 font-semibold">{{ role.display_name }}</td>
              <td class="p-4 font-mono text-dark-gray">{{ role.name }}</td>
              <td class="p-4">{{ role.users_count }}</td>
              <td class="p-4">
                <NuxtLink :to="`/admin/roles/${role.id}`" class="text-primary hover:underline">
                  Edit
                </NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else>
      <p class="text-center text-dark-gray">No roles found. Create one to get started.</p>
    </div>
  </div>
</template>

<script setup>
import { useApi } from '~/composables/useApi';

definePageMeta({
  middleware: ['auth', 'admin'],
  layout: 'default',
});

const { data: roles, pending, error } = await useApi('/auth/roles', {
  lazy: true,
});
</script>