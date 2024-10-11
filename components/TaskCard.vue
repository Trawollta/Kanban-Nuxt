<template>
    <div class="task-card">
      <div class="task-header">
        <h2>{{ task.title }}</h2>
        <span :class="priorityClass">{{ task.priority }}</span>
      </div>
      <p class="assigned-to"><strong>Assigned to:</strong> {{ task.assignedTo }}</p>
      <p class="description">{{ task.description }}</p>
      <p class="category"><strong>Category:</strong> {{ task.category }}</p>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  const props = defineProps({
    task: Object // Die Aufgabe wird als Prop übergeben
  });
  
  // Funktion zur Bestimmung der Farbe basierend auf der Priorität
  const priorityClass = computed(() => {
    return {
      'low-priority': props.task.priority === 'Low',
      'medium-priority': props.task.priority === 'Medium',
      'high-priority': props.task.priority === 'High',
    };
  });
  </script>
  
  <style scoped>
  .task-card {
    cursor: pointer;
    box-sizing: border-box;
    padding: 16px;
    width: 100%;
    font-size: 16px;
    background-color: white;
    border-radius: 24px;
    box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.08);
    touch-action: none;
  }
  
  .task-card:hover {
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  }
  
  .task-header {
    font-weight: 700;
    font-size: 16px;
    color: #2a3647;
  }
  
  .task-header h2 {
    font-size: 1.25rem;
    font-weight: bold;
    margin: 0;
  }
  
  .assigned-to,
  .description,
  .category {
    margin-bottom: 0.75rem;
  }
  
  .low-priority {
    background-color: #d4edda;
    color: white;
    padding: 0.2rem 0.5rem;
    border-radius: 5px;
    font-size: 0.875rem;
  }
  
  .medium-priority {
    background-color: #fff3cd;
    color: #856404;
    padding: 0.2rem 0.5rem;
    border-radius: 5px;
    font-size: 0.875rem;
  }
  
  .high-priority {
    color: #721c24;
    padding: 0.2rem 0.5rem;
    border-radius: 5px;
    font-size: 0.875rem;
  }
  
  .task-card p {
    font-size: 0.95rem;
    color: white;
  }
  </style>
  