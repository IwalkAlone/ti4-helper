<script setup lang="ts">
import { FunctionalComponent } from "vue-demi";

defineProps<{ label: string; icon: FunctionalComponent }>();
</script>

<template>
  <router-link class="text-center text-gray-400 break-words flex-1">
    <div>
      <component :is="icon" class="h-6 w-6"></component>
    </div>
    <div class="text-[10px] font-sans">{{ label }}</div>
  </router-link>
</template>

<style scoped lang="scss">
.router-link-active {
  @apply text-light-100;
}
</style>
