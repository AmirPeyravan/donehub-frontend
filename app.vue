<script setup lang="ts">
const { locale, dir } = useI18n()

// Set HTML attributes for language and direction
useHead({
  htmlAttrs: {
    lang: locale,
    dir: dir
  }
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>