export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (!authStore.isLoggedIn) {
    // If the user is not logged in, redirect to the login page.
    // Include the original destination in the query `redirect` to send them back after login.
    return navigateTo({
      path: '/auth/login',
      query: {
        redirect: to.fullPath,
      },
    });
  }
});