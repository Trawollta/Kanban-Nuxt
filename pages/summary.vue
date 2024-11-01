<template>
  <div class="p-8">
    <!-- Header Section -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-4xl font-bold">Join 360</h1>
      <span class="text-lg text-gray-500">Key Metrics at a Glance</span>
    </div>


    <div class="mt-8">
      <h2 class="text-3xl font-bold text-center">
        Good afternoon, {{ userName }}!
      </h2>
    </div>
    <!-- Main Metrics Layout -->
    <div class="grid grid-cols-2 gap-8 mb-8">
      <!-- First row: To-do and Done -->
      <ULandingCard class="hover-card">
        <div class="flex flex-col items-center p-4 rounded-lg shadow-md">
          <img src="@/assets/images/pencil-grey.svg" class="mb-2" alt="To-do" />
          <span class="text-2xl font-bold">{{ todoTasks.length }}</span>
          <span class="text-gray-500">To-do</span>
        </div>
      </ULandingCard>

      <ULandingCard class="hover-card">
        <div class="flex flex-col items-center p-4 rounded-lg shadow-md">
          <img src="@/assets/images/check_nav-grey.svg" class="mb-2" alt="Done" />
          <span class="text-2xl font-bold">{{ doneTasks.length }}</span>
          <span class="text-gray-500">Done</span>
        </div>
      </ULandingCard>
    </div>

<!-- Deadline Section (Center row) -->
<div class="grid grid-cols-1 mb-8">
  <ULandingCard class="hover-card">
    <div class="flex justify-center items-center p-4 space-x-8">
      <div class="flex items-center">
        <img src="@/assets/images/Prio_alta.png" class="mr-2" alt="Urgent" />
        <div>
          <span class="text-2xl font-bold">{{ urgentTasks.length }}</span>
          <span class="text-red-500">Urgent</span>
        </div>
      </div>
      <div class="text-right">
        <span class="text-xl font-bold">August 26, 2024</span>
        <p class="text-gray-500">Upcoming Deadline</p>
      </div>
    </div>
  </ULandingCard>
</div>




    <!-- Bottom Row: Tasks in Board, Progress, and Awaiting Feedback -->
    <div class="grid grid-cols-3 gap-8">
      <ULandingCard class="hover-card">
        <div class="flex flex-col items-center p-4 rounded-lg shadow-md">
          <span class="text-2xl font-bold">{{ tasksInBoard.length }}</span>
          <span class="text-gray-500">Tasks in Board</span>
        </div>
      </ULandingCard>

      <ULandingCard class="hover-card">
        <div class="flex flex-col items-center p-4 rounded-lg shadow-md">
          <span class="text-2xl font-bold">{{ tasksInProgress.length }}</span>
          <span class="text-gray-500">Tasks in Progress</span>
        </div>
      </ULandingCard>

      <ULandingCard class="hover-card">
        <div class="flex flex-col items-center p-4 rounded-lg shadow-md">
          <span class="text-2xl font-bold">{{ awaitingFeedbackTasks.length }}</span>
          <span class="text-gray-500">Awaiting Feedback</span>
        </div>
      </ULandingCard>
    </div>

    <!-- Greeting with user's name -->
  </div>
</template>

<script>
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'; // Firestore imports

export default {
  name: 'SummaryComponent',
  data() {
    return {
      userName: '',
      tasks: [], 
      todoTasks: [],
      doneTasks: [], 
      urgentTasks: [],
      tasksInBoard: [],
      tasksInProgress: [], 
      awaitingFeedbackTasks: [] 
    };
  },
  async mounted() {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user) {
      this.userName = user.displayName || 'User';
      // Firebase Firestore abfragen
      await this.fetchTasks(user.uid);
    } else {
      this.userName = 'Guest';
    }
  },
  methods: {
    async fetchTasks(userId) {
      const db = getFirestore();
      const tasksRef = collection(db, 'tasks');
      const q = query(tasksRef, where('assignedTo', '==', userId)); // Aufgaben, die dem Benutzer zugewiesen sind
      const querySnapshot = await getDocs(q);

      this.tasks = querySnapshot.docs.map(doc => doc.data());

      // Filtere die Aufgaben nach Status
      this.todoTasks = this.tasks.filter(task => task.status === 'todo');
      this.doneTasks = this.tasks.filter(task => task.status === 'done');
      this.urgentTasks = this.tasks.filter(task => task.priority === 'urgent');
      this.tasksInBoard = this.tasks; // Beispiel, um alle Aufgaben anzuzeigen
      this.tasksInProgress = this.tasks.filter(task => task.status === 'in-progress');
      this.awaitingFeedbackTasks = this.tasks.filter(task => task.status === 'awaiting-feedback');
    }
  }
};
</script>

<style scoped>
.grid {
  gap: 16px;
}

.hover-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.ULandingCard {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
}
</style>
