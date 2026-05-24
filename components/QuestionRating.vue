<script setup lang="ts">
const props = defineProps<{
  question: string
  rateLabels: [string, string]
  modelValue: number | null
}>()
const emit = defineEmits<{ 'update:modelValue': [val: number] }>()
</script>

<template>
  <div class="quiz-question">
    <h2 class="h2_title">{{ question }}</h2>
    <p class="quiz-question__rate-from paragraph-16-600 text-center">Rate from 1 to 5</p>
    <div class="quiz-question__options">
      <div class="quiz-question__options-wrapper">
        <div
          v-for="n in 5"
          :key="n"
          :class="['option-item paragraph-16-600', modelValue === n && 'selected']"
          @click="emit('update:modelValue', n)"
        >
          {{ n }}
        </div>
      </div>
      <p class="paragraph_14-400 quiz-question__rate-text">
        <span>{{ rateLabels[0] }}</span>
        <span class="quiz-question__rate-text--right">{{ rateLabels[1] }}</span>
      </p>
    </div>
  </div>
</template>
