<template>
  <div class="p-8 rounded-lg bg-dark-bg/50 border border-gray-800">
    <h1 class="text-3xl font-bold text-primary mb-8">Profile Settings</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Update Profile Section -->
      <div>
        <h2 class="text-xl font-semibold text-secondary mb-4">Update Profile</h2>
        <FormKit
          type="form"
          v-model="profileData"
          @submit="handleProfileUpdate"
          :actions="false"
          #default="{ state: { valid } }"
        >
          <FormKit
            type="text"
            name="name"
            label="Name"
            placeholder="Your full name"
            validation="required"
          />
          <FormKit
            type="text"
            name="username"
            label="Username"
            placeholder="Your unique username"
          />
          <AppButton type="submit" class="mt-4" :disabled="!valid || loading.profile">
            {{ loading.profile ? 'Saving...' : 'Save Changes' }}
          </AppButton>
        </FormKit>
      </div>

      <!-- Update Password Section -->
      <div>
        <h2 class="text-xl font-semibold text-secondary mb-4">Change Password</h2>
        <FormKit
          type="form"
          @submit="handlePasswordUpdate"
          :actions="false"
          #default="{ state: { valid } }"
        >
          <FormKit
            type="password"
            name="current_password"
            label="Current Password"
            placeholder="Your current password"
            validation="required"
          />
          <FormKit
            type="password"
            name="password"
            label="New Password"
            placeholder="Your new password"
            validation="required|length:8"
          />
          <FormKit
            type="password"
            name="password_confirmation"
            label="Confirm New Password"
            placeholder="Confirm your new password"
            validation="required|confirm"
          />
          <AppButton type="submit" class="mt-4" :disabled="!valid || loading.password">
            {{ loading.password ? 'Updating...' : 'Update Password' }}
          </AppButton>
        </FormKit>
      </div>
    </div>

    <div v-if="successMessage" class="mt-6 p-4 bg-secondary/20 text-secondary border border-secondary/30 rounded-md">
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="mt-6 p-4 bg-red-500/20 text-red-400 border border-red-500/30 rounded-md">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '~/store/auth';
import { useApi } from '~/composables/useApi';

definePageMeta({
  middleware: 'auth',
  layout: 'default',
});

const authStore = useAuthStore();
const user = authStore.user;

const profileData = ref({
  name: '',
  username: '',
});

const loading = ref({
  profile: false,
  password: false,
});
const successMessage = ref('');
const errorMessage = ref('');

onMounted(() => {
  if (user) {
    profileData.value.name = user.name;
    profileData.value.username = user.username || '';
  }
});

const handleProfileUpdate = async (formData) => {
  loading.value.profile = true;
  successMessage.value = '';
  errorMessage.value = '';

  try {
    const updatedUser = await useApi('/auth/profile/update', {
      method: 'POST',
      body: formData,
    });
    authStore.setUser(updatedUser);
    successMessage.value = 'Profile updated successfully!';
  } catch (err) {
    errorMessage.value = err.data?.message || 'Failed to update profile.';
  } finally {
    loading.value.profile = false;
  }
};

const handlePasswordUpdate = async (formData, node) => {
  loading.value.password = true;
  successMessage.value = '';
  errorMessage.value = '';

  try {
    await useApi('/auth/password/update', {
      method: 'POST',
      body: formData,
    });
    successMessage.value = 'Password updated successfully!';
    node.reset(); // Reset form on success
  } catch (err) {
    errorMessage.value = err.data?.message || 'Failed to update password. Check your current password.';
  } finally {
    loading.value.password = false;
  }
};
</script>