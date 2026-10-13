<script setup lang="ts">
import { useNav } from '@slidev/client'
import { injectionSlidevContext } from '@slidev/client/constants.ts'
import { computed, inject } from 'vue'

// Футер на каждом слайде (BRANDING §6): знак (не маскот) слева, название
// доклада, номер слайда справа. Приглушён и pointer-events-none, чтобы не
// мешать контенту.
//
// Скрываем на «тёплых»/титульных лейаутах — там работают маскот и крупный
// текст, а знак в шапке не нужен (BRANDING §1: маскот ≠ знак).
// `$slidev` авто-инъектится Slidev в каждый <script setup> глобально, поэтому
// локальную переменную нельзя называть `$slidev` (в Slidev 52 это ломает сборку:
// "Identifier '$slidev' has already been declared"). Берём контекст в `slidev`.
const slidev = inject(injectionSlidevContext)

const hiddenOn = new Set([
  'cover',
  'intro',
  'intro-image',
  'intro-image-right',
  'section',
  'statement',
  'fact',
  'big-metric',
  'quote',
  'questions',
  'outro',
  'end',
  'full',
])

const hidden = computed(() => hiddenOn.has(slidev?.nav.currentLayout as string))
const title = computed(() => (slidev?.configs as any)?.title ?? '')

// При экспорте с `--with-clicks` каждый клик уезжает на отдельную страницу, а
// номер считает слайды: один и тот же «3 / 37» повторялся бы на всех страницах
// слайда. В таком экспорте номер прячем, в обычном PDF он остаётся.
// Флаг берём из `useNav()`: у print-слайда свой урезанный `nav`, и
// `isPrintWithClicks` в `$slidev.nav` там нет.
const { isPrintWithClicks } = useNav()
</script>

<template>
  <footer
    v-if="!hidden"
    class="bear-footer absolute bottom-0 left-0 right-0 px-16 pb-3
           flex items-center gap-3 text-xs select-none pointer-events-none z-10"
    :style="{ color: 'var(--fg-muted)' }"
  >
    <BearMark :size="18" class="opacity-90" />
    <span v-if="title" class="truncate">{{ title }}</span>
    <span v-if="!isPrintWithClicks" class="ml-auto tabular-nums">{{ $slidev?.nav.currentPage }} / {{ $slidev?.nav.total }}</span>
  </footer>
</template>
