<script setup lang="ts">
import type { NavItem } from '@nuxt/content'

// Verwende eine leere Navigation, falls nichts injiziert wurde
const injectedNavigation = inject<Ref<NavItem[]>>('navigation', ref([]))

// Map NavItem to NavigationTree
const navigation = computed(() => injectedNavigation.value.map(item => ({
  ...item,
  label: item.label || 'Default Label' // Ensure label is present
})))

// Links für die Header-Navigation
const links = [{
  label: 'Docs',
  icon: 'i-heroicons-book-open',
  to: '/getting-started'
}, {
  label: 'Pro',
  icon: 'i-heroicons-square-3-stack-3d',
  to: '/pro'
}, {
  label: 'Releases',
  icon: 'i-heroicons-rocket-launch',
  to: '/releases'
}]
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      <!-- Titel des Projekts -->
      <h1>Kanban Project Management Tool</h1>
      <Logo class="w-auto h-6" />
    </template>

    <template #right>
      <!-- Farbschema-Toggle Button -->
      <UColorModeButton />
      <!-- Button mit Link zu GitHub -->
      <UButton to="https://github.com/nuxt/ui" target="_blank" icon="i-simple-icons-github" color="gray" variant="ghost" />

      <ColorPicker />
    </template>

    <!-- <template>
      <ColorPicker />
    </template> -->

    <template #panel>
      <!-- Navigation, die auf die injizierte Navigation verweist -->
      <UNavigationTree :links?="navigation" />
    </template>
  </UHeader>
</template>
