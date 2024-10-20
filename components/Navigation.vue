<template>
  <!-- Öffnender Tag für UPageCard -->
  <UPageCard class="flex flex-row text-4xl w-full md:justify-center"
            :ui="{ body: { base: 'flex flex-row' } }">
    <nav class="navigation">
      <div class="logo">
        <img src="@/assets/images/logo-white.svg" alt="Logo">
      </div>
      
      <ul>
        <li>
          <NuxtLink to="/summary" class="text-lg hover:text-primary">Summary</NuxtLink> <!-- Verkleinere die Schrift mit 'text-sm' -->
        </li>
        <li>
          <NuxtLink to="/add-task" class="text-lg hover:text-primary">Add Task</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/board" class="text-lg hover:text-primary">Board</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/contacts" class="text-lg hover:text-primary">Contacts</NuxtLink>
        </li>
      </ul>
    </nav>
  </UPageCard>
</template>

<script>
export default {
  name: 'Navigation',
};
</script>

<style scoped>
.navigation {
  padding: 1rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 232px;
}

.logo {
  margin-top: 50px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
  flex-grow: 1;
}

li {
  margin-bottom: 1rem;
}

</style>
