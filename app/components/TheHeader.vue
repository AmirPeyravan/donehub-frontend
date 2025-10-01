<template>
  <header>
    <nav>
      <ul>
        <li><NuxtLink to="/">خانه</NuxtLink></li>
        <li><NuxtLink to="/products">محصولات</NuxtLink></li>
        <li><NuxtLink to="/contact">ارتباط با ما</NuxtLink></li>
        <li><NuxtLink to="/description">توضیحات</NuxtLink></li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
</script>

<style scoped>
header {
  background-color: #4a148c;
  padding: 1rem;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

nav ul {
  list-style-type: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
}

nav ul li a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #7b1fa2;
  transition: background-color 0.3s ease;
}

nav ul li a:hover,
nav ul li a.router-link-exact-active {
  background-color: #9c27b0;
}
</style>