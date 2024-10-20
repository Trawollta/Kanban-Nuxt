<template>
  <div class="login-container">
    <UAuthForm
      title="Login"
      description="Enter your credentials to access your account."
      align="bottom"
      icon="i-heroicons-user-circle"
      :fields="[
        { type: 'email', label: 'Email', name: 'email', placeholder: 'Enter your email', color: 'gray', modelValue: email },
        { type: 'password', label: 'Password', name: 'password', placeholder: 'Enter your password', color: 'gray', modelValue: password }
      ]"
      :loading="loading"
      @submit="onLogin"
    />

    <!-- Gast-Login -->
    <div class="guest-login">
      <p>Oder als Gast fortfahren:</p>
      <button @click="loginAsGuest" class="guest-login-button">Als Gast fortfahren</button>
    </div>

    <!-- Fehleranzeige -->
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Firebase Auth importieren
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const loading = ref(false); // Für den Ladezustand bei der Anmeldung

function onLogin() {
  loading.value = true;
  
  // E-Mail-Format überprüfen
  if (!validateEmail(email.value)) {
    errorMessage.value = "Please enter a valid email address.";
    loading.value = false;
    return;
  }

  const auth = getAuth();
  
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      loading.value = false;
      console.log('User logged in:', userCredential.user);
      router.push('/summary'); // Weiterleitung nach erfolgreichem Login
    })
    .catch((error) => {
      loading.value = false;
      console.error('Error during login:', error);
      errorMessage.value = error.message; // Zeige die detaillierte Fehlermeldung
    });
}

// Funktion zur Validierung des E-Mail-Formats
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}


// Gast-Login-Funktion
function loginAsGuest() {
  router.push('/summary'); // Weiterleitung als Gast
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #2c3e50;
  color: white;
}

.guest-login {
  margin-top: 1rem;
}

.guest-login-button {
  background-color: #3498db;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.guest-login-button:hover {
  background-color: #2980b9;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>
