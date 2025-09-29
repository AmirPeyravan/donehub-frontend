<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">{{ $t('create_role_title') }}</h1>

    <FormKit
      type="form"
      v-model="formData"
      @submit="handleCreateRole"
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
const router = useRouter();

const formData = ref({
  name: '',
  display_name: '',
  description: '',
  permission_ids: []
});
const loading = ref(false);
const error = ref(null);

// Fetch permissions
const { data: permissions, pending: permissionsPending, error: permissionsError } = await useApi('/auth/permissions');

const groupedPermissions = computed(() => {
  if (!permissions.value) return {};
  return permissions.value.reduce((acc, permission) => {
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

const handleCreateRole = async (data) => {
  loading.value = true;
  error.value = null;
  try {
    await useApi('/auth/roles', {
      method: 'POST',
      body: data
    });
    alert(t('role_create_success'));
    router.push('/admin/roles');
  } catch (err) {
    error.value = err.data?.message || t('role_create_failed');
  } finally {
    loading.value = false;
  }
};
</script>