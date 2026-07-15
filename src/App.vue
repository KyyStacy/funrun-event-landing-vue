<script setup>
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="flex flex-col min-h-[100dvh]">
    <NavBar />
    <main class="flex-1">
      <router-view />
    </main>
  </div>
</template>
