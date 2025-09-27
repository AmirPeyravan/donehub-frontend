<template>
  <div class="p-8 rounded-lg bg-dark-bg/50 border border-gray-800">
    <h1 class="text-3xl font-bold text-primary mb-6">User Profile</h1>
    <div v-if="loading" class="text-center">
      <p>Loading profile...</p>
    </div>
    <div v-else-if="user" class="space-y-4">
      <div>
        <label class="text-dark-gray">Name</label>
        <p class="text-lg">{{ user.name }}</p>
      </div>
      <div>
        <label class="text-dark-gray">Email</label>
        <p class="text-lg">{{ user.email || 'Not provided' }}</p>
      </div>
      <div>
        <label class="text-dark-gray">Username</label>
        <p class="text-lg">{{ user.username || 'Not set' }}</p>
      </div>
      <AppButton @click="handleLogout" variant="secondary" class="mt-6">
        Logout
      </AppButton>
    </div>
    <div v-else class="text-center text-red-500">
      <p>Could not load user profile.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from '~/store/auth';
import { useApi } from '~/composables/useApi';

definePageMeta({
  middleware: 'auth',
  layout: 'default',
});

const authStore = useAuthStore();
const router = useRouter();
const user = ref(authStore.user);
const loading = ref(false);

const fetchUser = async () => {
  if (authStore.user) {
    user.value = authStore.user;
    return;
  }

  loading.value = true;
  const { data, error } = await useApi('/auth/user');
  if (data.value) {
    authStore.setUser(data.value);
    user.value = data.value;
  }
  loading.value = false;
};

const handleLogout = async () => {
  // We should also call the /api/auth/logout endpoint
  await useApi('/auth/logout', { method: 'POST' });
  authStore.logout();
  router.push('/auth/login');
};

onMounted(fetchUser);
</script>