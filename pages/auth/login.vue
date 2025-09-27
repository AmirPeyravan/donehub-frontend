<template>
  <div>
    <!-- Step 1: Check User Identifier -->
    <FormKit
      v-if="step === 'check-user'"
      type="form"
      @submit="handleCheckUser"
      :actions="false"
    >
      <FormKit
        type="text"
        name="identifier"
        label="Email or Mobile"
        placeholder="Enter your email or mobile"
        validation="required"
      />
      <AppButton type="submit" class="w-full mt-4" :disabled="loading">
        {{ loading ? 'Checking...' : 'Continue' }}
      </AppButton>
    </FormKit>

    <!-- Step 2: Login with Password -->
    <FormKit
      v-if="step === 'login-password'"
      type="form"
      @submit="handleLoginPassword"
      :actions="false"
    >
      <p class="text-center mb-4 text-dark-gray">Welcome back, {{ identifier }}.</p>
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
    </FormKit>

    <!-- Step 3: Register with OTP -->
    <FormKit
      v-if="step === 'register-otp'"
      type="form"
      @submit="handleRegister"
      :actions="false"
    >
      <p class="text-center mb-4 text-dark-gray">An OTP has been sent to {{ identifier }}.</p>
      <FormKit
        type="text"
        name="name"
        label="Your Name"
        placeholder="Enter your full name"
        validation="required"
      />
      <FormKit
        type="text"
        name="otp"
        label="OTP Code"
        placeholder="Enter the 6-digit code"
        validation="required|length:6,6"
      />
      <AppButton type="submit" class="w-full mt-4" :disabled="loading">
        {{ loading ? 'Creating account...' : 'Create Account' }}
      </AppButton>
    </FormKit>

    <div v-if="error" class="mt-4 text-red-500 text-center">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useApi } from '~/composables/useApi';
import { useAuthStore } from '~/store/auth';

definePageMeta({
  layout: 'auth',
});

const authStore = useAuthStore();
const router = useRouter();

const step = ref('check-user');
const identifier = ref('');
const loading = ref(false);
const error = ref(null);

const handleCheckUser = async (formData) => {
  loading.value = true;
  error.value = null;
  identifier.value = formData.identifier;

  const { data, error: apiError } = await useApi('/auth/check-user', {
    method: 'POST',
    body: { identifier: formData.identifier },
  });

  if (apiError.value) {
    error.value = apiError.value.data?.message || 'An error occurred.';
    loading.value = false;
    return;
  }

  if (data.value?.exists) {
    step.value = 'login-password';
  } else {
    await sendOtp();
    step.value = 'register-otp';
  }
  loading.value = false;
};

const sendOtp = async () => {
  await useApi('/auth/send-otp', {
    method: 'POST',
    body: { identifier: identifier.value },
  });
};

const handleLoginPassword = async (formData) => {
  loading.value = true;
  error.value = null;

  const { data, error: apiError } = await useApi('/auth/login-password', {
    method: 'POST',
    body: {
      identifier: identifier.value,
      password: formData.password,
    },
  });

  if (apiError.value) {
    error.value = apiError.value.data?.message || 'Invalid credentials.';
    loading.value = false;
    return;
  }

  authStore.setTokens(data.value.access_token, data.value.refresh_token);
  // We'll fetch the user in the middleware or on the profile page
  await router.push('/profile');
};

const handleRegister = async (formData) => {
  loading.value = true;
  error.value = null;

  const { data, error: apiError } = await useApi('/auth/verify-otp', {
    method: 'POST',
    body: {
      identifier: identifier.value,
      name: formData.name,
      otp: formData.otp,
    },
  });

  if (apiError.value) {
    error.value = apiError.value.data?.message || 'Invalid OTP or data.';
    loading.value = false;
    return;
  }

  authStore.setTokens(data.value.access_token, data.value.refresh_token);
  await router.push('/profile');
};
</script>