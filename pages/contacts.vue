<template>
  <div class="content">
    <div class="contacts-container">
      <!-- Contact List -->
      <div v-if="!showDetailsOnMobile" class="contacts-list">
        <div class="add-contact-btn" @click="showOverlay = true">
          Add new Contact <span class="icon">➕</span>
        </div>

        <!-- Contacts grouped by letter -->
        <div v-for="group in groupedContacts" :key="group.letter" class="contact-group">
          <h2>{{ group.letter }}</h2>
          <div
            v-for="contact in group.contacts"
            :key="contact.id"
            class="contact-item"
            @click="selectContact(contact)"
          >
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

      <!-- Selected Contact Details -->
      <div v-if="selectedContact && (!isMobile || showDetailsOnMobile)" class="contact-detail">
        <div class="contacts-title">
          <h1>Contacts <span class="subtitle">| Better with a team</span></h1>
        </div>

        <div v-if="isMobile" class="back-btn" @click="backToList">← Back to Contacts</div>

        <div class="contacts-headline">
          <div class="detailsLogo" :style="{ backgroundColor: selectedContact.color }">
            {{ selectedContact.initials }}
          </div>
          <div class="contact-info">
            <h2>{{ selectedContact.name }}</h2>
            <div class="contact-actions">
              <button @click="editContact(selectedContact)">Edit</button>
              <button @click="deleteContact(selectedContact.id)">Delete</button>
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

    <!-- Overlay for Adding Contact -->
    <div v-if="showOverlay" class="overlay">
      <UPageCard class="flex text-4xl border-2 border-primary">
        <!-- <div class="overlay-content"> -->
          <div class="">
            <img src="@/assets/images/logo-white.svg" alt="Logo" />
            <div class="text-left space-y-2">
    <h2 class="text-3xl font-bold text-primary">Add Contact</h2>
    <p class="text-2xl text-primary">Tasks are better with a team!</p>
</div>
          </div>

          <div class="whiteside">
            <span class="close-btn" @click="closeOverlay">✖</span>
            <form class="overlay-form" @submit.prevent="addContact">
              <div class="form-group">
                <input type="text" id="surname" v-model="newContact.surname" placeholder="Surname Name" required />
                <span class="input-icon">👤</span>
              </div>
              <div class="form-group">
                <input type="email" id="email" v-model="newContact.email" placeholder="Email" required />
                <span class="input-icon">📧</span>
              </div>
              <div class="form-group">
                <input type="tel" id="phone" v-model="newContact.phone" placeholder="Phone" required />
                <span class="input-icon">📞</span>
              </div>
              <div class="overlay-actions">
                <UButton type="button"@click="closeOverlay">Cancel ✖</UButton>
                <UButton type="submit">Create Contact ✔</UButton>
              </div>
            </form>
          </div>
        <!-- </div> -->
      </UPageCard>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useContactsStore } from '~/stores/contacts';

const store = useContactsStore();
const showOverlay = ref(false);
const newContact = ref({
  surname: '',
  email: '',
  phone: ''
});
const selectedContact = ref(null);
const showDetailsOnMobile = ref(false);
const isMobile = ref(false);

onMounted(() => {
  isMobile.value = window.innerWidth < 1200;
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 1200;
  });
  store.fetchContacts();
});

function selectContact(contact) {
  selectedContact.value = contact;
  if (isMobile.value) {
    showDetailsOnMobile.value = true;
  }
}

function backToList() {
  showDetailsOnMobile.value = false;
}

function addContact() {
  if (newContact.value.surname && newContact.value.email) {
    const newContactData = {
      name: newContact.value.surname,
      email: newContact.value.email,
      phone: newContact.value.phone,
      color: getRandomColor(),
      initials: newContact.value.surname
        .split(' ')
        .map(word => word[0])
        .join(''),
    };

    store.addContact(newContactData);
    closeOverlay();
  }
}

function closeOverlay() {
  showOverlay.value = false;
  newContact.value = { surname: '', email: '', phone: '' };
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

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
.content {
  display: flex;
  padding: 50px;
  height: 100vh;
  width: 100%;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  border: 40px;
}

.overlay-content {
  display: flex;
  border-radius: 15px;
  overflow: hidden;
  width: 80%;
  max-width: 900px;
  height: 450px;
}

.darkside {
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
  color: white;
}

.darkside h2 {
  font-size: 24px;
  margin-top: 15px;
}

.darkside p {
  font-size: 16px;
  color: #3b82f6;
}

.whiteside {
  flex-grow: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 20px;
  cursor: pointer;
  color: #888;
}

.form-group {
  position: relative;
  margin-bottom: 20px;
}

.form-group input {
  width: 100%;
  padding: 10px 40px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
}

.input-icon {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  font-size: 18px;
  color: #888;
}

.overlay-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.cancel-btn,
.create-btn {
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
}

.cancel-btn {
  background-color: white;
  color: #333;
  border: 1px solid #ccc;
}

.create-btn {
  background-color: #1f2937;
  color: white;
  border: none;
}




.contact-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%; /* Ensures the avatar is circular */
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: white;
  margin-right: 15px;
  font-size: 18px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  background-color: #1f2937; /* Default color if none is set */
}

.contact-item {
  display: flex;
  align-items: center; /* Vertically aligns avatar and name */
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
  border-radius: 50%; /* Ensures the avatar is circular */
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: white;
  margin-right: 15px; /* Adds space between avatar and name */
  font-size: 18px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  background-color: #1f2937; /* Default color if none is set */
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

.contacts-container {
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.contacts-list {
  width: 35%; /* Passe die Breite der Liste an */
  padding-right: 20px;
  border-right: 1px solid #e2e8f0;
  overflow-y: auto;
}

.contact-detail {
  width: 65%; /* Passe die Breite der Detailansicht an */
  padding-left: 20px;
  overflow-y: auto;
}


</style>
