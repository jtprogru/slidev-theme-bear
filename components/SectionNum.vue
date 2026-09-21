<script setup lang="ts">
// Номер блока на разделителе (`layout: section`): крупная моно-цифра над
// заголовком. Цвет — пара accent-700 / accent-300, а не декоративный
// accent-400: у Sapphire на светлом фоне контраст 2.78:1, это ниже AA даже
// для крупного текста.
</script>

<template>
  <div class="bear-section-num font-mono text-8xl font-bold leading-none mb-6">
    <slot />
  </div>
</template>

<style scoped>
.bear-section-num {
  color: var(--accent-700);
}

html.dark .bear-section-num {
  color: var(--accent-300);
}
</style>
