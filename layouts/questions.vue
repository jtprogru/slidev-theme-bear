<script setup lang="ts">
// «Вопросы?» — тёплая зона (BRANDING §5/§7): маскот включён по умолчанию.
// Отключается frontmatter'ом `mascot: false`.
const props = defineProps({
  mascot: {
    type: [Boolean, String],
    default: true,
  },
})
</script>

<template>
  <div class="slidev-layout questions statement center h-full grid place-content-center relative">
    <div class="my-auto text-center">
      <slot>
        <h1>Вопросы?</h1>
      </slot>
    </div>
    <Mascot
      v-if="props.mascot"
      v-bind="typeof props.mascot === 'string' ? { src: props.mascot } : {}"
      :size="180"
      class="absolute bottom-10 right-12 pointer-events-none"
    />
  </div>
</template>
