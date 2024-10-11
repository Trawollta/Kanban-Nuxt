<template>
  <div class="contacts-section">
    <!-- Button zum Hinzufügen eines neuen Kontakts -->
    <button class="add-contact-btn" @click="showPopup = true">
      Add new Contact
      <span class="icon">➕</span>
    </button>

    <!-- Kontaktliste -->
    <div class="contacts-list">
      <div v-for="group in groupedContacts" :key="group.letter">
        <h2>{{ group.letter }}</h2>
        <div v-for="contact in group.contacts" :key="contact.id" class="contact-item">
          <div class="contact-avatar" :style="{ backgroundColor: contact.color }">
            {{ contact.initials }}
          </div>
          <div class="contact-info">
            <h3>{{ contact.name }}</h3>
            <p>{{ contact.email }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Popup zum Hinzufügen eines Kontakts -->
    <div v-if="showPopup" class="popup">
      <div class="popup-content">
        <h2>Add Contact</h2>
        <form @submit.prevent="addContact">

          <label for="name">Name:</label>
          <input type="text" id="name" v-model="newContactName" required />

          <UFormGroup label="Email">
          <Uinput type="email" id="email" v-model="newContactEmail" icon="i-heroicons-envelope" required />
        </UFormGroup>

          <button type="submit">Save Contact</button>
          <button type="button" @click="showPopup = false">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import { useContactsStore } from '~/stores/contacts';

const store = useContactsStore();
const showPopup = ref(false);
const newContactName = ref('');
const newContactEmail = ref('');

// Lade Kontakte von Firebase, wenn die Komponente gemountet wird
onMounted(() => {
  store.fetchContacts();
});

function addContact() {
  if (newContactName.value && newContactEmail.value) {
    const newContact = {
      name: newContactName.value,
      email: newContactEmail.value,
      color: getRandomColor(),
      initials: newContactName.value.split(' ').map(word => word[0]).join(''),
    };

    // Füge den neuen Kontakt hinzu (Firebase)
    store.addContact(newContact);

    // Popup schließen und Felder zurücksetzen
    showPopup.value = false;
    newContactName.value = '';
    newContactEmail.value = '';
  }
}

// Funktion zur Generierung einer zufälligen Farbe
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Gruppiere Kontakte nach dem ersten Buchstaben
const groupedContacts = computed(() => {
  let groups = {};
  store.contacts.forEach(contact => {
    const firstLetter = /^[A-Za-z]$/.test(contact.name[0]) 
      ? contact.name[0].toUpperCase() 
      : '#';
    
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(contact);
  });

  return Object.keys(groups)
    .sort()
    .map(letter => ({
      letter,
      contacts: groups[letter]
    }));
});
</script>

<style scoped>
.contacts-section {
  width: 100%;
  max-width: 500px;
  margin: 50px auto;
  background-color: #1e1e2d;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.add-contact-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  font-size: 16px;
  transition: background-color 0.3s;
}

.add-contact-btn:hover {
  background-color: #218838;
}

.contacts-list {
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.contact-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.contact-item:last-child {
  border-bottom: none;
}

.contact-item:hover {
  background-color: #f8f9fa;
}

.contact-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: white;
  margin-right: 10px;
}

.contact-info h3 {
  margin: 0;
  font-size: 16px;
}

.contact-info p {
  margin: 0;
  color: #007bff;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* Hintergrund mit stärkerer Transparenz */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Stelle sicher, dass das Popup über allem liegt */
}

.popup-content {
  background-color: #fff;
  padding: 30px;
  border-radius: 15px; /* Weiche, abgerundete Ecken */
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2); /* Stärkerer Schatten für ein modernes Aussehen */
  max-width: 500px;
  width: 100%;
  text-align: center;
  transition: transform 0.3s ease, opacity 0.3s ease; /* Animation für sanftes Öffnen und Schließen */
}

.popup-content h2 {
  margin-top: 0;
  font-size: 24px;
  color: #333; /* Dunklere Schriftfarbe */
}

.popup-content input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 8px; /* Abgerundete Ecken für die Input-Felder */
  border: 1px solid #ccc;
  font-size: 16px;
}

.popup-content button {
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.popup-content button[type="submit"] {
  background-color: #28a745;
  color: white;
}

.popup-content button[type="submit"]:hover {
  background-color: #218838; /* Button Hover-Effekt */
}

.popup-content button[type="button"] {
  background-color: #dc3545;
  color: white;
}

.popup-content button[type="button"]:hover {
  background-color: #c82333; /* Abbrechen-Button Hover-Effekt */
}

</style>
