<template>
  <div>
    <h1>صفحه اصلی</h1>
    <nav>
      <NuxtLink to="/dashboard">
        <button>رفتن به داشبورد</button>
      </NuxtLink>
      <NuxtLink to="/auth">
        <button>رفتن به صفحه احراز هویت</button>
      </NuxtLink>
    </nav>
  </div>
</template>

<style>
nav {
  margin-top: 20px;
}
button {
  margin-right: 10px;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
}
</style>