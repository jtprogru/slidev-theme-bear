<script setup lang="ts">
// Обложка — тёплая зона (BRANDING §1/§5): можно показать маскота.
// Включается frontmatter'ом `mascot: true` (или `mascot: /path.svg`).
const props = defineProps({
  mascot: {
    type: [Boolean, String],
    default: false,
  },
})
</script>

<template>
  <div class="slidev-layout cover relative">
    <div class="my-auto w-full">
      <slot />
    </div>
    <Mascot
      v-if="props.mascot"
      v-bind="typeof props.mascot === 'string' ? { src: props.mascot } : {}"
      :size="200"
      class="absolute bottom-10 right-12 pointer-events-none"
    />
  </div>
</template>
