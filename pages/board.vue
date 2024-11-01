<template>
  <UContainer>
    <div class="board">
      <!-- Header mit Titel, Suchleiste und Add Task Button -->
      <div class="board-header">
        <h1>Board</h1>
        <div class="board-controls">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Find task"
            class="search-bar"
          />
          <button @click="openAddTaskOverlay" class="add-task-btn">
            Add Task <span class="icon">+</span>
          </button>
        </div>
      </div>

      <!-- Columns for each status -->
      <div class="columns">
        <div
          class="column"
          v-for="status in statuses"
          :key="status.id"
          :data-status-id="status.id"
        >
          <h2>{{ status.title }}</h2>
          <Draggable
            v-model="filteredTasksByStatus[status.id]"
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
    </div>

    <!-- Overlay for adding a new task -->
    <div v-if="showAddTaskOverlay" class="overlay" @click="closeAddTaskOverlay">
      <div class="overlay-content" @click.stop>
        <h2>Add New Task</h2>
        <form @submit.prevent="addTask">
          <input type="text" v-model="newTaskTitle" placeholder="Task Title" required />
          <textarea v-model="newTaskDescription" placeholder="Task Description" required></textarea>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg">Save Task</button>
          <button type="button" @click="closeAddTaskOverlay" class="bg-gray-300 text-black px-4 py-2 rounded-lg">Cancel</button>
        </form>
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

const statuses = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'await-feedback', title: 'Await Feedback' },
  { id: 'done', title: 'Done' }
];

const tasks = ref([]);
const selectedTask = ref(null);
const showOverlay = ref(false);
const showAddTaskOverlay = ref(false);
const newTaskTitle = ref('');
const newTaskDescription = ref('');
const searchQuery = ref('');

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

// Filtered tasks based on search query
const filteredTasksByStatus = computed(() => {
  const filteredTasks = tasks.value.filter(task =>
    task.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  const statusMapping = {
    'todo': [],
    'in-progress': [],
    'await-feedback': [],
    'done': []
  };

  filteredTasks.forEach(task => {
    statusMapping[task.status].push(task);
  });

  return statusMapping;
});

function openOverlay(task) {
  selectedTask.value = task;
  showOverlay.value = true;
}

function closeOverlay() {
  showOverlay.value = false;
}

function openAddTaskOverlay() {
  showAddTaskOverlay.value = true;
}

function closeAddTaskOverlay() {
  showAddTaskOverlay.value = false;
}

function addTask() {
  const newTask = {
    title: newTaskTitle.value,
    description: newTaskDescription.value,
    status: 'todo'
  };
  tasks.value.push(newTask);
  closeAddTaskOverlay();
}
</script>

<style scoped>
.board {
  padding: 20px;
}

.board-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.board-header h1 {
  font-size: 61px;
    font-weight: 700;
    margin: 0;
}

.column h2 {
  font-weight: bold;
  font-size: 1.2rem; 
  margin-bottom: 10px; 
}


.board-controls {
  display: flex;
  gap: 10px;
  align-items: center;
}

.search-bar {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  width: 200px;
}

.add-task-btn {
  background-color: #1e40af;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

.add-task-btn:hover {
  background-color: #1d4ed8;
}

.columns {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

.column {
  flex: 1;
  padding: 10px;
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
