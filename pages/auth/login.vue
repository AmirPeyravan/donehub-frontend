<template>
  <div>
    <FormKit
      type="form"
      @submit="handleLogin"
      :actions="false"
    >
      <FormKit
        type="text"
        name="identifier"
        label="Email or Mobile"
        placeholder="Enter your email or mobile"
        validation="required"
      />
      <FormKit
        type="password"
        name="password"
        label="Password"
        placeholder="Enter your password"
        validation="required"
      />
      <AppButton type="submit" class="w-full mt-4" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Login' }}
      </AppButton>

      <div v-if="error" class="mt-4 text-red-500 text-center">
        {{ error }}
      </div>
    </FormKit>
  </div>
</template>

<script setup>
import { ref } from 'vue';

definePageMeta({
  layout: 'auth',
});

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const loading = ref(false);
const error = ref(null);

const handleLogin = async (formData) => {
  loading.value = true;
  error.value = null;

  try {
    const data = await $fetch('/api/v1/auth/login-password', {
      method: 'POST',
      body: {
        identifier: formData.identifier,
        password: formData.password,
      },
    });

    authStore.setTokens(data.access_token, data.refresh_token);
    
    const redirect = String(route.query.redirect || '/profile');
    await router.push(redirect);
  } catch (err) {
    error.value = err.data?.message || 'Invalid credentials.';
  } finally {
    loading.value = false;
  }
};
</script>