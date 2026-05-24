<script setup lang="ts">
const props = defineProps<{
  progress: number
  activeCheckmarks: number
  dark?: boolean
}>()
</script>

<template>
  <div :class="['progress-bar', !dark && 'progress-bar_white']">
    <div class="progress-bar__line">
      <div class="progress-bar__fill-line" :style="{ width: progress + '%' }" />
    </div>
    <!-- 4 milestone markers -->
    <div
      v-for="i in 4"
      :key="i"
      :class="[
        'progress-bar__dot',
        i <= activeCheckmarks ? 'progress-bar__dot_active' : ''
      ]"
    />
  </div>
</template>

