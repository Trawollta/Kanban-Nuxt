<template>
  <div class="p-8">
    <!-- Header Section -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-4xl font-bold">Join 360</h1>
      <span class="text-lg text-gray-500">Key Metrics at a Glance</span>
    </div>

    <!-- Hauptlayout mit Metriken und Begrüßung -->
    <div class="grid grid-cols-2 gap-4">
      <!-- Cards mit Metriken -->
      <ULandingCard>
        <div class="flex flex-col items-center p-4 rounded-lg shadow-md">
          <span class="text-4xl">✏️</span>
          <span class="text-2xl font-bold">2</span>
          <span class="text-gray-500">To-do</span>
        </div>
      </ULandingCard>

      <ULandingCard>
        <div class="flex flex-col items-center p-4 rounded-lg shadow-md">
          <span class="text-4xl">✔️</span>
          <span class="text-2xl font-bold">0</span>
          <span class="text-gray-500">Done</span>
        </div>
      </ULandingCard>

      <ULandingCard>
        <div class="flex flex-col items-center p-4 rounded-lg shadow-md">
          <span class="text-4xl">⚠️</span>
          <span class="text-2xl font-bold">1</span>
          <span class="text-red-500">Urgent</span>
          <span class="text-xl font-bold">October 5, 2024</span>
          <span class="text-gray-500">Upcoming Deadline</span>
        </div>
      </ULandingCard>

      <ULandingCard>
        <div class="flex flex-col items-center p-4 rounded-lg shadow-md">
          <span class="text-2xl font-bold">2</span>
          <span class="text-gray-500">Tasks in Board</span>
        </div>
      </ULandingCard>

      <ULandingCard>
        <div class="flex flex-col items-center p-4 rounded-lg shadow-md">
          <span class="text-2xl font-bold">0</span>
          <span class="text-gray-500">Tasks in Progress</span>
        </div>
      </ULandingCard>

      <ULandingCard>
        <div class="flex flex-col items-center p-4 rounded-lg shadow-md">
          <span class="text-2xl font-bold">0</span>
          <span class="text-gray-500">Awaiting Feedback</span>
        </div>
      </ULandingCard>
    </div>

    <!-- Begrüßung auf der rechten Seite -->
    <div class="mt-8">
      <h2 class="text-3xl font-bold text-center">Good afternoon!</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SummaryComponent',
};
</script>

<style scoped>
.grid {
  grid-template-columns: repeat(3, 1fr);
}

.ULandingCard {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
}
</style>
