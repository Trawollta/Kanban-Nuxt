<template>
  <UPageCard class="flex flex-row text-4xl w-full md:justify-center" :ui="{ body: { base: 'flex flex-row' } }">
    <nav class="navigation">
      <div class="logo">
        <img src="@/assets/images/logo-white.svg" alt="Logo" />
      </div>

      <ul>
        <li>
          <NuxtLink to="/summary" class="text-primary">Summary</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/add-task" class="text-primary">Add Task</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/board" class="text-primary">Board</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/contacts" class="text-primary">Contacts</NuxtLink>
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
/* Basis-Styling für die Navigation */
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

/* Textfarbe für Light- und Dark-Mode */

html.light .nav-link {
  color: black;
}

html.dark .nav-link {
  color: white;
}
</style>
