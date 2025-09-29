<template>
  <div class="p-4 md:p-8">
    <h1 class="text-2xl font-bold mb-4">{{ $t('profile_page_title') }}</h1>
    <div v-if="user" class="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div class="mb-4">
        <label class="block text-gray-400 text-sm font-bold mb-2">{{ $t('user_name') }}:</label>
        <p class="text-white text-lg">{{ user.name }}</p>
      </div>
      <div class="mb-4">
        <label class="block text-gray-400 text-sm font-bold mb-2">{{ $t('user_email') }}:</label>
        <p class="text-white text-lg">{{ user.email || $t('not_provided') }}</p>
      </div>
      <div class="mb-4">
        <label class="block text-gray-400 text-sm font-bold mb-2">{{ $t('user_username') }}:</label>
        <p class="text-white text-lg">{{ user.username || $t('not_provided') }}</p>
      </div>
      <div class="mt-6 border-t border-gray-700 pt-6 flex flex-wrap gap-4">
        <NuxtLink to="/profile/edit">
          <AppButton variant="outline">
            {{ $t('edit_profile') }}
          </AppButton>
        </NuxtLink>
        <NuxtLink to="/profile/password">
          <AppButton variant="outline">
            {{ $t('manage_password') }}
          </AppButton>
        </NuxtLink>
        <AppButton @click="handleLogout" :disabled="loading" variant="danger" class="mr-auto">
          {{ loading ? $t('logging_out') : $t('logout') }}
        </AppButton>
        <AppButton @click="handleRefresh" :disabled="refreshing" variant="secondary">
          {{ refreshing ? $t('loading') : $t('refresh_data') }}
        </AppButton>
      </div>
    </div>
    <div v-else>
      <p>{{ $t('loading') }}</p>
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
const refreshing = ref(false);

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

const handleRefresh = async () => {
  refreshing.value = true;
  try {
    const freshUser = await useApi('/auth/user');
    authStore.setUser(freshUser);
  } catch (error) {
    console.error('Failed to refresh user data:', error);
    // Optionally, show a notification to the user
  } finally {
    refreshing.value = false;
  }
};
</script>