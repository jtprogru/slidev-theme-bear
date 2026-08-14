<script setup lang="ts">
import { markSvg } from './brandAssets'

// Знак (mark), не маскот (BRANDING §1): геометрически упрощённый медведь,
// читается залитым одним цветом. Место — футер, шапка, мелкие размеры.
//
// Приезжает из @jtprogru/mishka-ds через scripts/sync-brand.mjs. Вставляется
// инлайном, а не через <img>: заливка знака — currentColor, он наследует цвет
// текста и одинаково работает на светлой и тёмной теме.
//
// Знак не квадратный (23.16×29.57): задаётся высота, ширина считается сама.
const props = withDefaults(defineProps<{
  size?: number | string
}>(), {
  size: 24,
})

const px = typeof props.size === 'number' ? `${props.size}px` : props.size
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <span
    class="bear-mark inline-block align-middle select-none"
    :style="{ height: px }"
    v-html="markSvg"
  />
</template>

<style scoped>
.bear-mark :deep(svg) {
  height: 100%;
  width: auto;
  display: block;
}
</style>
