<template>
  <UContainer>
    <div class="board">
      <!-- Columns for each status -->
      <div
        class="column"
        v-for="status in statuses"
        :key="status.id"
        :data-status-id="status.id"
      >
        <h2>{{ status.title }}</h2>
        <Draggable
          v-model="tasksByStatus[status.id]"
          :group="'tasks'"
          @end="onEnd"
          class="tasks"
          itemKey="id"
        >
          <template #item="{ element }">
            <div v-if="element && element.id" class="task-card-wrapper">
              <div @click="openOverlay(element)">
                <TaskCard :task="element" />
              </div>
            </div>
          </template>
        </Draggable>
      </div>
    </div>

    <!-- Overlay for enlarged card -->
    <div v-if="showOverlay" class="overlay" @click="closeOverlay">
      <div class="overlay-content" @click.stop>
        <div class="front bg-white p-8 shadow-lg rounded-lg">
          <TaskCard :task="selectedTask" />
          <!-- Buttons for edit and delete -->
          <div class="mt-4 flex justify-end gap-4">
            <button @click="editTask(selectedTask)" class="bg-blue-500 text-white px-4 py-2 rounded-lg">Bearbeiten</button>
            <button @click="deleteTask(selectedTask.id)" class="bg-red-500 text-white px-4 py-2 rounded-lg">Löschen</button>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import TaskCard from '~/components/TaskCard.vue';
import { useNuxtApp } from '#app';
import Draggable from 'vuedraggable';

// Define the statuses
const statuses = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'await-feedback', title: 'Await Feedback' },
  { id: 'done', title: 'Done' }
];

// State management for tasks and the selected task
const tasks = ref([]);
const selectedTask = ref(null);
const showOverlay = ref(false);

// Fetch tasks from Firebase on component mount
onMounted(async () => {
  const { $db } = useNuxtApp();
  try {
    const querySnapshot = await getDocs(collection($db, 'tasks'));
    tasks.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
});

// Categorize tasks by status
const tasksByStatus = computed(() => {
  const statusMapping = {
    'todo': [],
    'in-progress': [],
    'await-feedback': [],
    'done': []
  };

  tasks.value.forEach(task => {
    statusMapping[task.status].push(task);
  });

  return statusMapping;
});

// Open overlay and display selected task
function openOverlay(task) {
  selectedTask.value = task;
  showOverlay.value = true;
}

// Close overlay
function closeOverlay() {
  showOverlay.value = false;
}

// Edit task
function editTask(task) {
  console.log('Edit task:', task);
}

// Delete task
async function deleteTask(taskId) {
  const { $db } = useNuxtApp();
  try {
    await deleteDoc(doc($db, 'tasks', taskId));
    tasks.value = tasks.value.filter(task => task.id !== taskId);
    closeOverlay(); // Schließe Overlay nach dem Löschen
  } catch (error) {
    console.error('Error deleting task:', error);
  }
}

// Update task status after drag-and-drop
async function onEnd(event) {
  const movedTask = event.item?._underlying_vm;
  
  // Sicherstellen, dass movedTask definiert ist, bevor wir darauf zugreifen
  if (!movedTask || !movedTask.id) {
    console.error('Moved task is undefined or missing id.');
    return;
  }

  const newStatus = event.to.closest('.column')?.dataset.statusId;

  if (!newStatus) {
    console.error('New status is missing.');
    return;
  }

  const oldStatus = movedTask.status;
  
  // Optimistisch den neuen Status setzen
  movedTask.status = newStatus;

  try {
    const { $db } = useNuxtApp();
    const taskDocRef = doc($db, 'tasks', movedTask.id);
    await updateDoc(taskDocRef, { status: newStatus });
    
    console.log('Task status updated:', movedTask);
  } catch (error) {
    console.error('Error updating task status:', error);
    // Falls der API-Aufruf fehlschlägt, den Status zurücksetzen
    movedTask.status = oldStatus;
  }
}
</script>

<style scoped>
.board {
  display: flex;
  gap: 20px;
  padding: 20px;
  justify-content: space-between;
}

.column {
  flex: 1;
  padding: 10px;
  background-color: #f4f4f4;
  border-radius: 8px;
  min-height: 600px;
}

.tasks {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.task-card-wrapper {
  cursor: grab;
}

.task-card-wrapper:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.draggable-dragging {
  opacity: 0.5;
}

/* Overlay styles */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.overlay-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 60%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
