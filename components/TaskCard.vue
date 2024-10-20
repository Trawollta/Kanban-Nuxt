<template>
  <div>
    <!-- Task Card with Click Event to Open Overlay -->
    <div class="task-card" @click="openOverlay(task)">
      <!-- Category Badge -->
      <div class="category-badge">{{ task.category }}</div>

      <!-- Task Title -->
      <div class="task-header">
        <h2>{{ task.title }}</h2>
      </div>

      <!-- Task Description -->
      <p class="description" v-if="task.description">{{ task.description }}</p>

      <!-- Task Due Date -->
      <div class="due-date">
        <i class="calendar-icon"></i>
        <span>{{ task.dueDate ? formatDate(task.dueDate) : 'No Due Date' }}</span>
      </div>

      <!-- Assigned Avatar and Priority Icon -->
      <div class="task-footer">
        <div class="assigned-to">
          <div class="avatar">{{ getInitials(task.assignedTo) }}</div>
        </div>
        <div class="priority-icon" :class="getPriorityClass(task.priority)">
          <i class="priority-icon-inner"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  task: {
    type: Object,
    required: true
  }
});

const showOverlay = ref(false);
const selectedTask = ref(null);

function openOverlay(task) {
  selectedTask.value = task;
  showOverlay.value = true;
}

function closeOverlay() {
  showOverlay.value = false;
}

function editTask(task) {
  console.log('Edit task:', task);
}

function deleteTask(taskId) {
  console.log('Delete task with ID:', taskId);
}

function getInitials(name) {
  return name ? name.split(' ').map(word => word[0].toUpperCase()).join('') : 'NA';
}

function formatDate(date) {
  if (!date) return "No Due Date";
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
}

function getPriorityClass(priority) {
  switch (priority) {
    case 'urgent':
      return 'priority-urgent';
    case 'medium':
      return 'priority-medium';
    case 'low':
      return 'priority-low';
    default:
      return 'priority-default';
  }
}
</script>

<style scoped>
.task-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 220px;
  height: 280px;
  overflow: hidden;
  background-color: white;
  color: black;
  cursor: pointer;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.task-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.category-badge {
  background-color: #f97316;
  color: white;
  border-radius: 9999px;
  padding: 4px 12px;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
}

.task-header h2 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-top: 16px;
}

.description {
  font-size: 0.875rem;
  color: #4b5563;
  margin-top: 8px;
}

.due-date {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 16px;
}

.calendar-icon {
  margin-right: 8px;
  /* Here you can use an icon font or image for the calendar */
}

.task-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.avatar {
  background-color: #14b8a6;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  font-weight: bold;
}

.priority-icon {
  font-size: 1.25rem;
}

.priority-urgent {
  color: #dc2626;
}

.priority-medium {
  color: #f59e0b;
}

.priority-low {
  color: #10b981;
}

.priority-default {
  color: #9ca3af;
}

/* Transition effects */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
