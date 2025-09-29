<template>
  <div class="page-container">
    <div class="container">
      <h1 class="title">داشبورد</h1>
      <p class="subtitle">اینجا داشبورد شماست.</p>
      <nav class="navigation">
        <NuxtLink to="/">
          <button class="btn btn-primary">خانه</button>
        </NuxtLink>
        <button class="btn btn-secondary" @click="showPhoneNumber">شماره تماس</button>
      </nav>
    </div>
  </div>
</template>

<script setup>
function showPhoneNumber() {
  alert("شماره تماس: 123-456-7890");
}
</script>

<style scoped>
/* Scoped styles for the dashboard page */
.page-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: #f0f2f5;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
}

.container {
  text-align: center;
  background-color: white;
  padding: 50px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 2.5rem;
  color: #5a4bcf; /* A nice shade of purple */
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 30px;
}

.navigation {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.btn {
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  color: white;
}

.btn-primary {
  background-color: #7c3aed; /* Vibrant purple */
  box-shadow: 0 4px 14px rgba(124, 58, 237, 0.3);
}

.btn-primary:hover {
  background-color: #6d28d9;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(124, 58, 237, 0.4);
}

.btn-secondary {
  background-color: #a78bfa; /* Lighter purple */
  box-shadow: 0 4px 14px rgba(167, 139, 250, 0.3);
}

.btn-secondary:hover {
  background-color: #8b5cf6;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(167, 139, 250, 0.4);
}
</style>