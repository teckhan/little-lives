<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style lang="pcss" scoped>
:global(body) {
    @apply min-h-screen;
}

:global(body),
:global(#app),
main {
    @apply flex grow flex-col;
}
</style>
