<script setup lang="ts">
import { computed } from 'vue'

// Горизонтальный bar chart из одного ряда: подписи категорий слева, значение
// у конца столбца. Горизонтальный — потому что русские подписи этапов длинные
// и в колонках под осью X не помещаются без поворота.
//
// Один ряд — одна «тихая» заливка --chart-neutral; highlight переводит столбец,
// о котором говорит слайд, в акцент. Оба тона держат ≥ 3:1 к фону страницы и к
// карточке в обеих темах — это проверяет scripts/check-contrast.mjs. Выделенный
// столбец отличается не только цветом: его подпись и значение жирные. Значение
// подписано у каждого столбца, поэтому легенда и ось Y не нужны.
interface Bar {
  label: string
  value: number
  highlight?: boolean
}

const props = withDefaults(defineProps<{
  items: Bar[]
  max?: number
  unit?: string
}>(), {
  unit: '',
})

const max = computed(() => props.max ?? Math.max(...props.items.map(i => i.value)))

// Место под подпись значения у конца столбца резервируем заранее, чтобы
// самый длинный столбец не упирался в край и подпись не обрезалась.
function width(value: number) {
  return `calc((100% - 5.5rem) * ${value / max.value})`
}

const summary = computed(() =>
  props.items.map(i => `${i.label}: ${i.value}${props.unit}`).join(', '),
)
</script>

<template>
  <figure class="bear-bars m-0" role="img" :aria-label="summary">
    <div
      v-for="item in props.items"
      :key="item.label"
      class="bear-bars__row"
      :class="{ 'is-highlight': item.highlight }"
    >
      <!-- у строки display: contents и нет своего бокса, поэтому подсказку вешаем на ячейки -->
      <span class="bear-bars__label" :title="`${item.label}: ${item.value}${props.unit}`">{{ item.label }}</span>
      <span class="bear-bars__track" :title="`${item.label}: ${item.value}${props.unit}`">
        <span class="bear-bars__bar" :style="{ width: width(item.value) }" />
        <span class="bear-bars__value tabular-nums">{{ item.value }}{{ props.unit }}</span>
      </span>
    </div>
  </figure>
</template>

<style scoped>
.bear-bars {
  --bar: var(--chart-neutral);
  --bar-hl: var(--accent-700);

  display: grid;
  grid-template-columns: max-content 1fr;
}

html.dark .bear-bars {
  --bar-hl: var(--accent-300);
}

.bear-bars__row {
  display: contents;
}

.bear-bars__label {
  padding: 0.7rem 1rem 0.7rem 0;
  text-align: right;
  line-height: 24px;
  color: var(--fg-muted);
}

/* Базовая линия — волосяная граница слева у трека; строки идут без зазора,
   поэтому она непрерывна по всей высоте графика. */
.bear-bars__track {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.7rem 0;
  border-left: 1px solid var(--border);
}

.bear-bars__bar {
  display: block;
  height: 24px;
  border-radius: 0 4px 4px 0;
  background: var(--bar);
}

.bear-bars__value {
  color: var(--fg);
  white-space: nowrap;
}

.is-highlight .bear-bars__label,
.is-highlight .bear-bars__value {
  font-weight: 700;
  color: var(--fg);
}

.is-highlight .bear-bars__bar {
  background: var(--bar-hl);
}
</style>
