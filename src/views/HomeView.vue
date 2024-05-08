<template>
  <main class="px-2.5 py-5 [&>section]:p-5">
    <section>
      <h1 class="text-4xl font-bold text-gray-300">LittleLives Frontend Challenge 1 - Wong Teck Han</h1>
    </section>
    
    <section class="space-y-2.5">
      <h2 class="text-3xl font-bold text-gray-800">Settings Form</h2>
      <TimeSlotsConfiguration />
    </section>
  </main>
</template>

<script lang="ts" setup>
import TimeSlotsConfiguration from '@/components/organisms/TimeSlotsConfiguration.vue'
</script>