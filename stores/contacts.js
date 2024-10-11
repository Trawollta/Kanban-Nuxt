import { defineStore } from 'pinia';
import { useNuxtApp } from '#app'; // Verwende useNuxtApp, um auf db zuzugreifen
import { collection, getDocs, addDoc } from 'firebase/firestore';

export const useContactsStore = defineStore('contacts', {
  state: () => ({
    contacts: [],
  }),

  actions: {
    // Kontakte von Firebase abrufen
    async fetchContacts() {
      try {
        const { $db } = useNuxtApp(); // Zugriff auf db über nuxtApp
        const querySnapshot = await getDocs(collection($db, 'contacts'));
        this.contacts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    },

    // Neuen Kontakt in Firebase speichern
    async addContact(newContact) {
      try {
        const { $db } = useNuxtApp(); // Zugriff auf db über nuxtApp
        const docRef = await addDoc(collection($db, 'contacts'), newContact);
        this.contacts.push({ ...newContact, id: docRef.id });
      } catch (error) {
        console.error('Error adding contact:', error);
      }
    },
  },
});
