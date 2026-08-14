<script setup lang="ts">
import { logoSvg } from './brandAssets'

// Логотип = знак + словесный знак (BRANDING §1). Для мест, где нужно назвать
// себя целиком: титул, финальный слайд, контакты. В футере — <BearMark>, там
// словесный знак не читается и только шумит.
//
// Как и знак, залит currentColor и вставляется инлайном, а не через <img>.
// Пропорция 340×64, задаётся высота.
const props = withDefaults(defineProps<{
  size?: number | string
}>(), {
  size: 40,
})

const px = typeof props.size === 'number' ? `${props.size}px` : props.size
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <span
    class="bear-logo inline-block align-middle select-none"
    :style="{ height: px }"
    v-html="logoSvg"
  />
</template>

<style scoped>
.bear-logo :deep(svg) {
  height: 100%;
  width: auto;
  display: block;
}
</style>
