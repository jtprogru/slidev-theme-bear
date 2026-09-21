<script setup lang="ts">
// Надзаголовок слайда: «01 · проблема». Показывает, в каком блоке доклада
// находится зал, и не спорит с заголовком: моно, мелко, приглушённо.
//
// Компонент, а не `###`: Slidev берёт первый markdown-заголовок слайда как его
// title (обзор, навигация, presenter), и кикер подменил бы собой заголовок.
</script>

<template>
  <div class="bear-kicker font-mono text-xs font-bold tracking-wider mb-2">
    <slot />
  </div>
</template>

<style scoped>
.bear-kicker {
  color: var(--fg-muted);
}
</style>
