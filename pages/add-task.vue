<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useNuxtApp } from '#app'; // Zugriff auf $db
import { addDoc, collection, Firestore } from 'firebase/firestore';

// Optionen für Auswahlfelder
const options = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' }
];

// Initialisiere den Zustand
const state = reactive({
  input: '',
  inputMenu: '',
  textarea: '',
  select: '',
  selectMenu: ''
});

// Beim Absenden des Formulars die Task erstellen und in Firebase speichern
async function onSubmit() {
  const newTask = {
    title: state.input,
    assignedTo: state.inputMenu,
    description: state.textarea,
    priority: state.select,
    category: state.selectMenu,
    status: 'todo'
  };

  try {
    const { $db } = useNuxtApp(); // Zugriff auf die $db-Property von Firebase
    const db = $db as Firestore; // Explicitly type $db as Firestore
    await addDoc(collection(db, 'tasks'), newTask);

    // Formular zurücksetzen
    state.input = '';
    state.inputMenu = '';
    state.textarea = '';
    state.select = '';
    state.selectMenu = '';
  } catch (error) {
    console.error('Fehler beim Hinzufügen der Aufgabe:', error);
  }
}
</script>

<template>
  <div class="add-task">
    <h1>Aufgabe hinzufügen</h1>
    <form @submit.prevent="onSubmit" class="space-y-4">
      <div>
        <label>Title</label>
        <input v-model="state.input" type="text" required />
      </div>

      <div>
        <label>Assigned To</label>
        <select v-model="state.inputMenu" required>
          <option v-for="option in options" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>

      <div>
        <label>Description</label>
        <textarea v-model="state.textarea" required></textarea>
      </div>

      <div>
        <label>Priorität</label>
        <select v-model="state.select" required>
          <option v-for="option in options" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>

      <div>
        <label>Kategorie</label>
        <select v-model="state.selectMenu" required>
          <option v-for="option in options" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>

      <button type="submit">Aufgabe erstellen</button>
    </form>
  </div>
</template>

<style scoped>
.add-task {
  max-width: 500px;
  margin: 0 auto;
}
</style>
