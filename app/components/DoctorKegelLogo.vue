<script setup lang="ts">
defineProps<{
  size?: number
  class?: string
}>()

const logoSize = ref(120)
</script>

<template>
  <svg
    :width="size || logoSize"
    :height="size || logoSize"
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="class"
  >
    <!-- Background Circle -->
    <circle cx="60" cy="60" r="58" fill="#1a1a1a" stroke="#ffffff" stroke-width="3" />

    <!-- Head -->
    <circle cx="60" cy="42" r="22" fill="#d4a574" />

    <!-- Hair -->
    <path d="M38 32C38 18 48 10 60 10C72 10 82 18 82 32Z" fill="#2d2d2d" />
    <path d="M38 25C38 20 42 16 48 16" stroke="#2d2d2d" stroke-width="2" fill="none" />
    <path d="M82 25C82 20 78 16 72 16" stroke="#2d2d2d" stroke-width="2" fill="none" />

    <!-- Eyes -->
    <circle cx="50" cy="40" r="3" fill="#4a4a4a" />
    <circle cx="70" cy="40" r="3" fill="#4a4a4a" />
    <circle cx="50.5" cy="39.5" r="1.5" fill="#ffffff" />
    <circle cx="70.5" cy="39.5" r="1.5" fill="#ffffff" />

    <!-- Eyebrows -->
    <path d="M46 35C48 34 52 34 54 35" stroke="#2d2d2d" stroke-width="1.5" stroke-linecap="round" fill="none" />
    <path d="M66 35C68 34 72 34 74 35" stroke="#2d2d2d" stroke-width="1.5" stroke-linecap="round" fill="none" />

    <!-- Nose -->
    <path d="M60 40V50" stroke="#c99060" stroke-width="1.5" stroke-linecap="round" fill="none" />

    <!-- Mouth (Smile) -->
    <path d="M52 53C56 56 64 56 68 53" stroke="#4a4a4a" stroke-width="1.5" stroke-linecap="round" fill="none" />

    <!-- Ears -->
    <ellipse cx="38" cy="42" rx="5" ry="8" fill="#d4a574" />
    <ellipse cx="82" cy="42" rx="5" ry="8" fill="#d4a574" />

    <!-- Neck -->
    <rect x="54" y="62" width="12" height="8" fill="#d4a574" />

    <!-- White Coat -->
    <path d="M42 70L42 100C42 105 45 108 50 108L70 108C75 108 78 105 78 100L78 70Z" fill="#ffffff" />

    <!-- Blue Shirt underneath -->
    <rect x="50" y="68" width="20" height="20" fill="#6b9bc0" rx="2" />

    <!-- Shirt Buttons -->
    <circle cx="60" cy="75" r="1.5" fill="#4a4a4a" />
    <circle cx="60" cy="82" r="1.5" fill="#4a4a4a" />

    <!-- White Coat lapels -->
    <path d="M50 70L46 100" stroke="#e8e8e8" stroke-width="2" fill="none" />
    <path d="M70 70L74 100" stroke="#e8e8e8" stroke-width="2" fill="none" />

    <!-- Medical Symbol (subtle) -->
    <g opacity="0.1">
      <line x1="58" y1="88" x2="62" y2="88" stroke="#000" stroke-width="1" />
      <line x1="60" y1="86" x2="60" y2="90" stroke="#000" stroke-width="1" />
    </g>
  </svg>
</template>
