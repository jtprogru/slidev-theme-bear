<script setup lang="ts">
import { computed } from 'vue'
import { handleBackground } from '../layoutHelper'

// Картинка во весь экран (full-bleed). Контент слайда, если есть, ложится
// поверх; при `dim: true` под ним затемняющий градиент для читаемости.
const props = defineProps({
  image: {
    type: String,
  },
  dim: {
    type: Boolean,
    default: false,
  },
})
const style = computed(() => handleBackground(props.image, props.dim))
</script>

<template>
  <div class="slidev-layout image w-full h-full grid" :style="style">
    <div class="my-auto" :class="{ 'text-white': props.dim }">
      <slot />
    </div>
  </div>
</template>
