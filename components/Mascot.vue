<script setup lang="ts">
import { resolveAssetUrl } from '../layoutHelper'

// Маскот (BRANDING §1/§5): живой «косолапый», только в тёплых зонах
// (обложка/разделы/QA). Не перекрывает текст, один медведь на экран.
//
// Приезжает из @jtprogru/mishka-ds через scripts/sync-brand.mjs в
// public/brand/mascot.svg. В отличие от знака крашен в два тона, а не в
// currentColor, поэтому обычного <img> достаточно. Своя иллюстрация — `src`.
const props = withDefaults(defineProps<{
  size?: number | string
  src?: string
}>(), {
  size: 220,
  src: '/brand/mascot.svg',
})

const url = resolveAssetUrl(props.src)
const px = typeof props.size === 'number' ? `${props.size}px` : props.size
</script>

<template>
  <figure class="bear-mascot m-0 select-none">
    <img
      :src="url"
      alt="Маскот «Мишка на сервере»"
      class="block"
      :style="{ width: px, height: 'auto' }"
      draggable="false"
    >
    <figcaption v-if="$slots.default" class="mt-2 text-sm" :style="{ color: 'var(--fg-muted)' }">
      <slot />
    </figcaption>
  </figure>
</template>
