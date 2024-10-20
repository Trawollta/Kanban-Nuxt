<template>
  <div class="app-layout bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
    <!-- Prüfe, ob der Pfad '/login' ist -->
    <template v-if="$route.path !== '/login'">
      <Navigation class="sidebar" />  
    </template>

    <div class="main-content" :class="{ 'full-width': $route.path === '/login' }">
      <!-- Prüfe, ob der Pfad '/login' ist -->
      <template v-if="$route.path !== '/login'">
        <Header />
      </template>
      <!-- Hier wird die NuxtPage scrollbar -->
      <div class="page-content">
        <NuxtPage />
      </div>
    </div>

    <!-- Mobile Navigation für den unteren Bereich -->
    <template v-if="$route.path !== '/login'">
      <footer class="mobile-nav md:hidden">
        <ul class="flex justify-around">
          <li class="text-center">
            <NuxtLink to="/summary" class="nav-item">
              <i class="i-heroicons-home"></i>
              <span>Summary</span>
            </NuxtLink>
          </li>
          <li class="text-center">
            <NuxtLink to="/add-task" class="nav-item">
              <i class="i-heroicons-pencil"></i>
              <span>Add Task</span>
            </NuxtLink>
          </li>
          <li class="text-center">
            <NuxtLink to="/board" class="nav-item">
              <i class="i-heroicons-clipboard"></i>
              <span>Board</span>
            </NuxtLink>
          </li>
          <li class="text-center">
            <NuxtLink to="/contacts" class="nav-item">
              <i class="i-heroicons-users"></i>
              <span>Contacts</span>
            </NuxtLink>
          </li>
        </ul>
      </footer>
    </template>
  </div>
</template>

<script>
import Navigation from '~/components/Navigation.vue';
import Header from '~/components/Header.vue';

export default {
  components: {
    Navigation,
    Header,
  },
};
</script>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  overflow: hidden; /* Verhindert, dass das gesamte Layout scrollt */
}

/* Desktop-Styling */
.sidebar {
  width: 250px;
  color: white;
  position: fixed; /* Fixiere die Sidebar */
  height: 100vh; /* Höhe auf gesamten Bildschirm setzen */
  top: 0;
  left: 0;
}

.main-content {
  flex-grow: 1;
  margin-left: 250px; /* Platz für die Sidebar */
  display: flex;
  flex-direction: column;
}

.header {
  position: fixed; /* Der Header bleibt fest */
  top: 0;
  left: 250px; /* Muss links der Sidebar ausgerichtet werden */
  right: 0;
  z-index: 100; /* Sicherstellen, dass der Header über allem ist */
  height: 60px; /* Fixiere die Höhe des Headers */
  background-color: inherit; /* Der Header soll den Hintergrund der Seite übernehmen */
  display: flex;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Optional: Schattierung für den Header */
  padding: 0 20px;
}

.page-content {
  flex-grow: 1;
  overflow-y: auto; /* Ermöglicht das Scrollen des Inhalts */
  margin-top: 60px; /* Platz für den Header lassen */
  padding: 20px; /* Innenabstand für den Inhalt */
}

/* Mobile-Styling: Header, NuxtPage, Navigation untereinander */
@media (max-width: 768px) {
  .app-layout {
    flex-direction: column;
  }

  .sidebar {
    display: none; /* Verstecke die Sidebar auf mobilen Geräten */
  }

  .main-content {
    margin-left: 0;
  }

  .header {
    left: 0;
  }

  .mobile-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px 0;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  }

  .mobile-nav ul {
    display: flex;
    justify-content: space-around;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white; 
    text-decoration: none;
    font-size: 0.875rem;
    overflow-y: hidden;
  }

  .nav-item i {
    font-size: 1.5rem;
    margin-bottom: 4px;
  }

  .main-content {
    padding-bottom: 60px; 
  }

  .page-content {
    margin-top: 0; 
    padding: 10px;
  }
}
</style>
