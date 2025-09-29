<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">{{ $t('edit_permission') }}</h1>

    <div v-if="pending" class="text-center">{{ $t('loading') }}</div>
    <div v-else-if="error" class="text-red-500">{{ $t('permissions_fetch_error') }}</div>
    <FormKit
      v-else
      type="form"
      v-model="formData"
      @submit="handleUpdatePermission"
      :actions="false"
    >
      <FormKit
        type="text"
        name="display_name"
        :label="$t('permission_display_name')"
        validation="required"
      />
      <FormKit
        type="text"
        name="name"
        :label="$t('permission_name')"
        disabled
      />
      <FormKit
        type="text"
        name="group"
        :label="$t('permission_group')"
        validation="required"
        help="برای دسته‌بندی دسترسی‌ها (مثال: Posts, Users)"
      />
      <FormKit
        type="textarea"
        name="description"
        :label="$t('permission_description')"
      />

      <AppButton type="submit" class="mt-6" :disabled="loading">
        {{ loading ? $t('loading') : $t('save_changes') }}
      </AppButton>
      <div v-if="updateError" class="mt-4 text-red-500">{{ updateError }}</div>
      <div v-if="success" class="mt-4 text-green-500">{{ success }}</div>
    </FormKit>
  </div>
</template>

<script setup>
import { ref } from 'vue';

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
});

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const permissionId = route.params.id;

const formData = ref({});
const loading = ref(false);
const updateError = ref(null);
const success = ref(null);

// Fetch permission data
const { data, pending, error } = await useApi(`/auth/permissions/${permissionId}`);

if (data.value) {
  formData.value = {
    name: data.value.name,
    display_name: data.value.display_name,
    group: data.value.group,
    description: data.value.description,
  };
}

const handleUpdatePermission = async (data) => {
  loading.value = true;
  updateError.value = null;
  success.value = null;
  try {
    await useApi(`/auth/permissions/${permissionId}`, {
      method: 'PUT',
      body: {
        display_name: data.display_name,
        group: data.group,
        description: data.description,
      }
    });
    success.value = t('permission_update_success');
    setTimeout(() => router.push('/admin/permissions'), 2000);
  } catch (err) {
    updateError.value = err.data?.message || t('permission_update_failed');
  } finally {
    loading.value = false;
  }
};
</script>