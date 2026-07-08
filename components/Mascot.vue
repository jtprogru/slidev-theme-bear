<script setup lang="ts">
import { resolveAssetUrl } from '../layoutHelper'

// Маскот (BRANDING §1/§5): живой «косолапый», только в тёплых зонах
// (обложка/разделы/QA). Не перекрывает текст, один медведь на экран.
// Плейсхолдер лежит в public/mascot.svg — замени своей иллюстрацией.
const props = withDefaults(defineProps<{
  size?: number | string
  src?: string
}>(), {
  size: 220,
  src: '/mascot.svg',
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
