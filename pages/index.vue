<template>
  <!-- Du kannst eine Ladeanzeige anzeigen, während die Weiterleitung stattfindet -->
  <div>Weiterleitung zum Login...</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const router = useRouter();

onMounted(() => {
  // Weiterleitung zur Login-Seite
  router.push('/login');
});
</script>
