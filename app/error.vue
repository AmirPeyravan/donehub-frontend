<script setup>
import { useHead } from "#imports";

const props = defineProps({
  error: Object
})

const statusCode = Number(props.error.statusCode || 500)
const statusMessage = props.error.statusMessage || 'Server Error'
const description = props.error.message || props.error.description || 'An error occurred in the application and the page could not be served.'
const stack = props.error.stack || ''

useHead({
  title: `${statusCode} - ${statusMessage}`
})
</script>

<template>
  <div class="antialiased bg-white dark:bg-[#020420] dark:text-white flex flex-col font-sans min-h-screen pt-12 px-10 text-black">
    <h1 class="font-medium mb-4 sm:text-8xl text-6xl">{{ statusCode }}</h1>
    <p class="font-light leading-tight mb-8 sm:text-2xl text-xl">{{ description }}</p>
    <a href="https://nuxt.com/docs/getting-started/error-handling?utm_source=nuxt-error-dev-page" target="_blank" class="absolute font-medium hover:text-[#00DC82] hover:underline inline-block mx-auto sm:right-6 text-sm top-6 underline-offset-3">Customize this page</a>
    <div class="bg-gray-50/50 border border-b-0 border-black/5 dark:bg-white/5 dark:border-white/10 flex-1 h-auto overflow-y-auto rounded-t-md">
      <div class="font-light leading-tight p-8 text-xl z-10" v-html="stack"></div>
    </div>
  </div>
</template>

<style scoped>
.absolute{position:absolute}.top-6{top:1.5rem}.z-10{z-index:10}.mx-auto{margin-left:auto;margin-right:auto}.mb-4{margin-bottom:1rem}.mb-8{margin-bottom:2rem}.inline-block{display:inline-block}.h-auto{height:auto}.min-h-screen{min-height:100vh}.flex{display:flex}.flex-1{flex:1 1 0%}.flex-col{flex-direction:column}.overflow-y-auto{overflow-y:auto}.border{border-width:1px}.border-b-0{border-bottom-width:0}.border-black\/5{border-color:#0000000d}.rounded-t-md{border-top-left-radius:.375rem;border-top-right-radius:.375rem}.bg-gray-50\/50{background-color:#f5f5f580}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.p-8{padding:2rem}.px-10{padding-left:2.5rem;padding-right:2.5rem}.pt-12{padding-top:3rem}.text-6xl{font-size:3.75rem;line-height:1}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-black{--un-text-opacity:1;color:rgb(0 0 0/var(--un-text-opacity))}.hover\:text-\[\#00DC82\]:hover{--un-text-opacity:1;color:rgb(0 220 130/var(--un-text-opacity))}.font-light{font-weight:300}.font-medium{font-weight:500}.leading-tight{line-height:1.25}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.hover\:underline:hover{text-decoration-line:underline}.underline-offset-3{text-underline-offset:3px}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media (prefers-color-scheme:dark){.dark\:border-white\/10{border-color:#ffffff1a}.dark\:bg-\[\#020420\]{--un-bg-opacity:1;background-color:rgb(2 4 32/var(--un-bg-opacity))}.dark\:bg-white\/5{background-color:#ffffff0d}.dark\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media (min-width:640px){.sm\:right-6{right:1.5rem}.sm\:text-2xl{font-size:1.5rem;line-height:2rem}.sm\:text-8xl{font-size:6rem;line-height:1}}
</style>