<template>
  <div class="p-4 md:p-8">
    <h1 class="text-2xl font-bold mb-6">{{ $t('password_management_title') }}</h1>

    <!-- Form to CHANGE current password -->
    <div v-if="authStore.user?.has_password">
      <h2 class="text-xl font-semibold mb-4">{{ $t('change_password_title') }}</h2>
      <FormKit
        type="form"
        @submit="handleChangePassword"
        :actions="false"
      >
        <FormKit
          type="password"
          name="current_password"
          :label="$t('current_password')"
          validation="required"
        />
        <FormKit
          type="password"
          name="password"
          :label="$t('new_password')"
          validation="required|length:8"
        />
        <FormKit
          type="password"
          name="password_confirmation"
          :label="$t('confirm_new_password')"
          validation="required|confirm"
        />
        <AppButton type="submit" class="mt-4" :disabled="loadingChange">
          {{ loadingChange ? $t('loading') : $t('change_password_action') }}
        </AppButton>
        <div v-if="errorChange" class="mt-4 text-red-500">{{ errorChange }}</div>
        <div v-if="successChange" class="mt-4 text-green-500">{{ successChange }}</div>
      </FormKit>
    </div>

    <!-- Form to SET a new password -->
    <div v-else>
      <h2 class="text-xl font-semibold mb-4">{{ $t('set_password_title') }}</h2>
      <FormKit
        type="form"
        @submit="handleSetPassword"
        :actions="false"
      >
        <FormKit
          type="password"
          name="password"
          :label="$t('password')"
          validation="required|length:8"
        />
        <FormKit
          type="password"
          name="password_confirmation"
          :label="$t('confirm_password')"
          validation="required|confirm"
        />
        <AppButton type="submit" class="mt-4" :disabled="loadingSet">
          {{ loadingSet ? $t('loading') : $t('set_password_action') }}
        </AppButton>
        <div v-if="errorSet" class="mt-4 text-red-500">{{ errorSet }}</div>
        <div v-if="successSet" class="mt-4 text-green-500">{{ successSet }}</div>
      </FormKit>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';

definePageMeta({
  middleware: 'auth'
});

const authStore = useAuthStore();
const { t } = useI18n();

// State for setting password
const loadingSet = ref(false);
const errorSet = ref(null);
const successSet = ref(null);

// State for changing password
const loadingChange = ref(false);
const errorChange = ref(null);
const successChange = ref(null);

const handleSetPassword = async (data) => {
  loadingSet.value = true;
  errorSet.value = null;
  successSet.value = null;
  try {
    await useApi('/auth/password/set', {
      method: 'POST',
      body: data
    });
    successSet.value = t('password_set_success');
    // Refresh user state to update the `has_password` flag
    const user = await useApi('/auth/user');
    authStore.setUser(user);
  } catch (err) {
    errorSet.value = err.data?.message || t('password_set_failed');
  } finally {
    loadingSet.value = false;
  }
};

const handleChangePassword = async (data) => {
  loadingChange.value = true;
  errorChange.value = null;
  successChange.value = null;
  try {
    await useApi('/auth/password/update', {
      method: 'POST',
      body: data
    });
    successChange.value = t('password_change_success');
  } catch (err) {
    errorChange.value = err.data?.message || t('password_change_failed');
  } finally {
    loadingChange.value = false;
  }
};
</script>