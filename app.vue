<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  document.documentElement.classList.add('dark');  // Füge die 'dark'-Klasse hinzu, um Dark Mode als Standard zu aktivieren
});
</script>