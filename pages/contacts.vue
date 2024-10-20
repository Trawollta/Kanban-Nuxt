<template>
  <div class="content">
    <div class="contacts-container">
      <!-- Kontaktliste -->
      <div v-if="!showDetailsOnMobile" class="contacts-list">
        <!-- Button zum Hinzufügen eines neuen Kontakts -->
        <div class="add-contact-btn" @click="showPopup = true">
          Add new Contact <span class="icon">➕</span>
        </div>

        <!-- Kontaktliste nach Buchstaben gruppiert -->
        <div v-for="group in groupedContacts" :key="group.letter" class="contact-group">
          <h2>{{ group.letter }}</h2>
          <div v-for="contact in group.contacts" :key="contact.id" class="contact-item" @click="selectContact(contact)">
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

      <!-- Detailansicht des ausgewählten Kontakts -->
      <div v-if="selectedContact && (!isMobile || showDetailsOnMobile)" class="contact-detail">
        <!-- Zurück-Pfeil nur bei mobiler Ansicht -->
        <div v-if="isMobile" class="back-btn" @click="backToList">← Back to Contacts</div>

        <div class="contacts-headline">
          <div class="detailsLogo" :style="{ backgroundColor: selectedContact.color }">
            {{ selectedContact.initials }}
          </div>
          <div class="contact-info">
            <h2>{{ selectedContact.name }}</h2>
            <div class="contact-actions">
              <UButton icon="edit" @click="editContact(selectedContact)">Edit</UButton>
              <UButton icon="trash" @click="deleteContact(selectedContact.id)">Delete</UButton>
            </div>
          </div>
        </div>

        <div class="contact-details">
          <h3>Contact Information</h3>
          <p><strong>Email:</strong> {{ selectedContact.email }}</p>
          <p><strong>Phone:</strong> {{ selectedContact.phone }}</p>
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

          <label for="email">Email:</label>
          <input type="email" id="email" v-model="newContactEmail" required />

          <UButton type="submit">Save Contact</UButton>
          <UButton type="button" @click="showPopup = false">Cancel</UButton>
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
const selectedContact = ref(null);
const showDetailsOnMobile = ref(false);

// Erkenne, ob die Ansicht mobil ist (kleiner als 1200px)
const isMobile = ref(window.innerWidth < 1200);
window.addEventListener('resize', () => {
  isMobile.value = window.innerWidth < 1200;
});

// Lade Kontakte von Firebase
onMounted(() => {
  store.fetchContacts();
});

// Funktion zum Auswählen eines Kontakts
function selectContact(contact) {
  selectedContact.value = contact;
  if (isMobile.value) {
    showDetailsOnMobile.value = true;
  }
}

function backToList() {
  showDetailsOnMobile.value = false;
}

// Funktion zum Hinzufügen eines neuen Kontakts
function addContact() {
  if (newContactName.value && newContactEmail.value) {
    const newContact = {
      name: newContactName.value,
      email: newContactEmail.value,
      color: getRandomColor(),
      initials: newContactName.value.split(' ').map(word => word[0]).join(''),
    };

    store.addContact(newContact);
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

// Funktion zum Bearbeiten eines Kontakts
function editContact(contact) {
  console.log('Edit contact:', contact);
}

// Funktion zum Löschen eines Kontakts
function deleteContact(contactId) {
  store.deleteContact(contactId);
  if (selectedContact.value && selectedContact.value.id === contactId) {
    selectedContact.value = null;
  }
}
</script>

<style scoped>
.content {
  display: flex;
  padding: 50px;
  height: 100vh;
  width: 100%;
}

.contacts-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1200px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  width: 100%;
}

.contacts-list {
  width: 70%;
  border-right: 1px solid #e2e8f0;
  padding-right: 20px;
  box-shadow: 4px 0px 6px 0px #00000010;
}

.contact-detail {
  width: 70%;
  padding-left: 40px;
}

.contact-item {
  display: flex;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transition: background-color 0.3s;
}

.contact-item:hover {
  background-color: #f0f0f0;
}

.contact-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: white;
  margin-right: 15px;
  font-size: 18px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

.contact-info h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.contact-info p {
  margin: 0;
  font-size: 14px;
  color: #3b82f6;
}

.contacts-headline {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 32px;
}

.detailsLogo {
  width: 120px;
  height: 120px;
  display: inline-block;
  border-radius: 50%;
  background-color: #333;
  color: #fff;
  font-weight: bold;
  text-align: center;
  line-height: 120px;
  font-size: 60px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
}

.contact-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.contact-actions button {
  padding: 8px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.contact-actions button:hover {
  background-color: #0056b3;
}

.add-contact-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #ff4d4f;
  color: white;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}

.add-contact-btn:hover {
  background-color: #ff6f61;
}

/* Button zum Zurückkehren bei mobiler Ansicht */
.back-btn {
  cursor: pointer;
  margin-bottom: 20px;
  font-size: 16px;
  color: #007bff;
}
</style>
