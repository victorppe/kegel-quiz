<script setup lang="ts">
const props = defineProps<{ dark?: boolean }>()
const logoSrc = computed(() =>
  props.dark
    ? 'https://quiz.kegel-plan.com/images/en/EN_logo_dark_bg.webp'
    : 'https://quiz.kegel-plan.com/images/en/EN_logo_white_bg.webp'
)
</script>

<template>
  <header class="quiz-header">
    <img :src="logoSrc" alt="Dr. Kegel" class="w-[120px] sm:w-[150px]" style="min-height:28px" />
  </header>
</template>
