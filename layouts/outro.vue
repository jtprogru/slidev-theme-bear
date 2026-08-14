<script setup lang="ts">
// Закрытие: итоги / takeaways / контакты и ссылки.
//
// Логотип (знак + словесный знак) — опционально, frontmatter'ом `logo: true`.
// Здесь он уместен: последний слайд висит на экране во время вопросов, и это
// единственное место в деке, где имеет смысл назвать себя целиком.
const props = defineProps({
  logo: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="slidev-layout outro h-full grid relative">
    <div class="my-auto w-full">
      <slot />
    </div>
    <BearLogo
      v-if="props.logo"
      :size="34"
      class="absolute bottom-10 right-12 opacity-70 pointer-events-none"
      :style="{ color: 'var(--fg-muted)' }"
    />
  </div>
</template>
