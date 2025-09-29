<template>
  <div class="p-4 md:p-8">
    <h1 class="text-2xl font-bold mb-4">Profile</h1>
    <div v-if="user" class="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div class="mb-4">
        <label class="block text-gray-400 text-sm font-bold mb-2">Name:</label>
        <p class="text-white text-lg">{{ user.name }}</p>
      </div>
      <div class="mb-4">
        <label class="block text-gray-400 text-sm font-bold mb-2">Email:</label>
        <p class="text-white text-lg">{{ user.email || 'Not provided' }}</p>
      </div>
      <div class="mb-4">
        <label class="block text-gray-400 text-sm font-bold mb-2">Username:</label>
        <p class="text-white text-lg">{{ user.username || 'Not set' }}</p>
      </div>
      <div class="mt-6">
        <AppButton @click="handleLogout" :disabled="loading">
          {{ loading ? 'Logging out...' : 'Logout' }}
        </AppButton>
      </div>
    </div>
    <div v-else>
      <p>Loading profile...</p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

// Apply the auth middleware to protect this page
definePageMeta({
  middleware: 'auth'
});

const authStore = useAuthStore();
const router = useRouter();

const user = computed(() => authStore.user);
const loading = ref(false);

const handleLogout = async () => {
  loading.value = true;
  try {
    // Optional: Call the logout endpoint on the API
    await useApi('/auth/logout', { method: 'POST' });
  } catch (error) {
    console.error('Logout API call failed, but logging out on client-side anyway.', error);
  } finally {
    authStore.logout();
    await router.push('/auth/login');
    loading.value = false;
  }
};
</script>