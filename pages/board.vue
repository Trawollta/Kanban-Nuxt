<template>
  <UInput color="primary" variant="outline" placeholder="Search..." />
  <UContainer>
    <div class="board">
      <!-- Spalten für jeden Status -->
      <div class="column" v-for="status in statuses" :key="status.id">
        <h2>{{ status.title }}</h2>
        <div class="tasks">
          <!-- Tasks filtern und in TaskCards anzeigen -->
          <TaskCard v-for="task in getTasksByStatus(status.id)" :key="task.id" :task="task" />
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import TaskCard from '~/components/TaskCard.vue'; // TaskCard-Komponente importieren
import { useNuxtApp } from '#app'; // Zugriff auf $db aus dem Nuxt-Plugin

// Status für das Board definieren
const statuses = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'await-feedback', title: 'Await Feedback' },
  { id: 'done', title: 'Done' }
];

// Reaktives Tasks-Array initialisieren
const tasks = ref([]);

// Firebase-Datenbank abrufen und Tasks laden
onMounted(async () => {
  const { $db } = useNuxtApp(); // Zugriff auf die Firebase-Datenbank

  try {
    const querySnapshot = await getDocs(collection($db, 'tasks'));
    tasks.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log('Tasks:', tasks.value); // Debugging: Ausgabe der Tasks
  } catch (error) {
    console.error('Fehler beim Abrufen der Aufgaben:', error);
  }
});

// Funktion zum Filtern der Tasks basierend auf dem Status
function getTasksByStatus(statusId) {
  return tasks.value.filter(task => task.status === statusId);
}
</script>

<style scoped>
.board {
  display: flex;
  gap: 20px;
  padding: 20px;
}

.column {
  border-radius: 5px;
  padding: 10px;
  width: 200px;
  min-height: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.tasks {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.task-card {
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
}
</style>
