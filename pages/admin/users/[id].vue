<template>
  <div>
    <div v-if="pending" class="text-center">{{ $t('loading') }}</div>
    <div v-else-if="error" class="text-center text-red-500">{{ $t('user_fetch_error') }}</div>
    <div v-else-if="user">
      <h1 class="text-2xl font-bold mb-6">{{ $t('edit_user_title', { name: user.name }) }}</h1>

      <!-- Edit User Form -->
      <FormKit
        type="form"
        v-model="formData"
        @submit="handleUpdateUser"
        :actions="false"
        #default="{ value }"
      >
        <h2 class="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">{{ $t('user_details') }}</h2>
        <FormKit
          type="text"
          name="name"
          :label="$t('user_name')"
          validation="required"
        />
        <FormKit
          type="email"
          name="email"
          :label="$t('user_email')"
          validation="required|email"
        />
        <FormKit
          type="text"
          name="username"
          :label="$t('user_username')"
        />

        <AppButton type="submit" class="mt-4" :disabled="loading">
          {{ loading ? $t('loading') : $t('save_changes') }}
        </AppButton>
        <div v-if="updateError" class="mt-4 text-red-500">{{ updateError }}</div>
        <div v-if="updateSuccess" class="mt-4 text-green-500">{{ updateSuccess }}</div>
      </FormKit>

      <!-- Role Management Form -->
      <div class="mt-8">
        <h2 class="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">{{ $t('manage_user_roles') }}</h2>
        <FormKit
          type="form"
          v-model="rolesFormData"
          @submit="handleUpdateRoles"
          :actions="false"
          v-if="allRoles.length > 0"
        >
          <FormKit
            type="checkbox"
            name="role_ids"
            :options="allRoles"
          />
          <AppButton type="submit" class="mt-4" :disabled="rolesLoading">
            {{ rolesLoading ? $t('loading') : $t('save_changes') }}
          </AppButton>
          <div v-if="rolesError" class="mt-4 text-red-500">{{ rolesError }}</div>
          <div v-if="rolesSuccess" class="mt-4 text-green-500">{{ rolesSuccess }}</div>
        </FormKit>
        <p v-else class="text-gray-400">{{ $t('no_roles_available') }}</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
});

const route = useRoute();
const { t } = useI18n();
const userId = route.params.id;

const user = ref(null);
const formData = ref({});
const loading = ref(false);
const updateError = ref(null);
const updateSuccess = ref(null);

// Fetch user data
const { data, pending, error } = await useApi(`/auth/users/${userId}`);

if (data.value) {
  user.value = data.value;
  formData.value = {
    name: user.value.name,
    email: user.value.email,
    username: user.value.username,
  };
}

const handleUpdateUser = async (updatedData) => {
  loading.value = true;
  updateError.value = null;
  updateSuccess.value = null;
  try {
    const updatedUser = await useApi(`/auth/users/${userId}`, {
      method: 'PUT',
      body: updatedData,
    });
    user.value = updatedUser; // Update local user data
    updateSuccess.value = t('user_update_success');
  } catch (err) {
    updateError.value = err.data?.message || t('user_update_failed');
  } finally {
    loading.value = false;
  }
};

// --- Role Management ---
const allRoles = ref([]);
const rolesLoading = ref(false);
const rolesError = ref(null);
const rolesSuccess = ref(null);

// Fetch all available roles
const { data: rolesData } = await useApi('/auth/roles');
if (rolesData.value) {
  allRoles.value = rolesData.value.map(role => ({
    label: role.display_name,
    value: role.id
  }));
}

// Separate form model for roles
const rolesFormData = ref({
  role_ids: user.value?.roles.map(r => r.id) || []
});

const handleUpdateRoles = async () => {
  rolesLoading.value = true;
  rolesError.value = null;
  rolesSuccess.value = null;

  const initialRoleIds = new Set(user.value?.roles.map(r => r.id) || []);
  const newRoleIds = new Set(rolesFormData.value.role_ids);

  const rolesToAssign = [...newRoleIds].filter(id => !initialRoleIds.has(id));
  const rolesToRemove = [...initialRoleIds].filter(id => !newRoleIds.has(id));

  try {
    // Perform all API calls concurrently
    await Promise.all([
      ...rolesToAssign.map(roleId => useApi(`/auth/roles/user/${userId}/assign`, { method: 'POST', body: { role_id: roleId } })),
      ...rolesToRemove.map(roleId => useApi(`/auth/roles/user/${userId}/remove`, { method: 'POST', body: { role_id: roleId } }))
    ]);

    // Refresh user data to get the latest roles
    const updatedUser = await useApi(`/auth/users/${userId}`);
    user.value = updatedUser;
    rolesFormData.value.role_ids = user.value?.roles.map(r => r.id) || [];

    rolesSuccess.value = t('roles_update_success');
  } catch (err) {
    rolesError.value = err.data?.message || t('roles_update_failed');
  } finally {
    rolesLoading.value = false;
  }
};
</script>