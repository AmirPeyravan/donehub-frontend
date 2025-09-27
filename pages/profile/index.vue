<template>
  <div class="p-8 rounded-lg bg-dark-bg/50 border border-gray-800">
    <h1 class="text-3xl font-bold text-primary mb-6">User Profile</h1>
    <div v-if="loading" class="text-center">
      <p>Loading profile...</p>
    </div>
    <div v-else-if="user" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="text-dark-gray text-sm">Name</label>
          <p class="text-lg text-light-gray">{{ user.name }}</p>
        </div>
        <div>
          <label class="text-dark-gray text-sm">Email</label>
          <p class="text-lg text-light-gray">{{ user.email || 'Not provided' }}</p>
        </div>
        <div>
          <label class="text-dark-gray text-sm">Username</label>
          <p class="text-lg text-light-gray">{{ user.username || 'Not set' }}</p>
        </div>
        <div>
          <label class="text-dark-gray text-sm">Phone</label>
          <p class="text-lg text-light-gray">{{ user.phone || 'Not provided' }}</p>
        </div>
      </div>
      
      <div v-if="user.roles && user.roles.length > 0">
        <label class="text-dark-gray text-sm">Roles</label>
        <div class="flex gap-2 mt-2">
          <span v-for="role in user.roles" :key="role.id" class="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
            {{ role.display_name }}
          </span>
        </div>
      </div>

      <div class="flex gap-4 mt-6">
        <NuxtLink to="/profile/settings">
          <AppButton>Edit Profile</AppButton>
        </NuxtLink>
        <AppButton @click="handleLogout" variant="secondary">
          Logout
        </AppButton>
      </div>
    </div>
    <div v-else class="text-center text-red-500">
      <p>Could not load user profile.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

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
  try {
    const userData = await useApi('/auth/user');
    if (userData) {
      authStore.setUser(userData);
      user.value = userData;
    }
  } catch (error) {
    console.error('Failed to fetch user:', error);
  } finally {
    loading.value = false;
  }
};

const handleLogout = async () => {
  try {
    // Call the logout endpoint
    await useApi('/auth/logout', { method: 'POST' });
  } catch (error) {
    console.error('Logout API call failed:', error);
  } finally {
    // Always logout locally
    authStore.logout();
    await router.push('/auth/login');
  }
};

onMounted(fetchUser);
</script>