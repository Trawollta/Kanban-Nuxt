<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

const userInitials = ref('');
const showPopover = ref(false);
const router = useRouter();

function getInitials(name: string): string {
  if (!name) return '';
  const initials = name.split(' ').map((word) => word[0].toUpperCase());
  return initials.join('');
}

function logout() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      console.log("User successfully signed out");

      router.push('/login');
    })
    .catch((error) => {
      console.error('Error signing out:', error);
    });
}

onMounted(() => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user && user.displayName) {
    userInitials.value = getInitials(user.displayName);
  } else {
    userInitials.value = 'GU';
  }
});
</script>

<template>
  <UHeader>

    <template #left>
      <span class="text-2xl font-bold text-primary">Kanban Board</span>
    </template>

    <template #right>

      <ColorPicker />

      <UColorModeButton />


      <div class="relative">
        <div class="avatar cursor-pointer" @click="showPopover = !showPopover">
          <span class="border-primary">{{ userInitials }}</span>
        </div>

        <!-- Popover -->
        <div v-if="showPopover"
          class="popover absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-gray-700 p-4 z-10">
          <ul class="text-gray-800 dark:text-gray-300">
            <li class="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer" @click="router.push('/profile')">
              Profil bearbeiten</li>
            <li class="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer" @click="logout">Ausloggen</li>
          </ul>
        </div>
      </div>
    </template>
  </UHeader>
</template>

<style scoped>
.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #3498db;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
}

.popover {
  background-color: #1e293b;
  border: 1px solid #4b5563;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 220px;
  z-index: 1000;
}

.popover ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.popover li {
  padding: 12px 16px;
  cursor: pointer;
  color: white;
  transition: background-color 0.3s, color 0.3s;
}

.popover li:hover {
  background-color: #2563eb;
  color: #f1f5f9;
}
</style>
