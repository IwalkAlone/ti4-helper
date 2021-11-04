<script setup lang="ts">
import { ref } from "vue";

defineProps<{ msg: string }>();

const count = ref(0);

function inc() {
  count.value++;
}
</script>

<template>
  <h1 data-cy="count">{{ count }}</h1>
  <button data-cy="inc-button" @click="inc">Inc</button>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
