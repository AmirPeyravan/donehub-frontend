export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  // First, check if the user is logged in. The 'auth' middleware should have already run,
  // but this is a safeguard.
  if (!authStore.isLoggedIn) {
    return navigateTo({
      path: '/auth/login',
      query: {
        redirect: to.fullPath,
      },
    });
  }

  // Next, check if the logged-in user is an admin.
  if (!authStore.isAdmin) {
    // If not an admin, redirect them away. The profile page is a safe destination.
    // You could also redirect to a dedicated "403 Forbidden" page.
    return navigateTo('/profile');
  }

  // If the user is logged in and is an admin, allow access.
});