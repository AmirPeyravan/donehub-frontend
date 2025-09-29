<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">{{ $t('create_new_permission') }}</h1>

    <FormKit
      type="form"
      @submit="handleCreatePermission"
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
        validation="required"
        help="مثال: posts.create یا users.delete"
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
      <div v-if="error" class="mt-4 text-red-500">{{ error }}</div>

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
const router = useRouter();

const loading = ref(false);
const error = ref(null);

const handleCreatePermission = async (data) => {
  loading.value = true;
  error.value = null;
  try {
    await useApi('/auth/permissions', {
      method: 'POST',
      body: data
    });
    alert(t('permission_create_success'));
    router.push('/admin/permissions');
  } catch (err) {
    error.value = err.data?.message || t('permission_create_failed');
  } finally {
    loading.value = false;
  }
};
</script>