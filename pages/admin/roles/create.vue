<template>
  <div class="p-8 rounded-lg bg-dark-bg/50 border border-gray-800">
    <h1 class="text-3xl font-bold text-primary mb-6">Create New Role</h1>

    <div v-if="pending" class="text-center">
      <p>Loading permissions...</p>
    </div>
    <div v-else-if="error" class="text-center text-red-500">
      <p>Failed to load necessary data. Please try again.</p>
    </div>
    <div v-else>
      <FormKit
        type="form"
        @submit="handleCreateRole"
        :actions="false"
        #default="{ state: { valid } }"
      >
        <FormKit
          type="text"
          name="display_name"
          label="Display Name"
          placeholder="e.g., Content Editor"
          validation="required"
        />
        <FormKit
          type="text"
          name="name"
          label="Internal Name (slug)"
          placeholder="e.g., content-editor"
          validation="required|alpha_dash"
          help="Use only letters, numbers, dashes, and underscores."
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

        <AppButton type="submit" class="mt-8" :disabled="!valid || loading">
          {{ loading ? 'Creating...' : 'Create Role' }}
        </AppButton>
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
import { useRouter } from 'vue-router';

definePageMeta({
  middleware: ['auth', 'admin'],
  layout: 'default',
});

const router = useRouter();
const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

// Fetch permissions and transform them for FormKit options
const { data: permissions, pending, error } = await useApi('/auth/permissions', {
  lazy: true,
  transform: (data) => {
    // The API returns a grouped object, let's format it for FormKit checkbox options { label, value }
    const formatted = {};
    for (const groupName in data) {
      formatted[groupName] = data[groupName].map(p => ({
        label: p.display_name,
        value: p.id
      }));
    }
    return formatted;
  }
});

const handleCreateRole = async (formData) => {
  loading.value = true;
  successMessage.value = '';
  errorMessage.value = '';

  try {
    await useApi('/auth/roles', {
      method: 'POST',
      body: {
        ...formData,
        permission_ids: formData.permission_ids || [], // Ensure it's an array
      },
    });
    successMessage.value = 'Role created successfully! Redirecting...';
    setTimeout(() => router.push('/admin/roles'), 2000);
  } catch (err) {
    errorMessage.value = err.data?.message || 'Failed to create role.';
    loading.value = false;
  }
};
</script>