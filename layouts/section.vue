<script setup lang="ts">
// Разделитель — тёплая зона (BRANDING §1/§5): опциональный маскот.
// Включается frontmatter'ом `mascot: true` (или `mascot: /path.svg`).
const props = defineProps({
  mascot: {
    type: [Boolean, String],
    default: false,
  },
})
</script>

<template>
  <div class="slidev-layout h-full grid section relative">
    <div class="my-auto">
      <slot />
    </div>
    <Mascot
      v-if="props.mascot"
      v-bind="typeof props.mascot === 'string' ? { src: props.mascot } : {}"
      :size="170"
      class="absolute bottom-10 right-12 pointer-events-none"
    />
  </div>
</template>
