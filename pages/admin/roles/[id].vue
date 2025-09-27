<template>
  <div class="p-8 rounded-lg bg-dark-bg/50 border border-gray-800">
    <div v-if="pending" class="text-center">
      <p>Loading role data...</p>
    </div>
    <div v-else-if="error" class="text-center text-red-500">
      <p>Failed to load role. It may not exist or you lack permissions.</p>
      <NuxtLink to="/admin/roles" class="text-primary hover:underline mt-4">Back to Role List</NuxtLink>
    </div>
    <div v-else-if="role && permissions">
      <h1 class="text-3xl font-bold text-primary mb-6">Edit Role: {{ role.display_name }}</h1>

      <FormKit
        type="form"
        v-model="formData"
        @submit="handleUpdateRole"
        :actions="false"
        #default="{ state: { valid } }"
      >
        <FormKit
          type="text"
          name="display_name"
          label="Display Name"
          validation="required"
        />
        <FormKit
          type="text"
          name="name"
          label="Internal Name (slug)"
          validation="required|alpha_dash"
          disabled
          help="The internal name cannot be changed."
        />

        <h2 class="text-xl font-semibold text-secondary mt-8 mb-4">Assign Permissions</h2>
        <div class="space-y-6">
          <div v-for="(group, groupName) in permissions" :key="groupName" class="p-4 border border-gray-700 rounded-lg">
            <h3 class="text-lg font-semibold text-light-gray mb-3">{{ groupName }}</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <FormKit
                type="checkbox"
                name="permission_ids"
                :options="group"
                decorator-class="mr-2"
              />
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between mt-8">
          <AppButton type="submit" :disabled="!valid || loading">
            {{ loading ? 'Saving...' : 'Save Changes' }}
          </AppButton>
          <AppButton @click="handleDeleteRole" class="bg-red-600 hover:bg-red-700" :disabled="loading">
            Delete Role
          </AppButton>
        </div>
      </FormKit>

      <div v-if="successMessage" class="mt-6 p-4 bg-secondary/20 text-secondary border border-secondary/30 rounded-md">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="mt-6 p-4 bg-red-500/20 text-red-400 border border-red-500/30 rounded-md">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useApi } from '~/composables/useApi';
import { useRoute, useRouter } from 'vue-router';

definePageMeta({
  middleware: ['auth', 'admin'],
  layout: 'default',
});

const route = useRoute();
const router = useRouter();
const roleId = route.params.id;

const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');
const formData = ref({ permission_ids: [] });

// Fetch both role and permissions data in parallel
const [{ data: role, error: roleError }, { data: permissions, error: permError }] = await Promise.all([
  useApi(`/auth/roles/${roleId}`),
  useApi('/auth/permissions')
]);

// Handle potential errors from parallel fetches
const pending = ref(!role && !roleError && !permError);
const error = ref(roleError.value || permError.value);

if (role.value && permissions.value) {
  // Populate form data with existing role details
  formData.value = {
    name: role.value.name,
    display_name: role.value.display_name,
    permission_ids: role.value.permissions?.map(p => p.id) || [],
  };

  // Transform permissions for FormKit options
  const formattedPermissions = {};
  for (const groupName in permissions.value) {
    formattedPermissions[groupName] = permissions.value[groupName].map(p => ({
      label: p.display_name,
      value: p.id
    }));
  }
  permissions.value = formattedPermissions;
}

const handleUpdateRole = async (data) => {
  loading.value = true;
  successMessage.value = '';
  errorMessage.value = '';
  try {
    await useApi(`/auth/roles/${roleId}`, {
      method: 'PUT',
      body: {
        display_name: data.display_name,
        permission_ids: data.permission_ids || [],
      },
    });
    successMessage.value = 'Role updated successfully!';
  } catch (err) {
    errorMessage.value = err.data?.message || 'Failed to update role.';
  } finally {
    loading.value = false;
  }
};

const handleDeleteRole = async () => {
  if (!confirm('Are you sure you want to delete this role? This action cannot be undone.')) {
    return;
  }
  loading.value = true;
  errorMessage.value = '';
  try {
    await useApi(`/auth/roles/${roleId}`, { method: 'DELETE' });
    alert('Role deleted successfully.');
    router.push('/admin/roles');
  } catch (err) {
    errorMessage.value = err.data?.message || 'Failed to delete role.';
    loading.value = false;
  }
};
</script>