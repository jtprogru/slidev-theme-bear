<script setup lang="ts">
import { resolveAssetUrl } from '../layoutHelper'

// Знак (mark), не маскот (BRANDING §1): геометрически упрощённый медведь,
// читается залитым одним цветом. Место — футер, шапка, мелкие размеры.
// Плейсхолдер лежит в public/mark.svg — замени своим SVG.
const props = withDefaults(defineProps<{
  size?: number | string
  src?: string
}>(), {
  size: 24,
  src: '/mark.svg',
})

const url = resolveAssetUrl(props.src)
const px = typeof props.size === 'number' ? `${props.size}px` : props.size
</script>

<template>
  <img
    :src="url"
    alt="Мишка на сервере"
    class="bear-mark inline-block align-middle select-none"
    :style="{ height: px, width: 'auto' }"
    draggable="false"
  >
</template>
