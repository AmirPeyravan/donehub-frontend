<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">{{ $t('role_management') }}</h1>
      <NuxtLink to="/admin/roles/create">
        <AppButton>{{ $t('create_new_role') }}</AppButton>
      </NuxtLink>
    </div>

    <!-- Roles Table -->
    <div class="bg-gray-800 rounded-lg overflow-hidden">
      <table class="w-full text-right">
        <thead class="bg-gray-700">
          <tr>
            <th class="p-4">{{ $t('role_display_name') }}</th>
            <th class="p-4">{{ $t('role_name') }}</th>
            <th class="p-4">{{ $t('users_count') }}</th>
            <th class="p-4">{{ $t('actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="pending" class="text-center">
            <td colspan="4" class="p-4">{{ $t('loading') }}</td>
          </tr>
          <tr v-else-if="error" class="text-center">
            <td colspan="4" class="p-4 text-red-500">{{ $t('roles_fetch_error') }}</td>
          </tr>
          <tr v-else v-for="role in roles" :key="role.id" class="border-t border-gray-700 hover:bg-gray-700/50">
            <td class="p-4 font-semibold">{{ role.display_name }}</td>
            <td class="p-4 font-mono text-sm">{{ role.name }}</td>
            <td class="p-4">{{ role.users_count }}</td>
            <td class="p-4 flex flex-wrap gap-2">
              <NuxtLink :to="`/admin/roles/${role.id}`">
                <AppButton size="sm" variant="outline">{{ $t('edit_role') }}</AppButton>
              </NuxtLink>
              <AppButton size="sm" variant="danger" @click="handleDeleteRole(role.id)">
                {{ $t('delete_role') }}
              </AppButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
});

const { t } = useI18n();

const { data: roles, pending, error, refresh } = await useApi('/auth/roles');

const handleDeleteRole = async (roleId) => {
  if (confirm(t('confirm_delete_role'))) {
    try {
      await useApi(`/auth/roles/${roleId}`, { method: 'DELETE' });
      alert(t('role_delete_success'));
      refresh();
    } catch (err) {
      alert(err.data?.message || t('role_delete_failed'));
    }
  }
};
</script>