<template>
  <div class="register-page">
    <h2>Register</h2>
    <form @submit.prevent="onRegister">
      <div>
        <label for="firstName">First Name</label>
        <input v-model="firstName" type="text" id="firstName" placeholder="Enter your first name" required />
      </div>
      <div>
        <label for="lastName">Last Name</label>
        <input v-model="lastName" type="text" id="lastName" placeholder="Enter your last name" required />
      </div>
      <div>
        <label for="email">Email</label>
        <input v-model="email" type="email" id="email" placeholder="Enter your email" required />
      </div>
      <div class="password-container">
        <label for="password">Password</label>
        <input :type="showPassword ? 'text' : 'password'" v-model="password" id="password" placeholder="Enter your password" required />
        <p v-if="passwordError" class="error">{{ passwordError }}</p>
        <label><input type="checkbox" v-model="showPassword" /> Show Password</label>
      </div>
      <div>
        <label for="confirmPassword">Confirm Password</label>
        <input :type="showConfirmPassword ? 'text' : 'password'" v-model="confirmPassword" id="confirmPassword" placeholder="Confirm your password" required />
        <label><input type="checkbox" v-model="showConfirmPassword" /> Show Confirm Password</label>
      </div>
      <div>
        <button type="submit">Register</button>
      </div>
    </form>
    <p v-if="registrationError" class="error">{{ registrationError }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useNuxtApp } from '#app';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'; // Stelle sicher, dass createUserWithEmailAndPassword importiert wird

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const passwordError = ref('');
const registrationError = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);

function onRegister() {
  const auth = getAuth(); // Hole den Auth-Service direkt

  // Passwortvalidierung
  if (password.value !== confirmPassword.value) {
    registrationError.value = "Passwords do not match.";
    return;
  }

  // Firebase-Registrierung
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      updateProfile(user, {
        displayName: `${firstName.value} ${lastName.value}`
      }).then(() => {
        console.log('User registered successfully with name:', `${firstName.value} ${lastName.value}`);
      }).catch((error) => {
        registrationError.value = error.message;
        console.error('Error updating profile:', error);
      });
    })
    .catch((error) => {
      console.error('Error during registration:', error); // Dieser Abschnitt zeigt den Fehler an
      console.error('Full error object:', error.response ? error.response.data : error); // Ausführlichere Fehlermeldung
      registrationError.value = error.message; // Zeige die Fehlermeldung an
    });
}

</script>

<style scoped>
.register-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #218838;
}

.error {
  color: red;
}

.password-container {
  position: relative;
}
</style>
