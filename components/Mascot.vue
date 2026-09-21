<script setup lang="ts">
import { resolveAssetUrl } from '../layoutHelper'
import { mascotSvg } from './brandAssets'

// Маскот (BRANDING §1/§5): живой «косолапый», только в тёплых зонах
// (обложка/разделы/QA). Не перекрывает текст, один медведь на экран.
//
// Приезжает из @jtprogru/mishka-ds через scripts/sync-brand.mjs и вставляется
// инлайном, как знак. Через <img src="/brand/mascot.svg"> не выходило дважды:
// тона в файле зашиты литералами светлой темы, и на Macchiato медведь оставался
// с белой бумагой; а public/ темы в сборку колоды не попадает вовсе, так что
// в dist картинка была битой. Инлайновый маскот красится токенами
// --mascot-ink / --mascot-paper (styles/vars.css) и URL не имеет.
//
// Своя иллюстрация — `src` (или frontmatter `mascot: /path.svg`): это уже
// обычный <img> из public/ самой колоды, и он в сборку доезжает.
const props = withDefaults(defineProps<{
  size?: number | string
  src?: string
}>(), {
  size: 220,
  src: '',
})

const url = props.src ? resolveAssetUrl(props.src) : ''
const px = typeof props.size === 'number' ? `${props.size}px` : props.size
</script>

<template>
  <figure class="bear-mascot m-0 select-none">
    <img
      v-if="url"
      :src="url"
      alt="Маскот «Мишка на сервере»"
      class="block"
      :style="{ width: px, height: 'auto' }"
      draggable="false"
    >
    <!-- eslint-disable-next-line vue/no-v-html -->
    <span
      v-else
      class="bear-mascot-svg block"
      :style="{ width: px }"
      v-html="mascotSvg"
    />
    <figcaption v-if="$slots.default" class="mt-2 text-sm" :style="{ color: 'var(--fg-muted)' }">
      <slot />
    </figcaption>
  </figure>
</template>

<style scoped>
.bear-mascot-svg :deep(svg) {
  display: block;
  width: 100%;
  height: auto;
}
</style>
