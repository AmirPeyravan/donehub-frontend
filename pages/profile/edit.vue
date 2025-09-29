<template>
  <div class="p-4 md:p-8">
    <h1 class="text-2xl font-bold mb-4">{{ $t('profile_edit_page_title') }}</h1>
    <FormKit
      type="form"
      v-if="formData"
      v-model="formData"
      @submit="handleUpdateProfile"
      :actions="false"
    >
      <FormKit
        type="text"
        name="name"
        :label="$t('user_name')"
        validation="required"
      />
      <FormKit
        type="text"
        name="username"
        :label="$t('user_username')"
      />
      <AppButton type="submit" class="mt-4" :disabled="loading">
        {{ loading ? $t('loading') : $t('save_changes') }}
      </AppButton>
      <div v-if="error" class="mt-4 text-red-500">
        {{ error }}
      </div>
      <div v-if="success" class="mt-4 text-green-500">
        {{ success }}
      </div>
    </FormKit>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

definePageMeta({
  middleware: 'auth'
});

const authStore = useAuthStore();
const router = useRouter();
const { t } = useI18n();

const loading = ref(false);
const error = ref(null);
const success = ref(null);

// Initialize form data with user's current info
const formData = ref({
  name: authStore.user?.name || '',
  username: authStore.user?.username || ''
});

const handleUpdateProfile = async (data) => {
  loading.value = true;
  error.value = null;
  success.value = null;

  try {
    const updatedUser = await useApi('/auth/profile/update', {
      method: 'POST',
      body: data,
    });

    // Update user data in the store
    authStore.setUser(updatedUser);
    success.value = t('profile_update_success');

    // Redirect back to profile page after a short delay
    setTimeout(() => {
      router.push('/profile');
    }, 2000);

  } catch (err) {
    error.value = err.data?.message || t('profile_update_failed');
  } finally {
    loading.value = false;
  }
};
</script>