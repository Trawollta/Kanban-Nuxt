<template>
  <div class="add-task-container">
    <div class="task-header">
      <h1>Add Task</h1>
    </div>
    <form @submit.prevent="onSubmit" class="task-form">
      <div class="left-column">
        <div class="form-group">
          <label>Title<span class="required">*</span></label>
          <input v-model="state.input" type="text" placeholder="Enter a title" required />
        </div>

        <div class="form-group">
          <label>Description</label>
          <textarea v-model="state.textarea" placeholder="Enter a Description"></textarea>
        </div>

        <div class="form-group">
          <label>Assigned to</label>
          <select v-model="state.selectedContact">
            <option value="" disabled>Select contact to assign</option>
            <option v-for="contact in contacts" :key="contact.id" :value="contact.name">
              {{ contact.name }}
            </option>
          </select>
        </div>
      </div>


        <!-- <div class="form-group">
          <label>Due Date<span class="required">*</span></label>
          <input v-model="state.targetDate" type="date" required />
        </div> -->
        <div class="right-column">
        <div class="form-group">
          <label>Due Date<span class="required">*</span></label>
          <input v-model="state.targetDate" type="date" class="date-input" required />
        </div>

        <div class="form-group">
          <label>Prio<span class="required">*</span></label>
          <div class="priority-buttons">
            <UButton type="button" :class="['prio-button', { 'urgent': state.select === 'urgent' }]"
              @click="state.select = 'urgent'">
              Urgent
            </UButton>
            <UButton type="button" :class="['prio-button', { 'medium': state.select === 'medium' }]"
              @click="state.select = 'medium'">
              Medium
            </UButton>
            <UButton type="button" :class="['prio-button', { 'low': state.select === 'low' }]"
              @click="state.select = 'low'">
              Low
            </UButton>
          </div>
        </div>

        <div class="form-group">
          <label>Category<span class="required">*</span></label>
          <select v-model="state.selectMenu" required>
            <option value="" disabled>Select Category</option>
            <option v-for="category in predefinedCategories" :key="category.value" :value="category.value">
              {{ category.label }}
            </option>
            <option value="custom">Custom Category</option>
          </select>
        </div>

        <div v-if="state.selectMenu === 'custom'" class="form-group">
          <label>Custom Category</label>
          <input v-model="state.customCategory" type="text" placeholder="Enter custom category" />
        </div>

        <div class="form-group">
          <label>Subtasks</label>
          <input type="text" placeholder="Add new Subtask" />
        </div>
      </div>

      <!-- Schaltflächen unter dem Formular -->
      <div class="form-buttons">
        <UButton type="button" @click="clearForm" class="primary">Clear</UButton>
        <UButton type="submit" class="primary">Create Task</UButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useNuxtApp } from '#app';
import { collection, getDocs, addDoc, Firestore } from 'firebase/firestore';

// Define the state
const state = reactive({
  input: '',
  textarea: '',
  selectedContact: '',
  targetDate: '',
  select: '',
  selectMenu: '',
  customCategory: ''
});

// Predefined categories
const predefinedCategories = [
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: 'JavaScript', value: 'javascript' }
];

// Load contacts from Firestore
interface Contact {
  id: string;
  name: string;
}

const contacts = ref<Contact[]>([]);
onMounted(async () => {
  const { $db } = useNuxtApp(); // Get the Firestore instance

  if ($db instanceof Firestore) { // Ensure $db is of the correct type
    const contactsCollection = collection($db, 'contacts');
    try {
      const querySnapshot = await getDocs(contactsCollection);
      contacts.value = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return { id: doc.id, name: data.name };
      });
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  } else {
    console.error('Firestore instance is not available');
  }
});

// Submit form to Firestore
function onSubmit() {
  const category = state.selectMenu === 'custom' ? state.customCategory : state.selectMenu;
  const newTask = {
    title: state.input,
    assignedTo: state.selectedContact,
    description: state.textarea,
    priority: state.select,
    category: category,
    targetDate: state.targetDate,
    status: 'todo'
  };

  const { $db } = useNuxtApp();

  if ($db instanceof Firestore) { // Ensure $db is of the correct type
    const db = $db;
    addDoc(collection(db, 'tasks'), newTask).then(() => {
      // Reset form state
      state.input = '';
      state.textarea = '';
      state.selectedContact = '';
      state.targetDate = '';
      state.select = '';
      state.selectMenu = '';
      state.customCategory = '';
    }).catch((error) => {
      console.error('Error adding task:', error);
    });
  } else {
    console.error('Firestore instance is not available');
  }
}

// Clear form fields
function clearForm() {
  state.input = '';
  state.textarea = '';
  state.selectedContact = '';
  state.targetDate = '';
  state.select = '';
  state.selectMenu = '';
  state.customCategory = '';
}
</script>

<style scoped>

.add-task-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.task-header {
  width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}
.task-header h1 {
  font-size: 61px;
  font-weight: 700;
  margin-top: 0;
}

.task-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  gap: 80px;
  margin-top: 25px;
}

/* Form Groups: Input, Textarea, Select */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
  font-size: 1.1rem;
}

/* Styling für Input- und Textarea-Felder */
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  font-size: 1.1rem;
  transition: background-color 0.3s, border-color 0.3s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  outline: none;
}

/* Hover-Effekt für Input- und Textarea-Felder */
.form-group input:hover,
.form-group textarea:hover,
.form-group input:focus,
.form-group textarea:focus {
  background-color: #ffffff;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
  color: #333;
}

.form-group select {
  width: 100%;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  font-size: 1.1rem;
  color: #333;
  appearance: none;
  background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3Cpolyline points="6 9 12 15 18 9"/%3E%3C/svg%3E');
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 16px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-group input[type="date"] {
  color: #333;
  background-color: #f9f9f9;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1.1rem;
  outline: none;
  transition: background-color 0.3s, border-color 0.3s;
}

/* Hover- und Fokus-Effekt für das Datum-Input-Feld */
.form-group input[type="date"]:hover,
.form-group input[type="date"]:focus {
  background-color: #ffffff;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
}

/* Dropdown Options */
.form-group select option {
  padding: 12px;
  background-color: #ffffff;
  color: #333;
}

/* Placeholder-Option (Disabled) */
.form-group select option[disabled] {
  color: #aaa;
}

/* Priority Buttons Styling */
.priority-buttons {
  display: flex;
  justify-content: space-between;
}

.prio-button {
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  flex-grow: 1;
  margin-right: 10px;
  background-color: #f0f0f0;
  font-size: 1.1rem;
  transition: background-color 0.3s, color 0.3s;
}

.prio-button:last-child {
  margin-right: 0;
}

/* Priority Colors */
.prio-button.urgent {
  background-color: #ff6347;
  color: white;
}

.prio-button.medium {
  background-color: #ffa500;
  color: white;
}

.prio-button.low {
  background-color: #32cd32;
  color: white;
}

/* Hover-Effekt für die Priority Buttons */
.prio-button:hover {
  filter: brightness(1.1);
}

/* Form Buttons (Clear und Submit) */
.form-buttons {
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 20px;
}

.primary {
  background-color: #28a745;
  color: black;
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.3s;
}

.primary:hover {
  background-color: #218838;
}

.clear-btn {
  background-color: #ccc;
  padding: 12px 25px;
  margin-right: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.clear-btn:hover {
  background-color: #bbb;
}

.required {
  color: red;
  margin-left: 5px;
}

.date-input {
  width: 100%;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
}

/* Responsive Anpassung ab 900px */
@media (max-width: 900px) {
  .task-form {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .form-buttons {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
