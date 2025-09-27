<template>
  <div class="p-8 rounded-lg bg-dark-bg/50 border border-gray-800">
    <div v-if="pending" class="text-center">
      <p>Loading user data...</p>
    </div>
    <div v-else-if="error" class="text-center text-red-500">
      <p>Failed to load user. The user may not exist or you lack permissions.</p>
      <NuxtLink to="/admin/users" class="text-primary hover:underline mt-4">Back to User List</NuxtLink>
    </div>
    <div v-else-if="user">
      <h1 class="text-3xl font-bold text-primary mb-6">Edit User: {{ user.name }}</h1>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Edit Form -->
        <div class="lg:col-span-2">
          <h2 class="text-xl font-semibold text-secondary mb-4">User Details</h2>
          <FormKit
            type="form"
            v-model="userData"
            @submit="handleUpdateUser"
            :actions="false"
            #default="{ state: { valid } }"
          >
            <FormKit type="text" name="name" label="Name" validation="required" />
            <FormKit type="email" name="email" label="Email" validation="required|email" />
            <FormKit type="text" name="username" label="Username" />
            <AppButton type="submit" class="mt-4" :disabled="!valid || loading.update">
              {{ loading.update ? 'Saving...' : 'Save Changes' }}
            </AppButton>
          </FormKit>
        </div>

        <!-- Actions -->
        <div>
          <h2 class="text-xl font-semibold text-secondary mb-4">Actions</h2>
          <div class="space-y-4">
            <AppButton @click="handleToggleLock" class="w-full" :variant="user.is_locked ? 'secondary' : 'primary'" :disabled="loading.lock">
              {{ loading.lock ? '...' : (user.is_locked ? 'Unlock Account' : 'Lock Account') }}
            </AppButton>
            <AppButton @click="handleDeleteUser" class="w-full bg-red-600 hover:bg-red-700" :disabled="loading.delete">
              {{ loading.delete ? 'Deleting...' : 'Delete User' }}
            </AppButton>
          </div>
        </div>
      </div>

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
import { ref, onMounted } from 'vue';
import { useApi } from '~/composables/useApi';
import { useRoute, useRouter } from 'vue-router';

definePageMeta({
  middleware: ['auth', 'admin'],
  layout: 'default',
});

const route = useRoute();
const router = useRouter();
const userId = route.params.id;

const userData = ref({});
const loading = ref({ update: false, lock: false, delete: false });
const successMessage = ref('');
const errorMessage = ref('');

const { data: user, pending, error, refresh } = await useApi(`/auth/users/${userId}`, {
  lazy: true,
  onResponse({ response }) {
    userData.value = {
      name: response._data.name,
      email: response._data.email,
      username: response._data.username,
    };
  },
});

const handleUpdateUser = async (formData) => {
  loading.value.update = true;
  successMessage.value = '';
  errorMessage.value = '';
  try {
    await useApi(`/auth/users/${userId}`, { method: 'PUT', body: formData });
    successMessage.value = 'User updated successfully!';
    refresh(); // Refresh user data
  } catch (err) {
    errorMessage.value = err.data?.message || 'Failed to update user.';
  } finally {
    loading.value.update = false;
  }
};

const handleToggleLock = async () => {
  loading.value.lock = true;
  successMessage.value = '';
  errorMessage.value = '';
  try {
    await useApi(`/auth/users/${userId}/toggle-lock`, { method: 'POST' });
    successMessage.value = `User account ${user.value.is_locked ? 'unlocked' : 'locked'} successfully!`;
    refresh(); // Refresh user data
  } catch (err) {
    errorMessage.value = err.data?.message || 'Failed to toggle lock status.';
  } finally {
    loading.value.lock = false;
  }
};

const handleDeleteUser = async () => {
  if (!confirm('Are you sure you want to permanently delete this user? This action cannot be undone.')) {
    return;
  }
  loading.value.delete = true;
  errorMessage.value = '';
  try {
    await useApi(`/auth/users/${userId}`, { method: 'DELETE' });
    alert('User deleted successfully.');
    router.push('/admin/users');
  } catch (err) {
    errorMessage.value = err.data?.message || 'Failed to delete user.';
    loading.value.delete = false;
  }
};
</script>