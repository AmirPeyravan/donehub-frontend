<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">{{ $t('edit_role_title') }}</h1>

    <div v-if="rolePending" class="text-center">{{ $t('loading') }}</div>
    <div v-else-if="roleError" class="text-red-500">{{ $t('roles_fetch_error') }}</div>
    <FormKit
      v-else
      type="form"
      v-model="formData"
      @submit="handleUpdateRole"
      :actions="false"
    >
      <FormKit
        type="text"
        name="display_name"
        :label="$t('role_display_name')"
        validation="required"
      />
      <FormKit
        type="text"
        name="name"
        :label="$t('role_name')"
        validation="required|alpha:latin"
        help="فقط حروف انگلیسی و خط تیره (-)"
        disabled
      />
      <FormKit
        type="textarea"
        name="description"
        :label="$t('role_description')"
      />

      <!-- Permissions -->
      <div class="mt-6">
        <h2 class="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">{{ $t('assign_permissions') }}</h2>
        <div v-if="permissionsPending" class="text-center">{{ $t('loading') }}</div>
        <div v-else-if="permissionsError" class="text-red-500">{{ $t('permissions_fetch_error') }}</div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(group, groupName) in groupedPermissions" :key="groupName" class="bg-gray-800 p-4 rounded-lg">
            <h3 class="font-bold text-lg mb-3">{{ groupName }}</h3>
            <FormKit
              type="checkbox"
              name="permission_ids"
              :options="group"
            />
          </div>
        </div>
      </div>

      <AppButton type="submit" class="mt-6" :disabled="loading">
        {{ loading ? $t('loading') : $t('save_changes') }}
      </AppButton>
      <div v-if="error" class="mt-4 text-red-500">{{ error }}</div>
      <div v-if="success" class="mt-4 text-green-500">{{ success }}</div>
    </FormKit>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
});

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const roleId = route.params.id;

const formData = ref({
  name: '',
  display_name: '',
  description: '',
  permission_ids: []
});
const loading = ref(false);
const error = ref(null);
const success = ref(null);

// Fetch role, its permissions, and all available permissions concurrently
const { data: roleData, pending: rolePending, error: roleError } = await useApi(`/auth/roles/${roleId}`);
const { data: rolePermissions, pending: rolePermissionsPending } = await useApi(`/auth/permissions/role/${roleId}`);
const { data: allPermissions, pending: permissionsPending, error: permissionsError } = await useApi('/auth/permissions');

if (roleData.value) {
  formData.value = {
    name: roleData.value.name,
    display_name: roleData.value.display_name,
    description: roleData.value.description,
    permission_ids: rolePermissions.value ? rolePermissions.value.map(p => p.id) : []
  };
}

const groupedPermissions = computed(() => {
  if (!allPermissions.value) return {};
  return allPermissions.value.reduce((acc, permission) => {
    const group = permission.group || 'General';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push({
      label: permission.display_name,
      value: permission.id,
      help: permission.description
    });
    return acc;
  }, {});
});

const handleUpdateRole = async (data) => {
  loading.value = true;
  error.value = null;
  success.value = null;
  try {
    // Update role details (display_name, description)
    await useApi(`/auth/roles/${roleId}`, {
      method: 'PUT',
      body: {
        display_name: data.display_name,
        description: data.description
      }
    });

    // Update role permissions
    await useApi(`/auth/permissions/role/${roleId}`, {
      method: 'PUT',
      body: {
        permission_ids: data.permission_ids
      }
    });

    success.value = t('role_update_success');
    setTimeout(() => router.push('/admin/roles'), 2000);
  } catch (err) {
    error.value = err.data?.message || t('role_update_failed');
  } finally {
    loading.value = false;
  }
};
</script>