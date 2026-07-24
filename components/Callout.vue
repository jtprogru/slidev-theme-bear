<script setup lang="ts">
import { computed } from 'vue'
import IconImportant from '~icons/carbon/flag'
import IconTip from '~icons/carbon/idea'
import IconNote from '~icons/carbon/information'
import IconWarn from '~icons/carbon/warning-alt'
import IconDanger from '~icons/carbon/warning-hex'

// Семантические callouts (BRANDING §2/§4). Тип различается НЕ только цветом,
// но и иконкой, и заголовком — цвет никогда не единственный носитель смысла
// (BRANDING §8, доступность).
type CalloutType = 'note' | 'tip' | 'important' | 'warn' | 'danger'

const props = withDefaults(defineProps<{
  type?: CalloutType
  title?: string
}>(), {
  type: 'note',
})

// color — тон полоски и подложки (catppuccin), text — цвет заголовка/иконки,
// затемнённый до контраста ≥ AA на светлой теме (BRANDING §8, см. vars.css).
const meta = {
  note: { icon: IconNote, label: 'Note', color: 'var(--c-note)', text: 'var(--c-note-text)' },
  tip: { icon: IconTip, label: 'Tip', color: 'var(--c-tip)', text: 'var(--c-tip-text)' },
  important: { icon: IconImportant, label: 'Important', color: 'var(--c-important)', text: 'var(--c-important-text)' },
  warn: { icon: IconWarn, label: 'Warning', color: 'var(--c-warn)', text: 'var(--c-warn-text)' },
  danger: { icon: IconDanger, label: 'Danger', color: 'var(--c-danger)', text: 'var(--c-danger-text)' },
} as const

const current = computed(() => meta[props.type] ?? meta.note)
const heading = computed(() => props.title ?? current.value.label)
</script>

<template>
  <div
    class="bear-callout my-4 rounded-r-lg pl-4 pr-4 py-3"
    :style="{
      borderLeft: `4px solid ${current.color}`,
      background: `color-mix(in srgb, ${current.color} 8%, var(--bg-elev))`,
    }"
  >
    <div class="flex items-center gap-2 mb-1 font-bold" :style="{ color: current.text }">
      <component :is="current.icon" class="text-[1.15em]" />
      <span>{{ heading }}</span>
    </div>
    <div class="bear-callout-body text-[0.95em]" :style="{ color: 'var(--fg)' }">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.bear-callout-body :deep(> :first-child) {
  margin-top: 0;
}
.bear-callout-body :deep(> :last-child) {
  margin-bottom: 0;
}
</style>
