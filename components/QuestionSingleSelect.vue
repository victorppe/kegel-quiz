<script setup lang="ts">
const props = defineProps<{
  question: string
  options: string[]
  optionSubtexts?: string[]
  modelValue: string | null
}>()
const emit = defineEmits<{ 'update:modelValue': [val: string] }>()
</script>

<template>
  <div class="quiz-question">
    <h2 class="h2_title sensitive_content">{{ question }}</h2>
    <div class="quiz-question__options sensitive_content">
      <div
        v-for="(opt, i) in options"
        :key="i"
        :class="['quiz-question__option-item', modelValue === opt && 'selected']"
        @click="emit('update:modelValue', opt)"
      >
        <p class="paragraph-14-500 question-text">
          {{ opt }}
          <span v-if="optionSubtexts?.[i]" class="question-description">{{ optionSubtexts[i] }}</span>
        </p>
        <div class="question-select-wrapper" />
      </div>
    </div>
  </div>
</template>
