<template>
  <UDashboardSlideover v-model="open" title="Notifications" />
    <nav class="navigation">
      <div class="logo">
        <img src="@/assets/images/logo-white.svg" alt="Logo">
      </div>
      
      <ul>
        <li>
          <NuxtLink to="/">Summary</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/add-task">Add Task</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/board">Board</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/contacts">Contacts</NuxtLink>
        </li>
      </ul>
    </nav>
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
  border: 2px solid green; /* Grüner Rand hinzugefügt */
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

a {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
}

a:hover {
  text-decoration: underline;
}

  </style>
  