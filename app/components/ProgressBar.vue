<script setup lang="ts">
const props = defineProps<{
  progress: number
  activeCheckmarks: number
  dark?: boolean
}>()

const checkmarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 18 18"><g fill="none"><circle cx="9" cy="9" r="9" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18ZM13.4938 5.9819C13.0994 5.6196 13.0242 5.56442 12.8644 5.5201C12.6255 5.4538 12.4596 5.46523 12.2569 5.56202C12.2106 5.58416 11.2439 6.46853 10.1087 7.52729L8.04471 9.45228L7.36122 8.81945C6.95105 8.43966 6.61708 8.1571 6.52602 8.11282C6.32146 8.01335 5.99393 8.0103 5.80123 8.10608C5.59013 8.21106 4.79124 8.98682 4.73744 9.13911C4.67207 9.32406 4.68441 9.56649 4.76731 9.72637C4.81673 9.82171 5.25767 10.2541 6.21318 11.1442C7.52627 12.3673 7.59615 12.427 7.77105 12.4749C7.99883 12.5373 8.05297 12.5373 8.2813 12.4753C8.4593 12.427 8.54121 12.3539 11.2042 9.86895C13.1782 8.02696 13.9642 7.27359 14.0161 7.17384C14.1117 6.99009 14.1104 6.71887 14.0131 6.53102C13.9693 6.44651 13.7689 6.23457 13.4938 5.9819Z" fill="currentColor"/></g></svg>`
</script>

<template>
  <div :class="['progress-bar', !dark && 'progress-bar_white']">
    <div class="progress-bar__line">
      <div class="progress-bar__fill-line" :style="{ width: progress + '%' }" />
    </div>
    <!-- 4 checkmarks: index 0 is always hidden (left anchor), 1-3 are milestone markers -->
    <span
      v-for="i in 4"
      :key="i"
      :class="[
        'progress-bar__icon',
        (i === 1 || i - 1 < activeCheckmarks) ? 'progress-bar__icon_active' : '',
        i === 1 ? 'progress-bar__icon_hidden' : ''
      ]"
      v-html="checkmarkSvg"
    />
  </div>
</template>

