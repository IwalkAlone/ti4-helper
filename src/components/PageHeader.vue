<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <div
    class="
      text-lg
      sticky
      top-0
      z-10
      bg-light-100
      leading-8
      h-8
      border-b-1 border-dark-100
      text-center
      shadow-md shadow-dark-900
    "
  >
    {{ title }}
  </div>
</template>
