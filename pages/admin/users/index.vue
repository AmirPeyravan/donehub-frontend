<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">{{ $t('user_management') }}</h1>

    <!-- Search and Filters -->
    <div class="mb-4">
      <input
        type="text"
        v-model="searchQuery"
        :placeholder="$t('search_users_placeholder')"
        class="bg-gray-700 p-2 rounded w-full md:w-1/3"
      />
    </div>

    <!-- Users Table -->
    <div class="bg-gray-800 rounded-lg overflow-hidden">
      <table class="w-full text-right">
        <thead class="bg-gray-700">
          <tr>
            <th class="p-4 cursor-pointer" @click="sortBy('name')">{{ $t('user_name') }}</th>
            <th class="p-4 cursor-pointer" @click="sortBy('email')">{{ $t('user_email') }}</th>
            <th class="p-4">{{ $t('roles') }}</th>
            <th class="p-4">{{ $t('status') }}</th>
            <th class="p-4">{{ $t('actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="pending" class="text-center">
            <td colspan="5" class="p-4">{{ $t('loading') }}</td>
          </tr>
          <tr v-else-if="error" class="text-center">
            <td colspan="5" class="p-4 text-red-500">{{ $t('users_fetch_error') }}</td>
          </tr>
          <tr v-else v-for="user in users" :key="user.id" class="border-t border-gray-700 hover:bg-gray-700/50">
            <td class="p-4">{{ user.name }}</td>
            <td class="p-4">{{ user.email }}</td>
            <td class="p-4">
              <span v-for="role in user.roles" :key="role.id" class="bg-blue-500 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                {{ role.display_name }}
              </span>
            </td>
            <td class="p-4">
              <span :class="user.is_locked ? 'text-red-400' : 'text-green-400'">
                {{ user.is_locked ? $t('locked') : $t('active') }}
              </span>
            </td>
            <td class="p-4 flex flex-wrap gap-2">
              <NuxtLink :to="`/admin/users/${user.id}`">
                <AppButton size="sm" variant="outline">
                  {{ $t('view_edit') }}
                </AppButton>
              </NuxtLink>
              <AppButton size="sm" @click="handleToggleLock(user.id)">
                {{ $t('toggle_lock') }}
              </AppButton>
              <AppButton size="sm" variant="danger" @click="handleDeleteUser(user.id)">
                {{ $t('delete_user') }}
              </AppButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="mt-6 flex justify-between items-center" v-if="!pending && meta">
      <div>
        <p>{{ $t('pagination_showing', { from: meta.from, to: meta.to, total: meta.total }) }}</p>
      </div>
      <div class="flex gap-2">
        <button @click="page--" :disabled="page === 1" class="px-4 py-2 bg-gray-700 rounded disabled:opacity-50">
          {{ $t('previous') }}
        </button>
        <button @click="page++" :disabled="page === meta.last_page" class="px-4 py-2 bg-gray-700 rounded disabled:opacity-50">
          {{ $t('next') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useDebounceFn } from '@vueuse/core';

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
});

const { t } = useI18n();

const users = ref([]);
const meta = ref(null);
const page = ref(1);
const searchQuery = ref('');
const sortOptions = ref({ by: 'created_at', order: 'desc' });

const { data, pending, error, refresh } = await useApi('/auth/users', {
  query: {
    page: page,
    search: searchQuery,
    sort_by: () => sortOptions.value.by,
    sort_order: () => sortOptions.value.order,
  },
  watch: [page, sortOptions],
});

watch(data, (newData) => {
  if (newData) {
    users.value = newData.data;
    meta.value = newData.meta;
  }
});

// Debounced search
watch(searchQuery, useDebounceFn(() => {
  page.value = 1; // Reset to first page on new search
  refresh();
}, 500));

const sortBy = (column) => {
  if (sortOptions.value.by === column) {
    sortOptions.value.order = sortOptions.value.order === 'asc' ? 'desc' : 'asc';
  } else {
    sortOptions.value.by = column;
    sortOptions.value.order = 'asc';
  }
};

const handleToggleLock = async (userId) => {
  if (confirm(t('confirm_lock_user'))) {
    try {
      await useApi(`/auth/users/${userId}/toggle-lock`, { method: 'POST' });
      alert(t('user_lock_success'));
      refresh();
    } catch (err) {
      alert(err.data?.message || t('user_lock_failed'));
    }
  }
};

const handleDeleteUser = async (userId) => {
  if (confirm(t('confirm_delete_user'))) {
    try {
      await useApi(`/auth/users/${userId}`, { method: 'DELETE' });
      alert(t('user_delete_success'));
      refresh();
    } catch (err) {
      alert(err.data?.message || t('user_delete_failed'));
    }
  }
};
</script>