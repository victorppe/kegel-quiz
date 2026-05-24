<script setup lang="ts">
const props = defineProps<{ dark?: boolean }>()
const logoSrc = computed(() => '/doctor-kegel.png')
</script>

<template>
  <header class="quiz-header">
    <img :src="logoSrc" alt="Doctor Kegel" class="w-[120px] sm:w-[150px]" style="min-height:28px" />
  </header>
</template>
