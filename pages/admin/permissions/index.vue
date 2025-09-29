<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">{{ $t('permission_management') }}</h1>
      <NuxtLink to="/admin/permissions/create">
        <AppButton>{{ $t('create_new_permission') }}</AppButton>
      </NuxtLink>
    </div>

    <!-- Permissions List -->
    <div v-if="pending" class="text-center">{{ $t('loading') }}</div>
    <div v-else-if="error" class="text-red-500">{{ $t('permissions_fetch_error') }}</div>
    <div v-else class="space-y-8">
      <div v-for="(group, groupName) in groupedPermissions" :key="groupName" class="bg-gray-800 rounded-lg overflow-hidden">
        <h2 class="text-xl font-bold p-4 bg-gray-700/50">{{ groupName }}</h2>
        <table class="w-full text-right">
          <thead>
            <tr>
              <th class="p-4 w-1/3">{{ $t('permission_display_name') }}</th>
              <th class="p-4 w-1/3">{{ $t('permission_name') }}</th>
              <th class="p-4 w-1/3">{{ $t('actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="permission in group" :key="permission.id" class="border-t border-gray-700 hover:bg-gray-700/50">
              <td class="p-4">
                <p class="font-semibold">{{ permission.display_name }}</p>
                <p class="text-sm text-gray-400">{{ permission.description }}</p>
              </td>
              <td class="p-4 font-mono text-sm">{{ permission.name }}</td>
              <td class="p-4 flex flex-wrap gap-2">
                <NuxtLink :to="`/admin/permissions/${permission.id}`">
                  <AppButton size="sm" variant="outline">{{ $t('edit_permission') }}</AppButton>
                </NuxtLink>
                <AppButton size="sm" variant="danger" @click="handleDeletePermission(permission.id)">
                  {{ $t('delete_permission') }}
                </AppButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
});

const { t } = useI18n();

const { data: permissions, pending, error, refresh } = await useApi('/auth/permissions');

const groupedPermissions = computed(() => {
  if (!permissions.value) return {};
  return permissions.value.reduce((acc, permission) => {
    const group = permission.group || 'General';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(permission);
    return acc;
  }, {});
});

const handleDeletePermission = async (permissionId) => {
  if (confirm(t('confirm_delete_permission'))) {
    try {
      await useApi(`/auth/permissions/${permissionId}`, { method: 'DELETE' });
      alert(t('permission_delete_success'));
      refresh();
    } catch (err) {
      alert(err.data?.message || t('permission_delete_failed'));
    }
  }
};
</script>