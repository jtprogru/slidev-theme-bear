<script setup lang="ts">
import Link from '@slidev/client/builtin/Link.vue'
import { computed, useId } from 'vue'

// Простая схема потока слева направо: данные лежат в слайде, картинка не нужна.
//
// nodes — колонки по порядку. Колонка — один узел или массив узлов (стопка).
// Одиночный узел рисуется карточкой (label + note), узлы стопки — плашками
// в одну строку (label + tag справа). Узел — строка или объект:
//   { label, note?, tag?, tone?: 'default' | 'accent' | 'danger', to? }
// to делает узел ссылкой на слайд (номер или routeAlias), рамка — пунктиром.
//
// edges[i] — ребро между колонками i и i+1: строка-подпись или объект
//   { label?, dashed?, tone?: 'accent' | 'muted' }.
// Не указано — сплошная акцентная стрелка без подписи. n → 1 сходится шиной,
// 1 → n расходится, n → m идёт через общую шину.
//
// Геометрия считается без замеров DOM: высота плашки ROW и зазор GAP должны
// совпадать со стилями .bear-flow__chip, а всё остальное центрируется по
// вертикали вместе с рёбрами. Поэтому схема одинаково рисуется в dev, в
// экспорте и в печати, где слайды масштабированы.
type Tone = 'default' | 'accent' | 'danger'

interface FlowNode {
  label: string
  note?: string
  tag?: string
  tone?: Tone
  to?: string | number
}

interface FlowEdge {
  label?: string
  dashed?: boolean
  tone?: 'accent' | 'muted'
}

type NodeInput = string | FlowNode
type EdgeInput = string | FlowEdge | null | undefined

const props = defineProps<{
  nodes: (NodeInput | NodeInput[])[]
  edges?: EdgeInput[]
}>()

const ROW = 34
const GAP = 8
const STUB = 24 // отступ шины от стопки
const MIN_SEG = 48 // самый короткий участок со стрелкой
const CHAR = 7.2 // ширина знака моноширинной подписи в 12px
const LABEL_PAD = 12

const columns = computed(() => props.nodes.map(col =>
  (Array.isArray(col) ? col : [col]).map(n => typeof n === 'string' ? { label: n } : n),
))

const edges = computed(() => columns.value.slice(1).map((_, i): FlowEdge => {
  const e = props.edges?.[i]
  if (e == null)
    return {}
  return typeof e === 'string' ? { label: e || undefined } : e
}))

const stackHeight = (n: number) => n * ROW + (n - 1) * GAP

// Центры узлов колонки в координатах ребра высотой h. Одиночный узел и стопка
// центрируются по вертикали так же, как их выравнивает flex-строка.
function centers(n: number, h: number) {
  if (n === 1)
    return [h / 2]
  const top = (h - stackHeight(n)) / 2
  return Array.from({ length: n }, (_, i) => top + ROW / 2 + i * (ROW + GAP))
}

interface Geometry {
  w: number
  h: number
  lines: string[]
  arrows: string[]
  label?: { x: number, y: number, text: string }
}

function geometry(a: number, b: number, edge: FlowEdge): Geometry {
  const h = Math.max(stackHeight(a), stackHeight(b))
  const left = centers(a, h)
  const right = centers(b, h)
  const text = edge.label
  const seg = Math.max(MIN_SEG, text ? text.length * CHAR + 2 * LABEL_PAD : 0)
  const all = [...left, ...right]
  const bus = (x: number) => `M${x},${Math.min(...all)} V${Math.max(...all)}`

  if (a === 1 && b === 1) {
    const y = h / 2
    return { w: seg, h, lines: [], arrows: [`M0,${y} H${seg - 1}`], label: text ? { x: seg / 2, y: y - 7, text } : undefined }
  }

  if (b === 1) {
    const w = STUB + seg
    const y = right[0]
    return {
      w,
      h,
      lines: [...left.map(ly => `M0,${ly} H${STUB}`), bus(STUB)],
      arrows: [`M${STUB},${y} H${w - 1}`],
      label: text ? { x: STUB + seg / 2, y: y - 7, text } : undefined,
    }
  }

  if (a === 1) {
    const w = seg + STUB
    const y = left[0]
    return {
      w,
      h,
      lines: [`M0,${y} H${seg}`, bus(seg)],
      arrows: right.map(ry => `M${seg},${ry} H${w - 1}`),
      label: text ? { x: seg / 2, y: y - 7, text } : undefined,
    }
  }

  const w = Math.max(2 * STUB, text ? text.length * CHAR + 2 * LABEL_PAD : 0)
  const x = w / 2
  return {
    w,
    h,
    lines: [...left.map(ly => `M0,${ly} H${x}`), bus(x)],
    arrows: right.map(ry => `M${x},${ry} H${w - 1}`),
    label: text ? { x, y: Math.min(...all) - 9, text } : undefined,
  }
}

const connectors = computed(() => edges.value.map((edge, i) => ({
  edge,
  ...geometry(columns.value[i].length, columns.value[i + 1].length, edge),
})))

const uid = useId().replace(/\W/g, '-')

// Схема для скринридера: SVG с рёбрами скрыт, подписи рёбер уходят сюда.
const summary = computed(() => columns.value.map((col, i) => {
  const names = col.map(n => n.label).join(', ')
  if (i === 0)
    return names
  const label = edges.value[i - 1].label
  return `${label ? `→ ${label} →` : '→'} ${names}`
}).join(' '))
</script>

<template>
  <figure class="bear-flow m-0">
    <div class="bear-flow__row">
      <template v-for="(col, i) in columns" :key="i">
        <svg
          v-if="i > 0"
          class="bear-flow__edge"
          :class="[`is-${connectors[i - 1].edge.tone ?? 'accent'}`, { 'is-dashed': connectors[i - 1].edge.dashed }]"
          :width="connectors[i - 1].w"
          :height="connectors[i - 1].h"
          :viewBox="`0 0 ${connectors[i - 1].w} ${connectors[i - 1].h}`"
          aria-hidden="true"
        >
          <defs>
            <marker :id="`${uid}-${i}`" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" class="bear-flow__head" />
            </marker>
          </defs>
          <path v-for="d in connectors[i - 1].lines" :key="d" :d="d" class="bear-flow__line" />
          <path
            v-for="d in connectors[i - 1].arrows"
            :key="d"
            :d="d"
            class="bear-flow__line"
            :marker-end="`url(#${uid}-${i})`"
          />
          <text
            v-if="connectors[i - 1].label"
            class="bear-flow__label font-mono"
            :x="connectors[i - 1].label!.x"
            :y="connectors[i - 1].label!.y"
            text-anchor="middle"
          >{{ connectors[i - 1].label!.text }}</text>
        </svg>

        <div class="bear-flow__col" :style="col.length > 1 ? { gap: `${GAP}px` } : {}">
          <component
            :is="node.to !== undefined ? Link : 'div'"
            v-for="(node, j) in col"
            :key="j"
            v-bind="node.to !== undefined ? { to: node.to } : {}"
            class="bear-flow__node"
            :class="[
              col.length > 1 ? 'bear-flow__chip' : 'bear-flow__box',
              `is-${node.tone ?? 'default'}`,
              { 'is-link': node.to !== undefined },
            ]"
          >
            <template v-if="col.length > 1">
              <span>{{ node.label }}</span>
              <span v-if="node.tag" class="bear-flow__tag font-mono text-xs font-bold">{{ node.tag }}</span>
            </template>
            <template v-else>
              <div class="bear-flow__title">
                {{ node.label }}
              </div>
              <div v-if="node.note" class="bear-flow__note font-mono text-xs">
                {{ node.note }}
              </div>
            </template>
          </component>
        </div>
      </template>
    </div>
    <figcaption class="sr-only">
      {{ summary }}
    </figcaption>
  </figure>
</template>

<style scoped>
.bear-flow {
  --flow-accent: var(--accent-700);
}

html.dark .bear-flow {
  --flow-accent: var(--accent-300);
}

.bear-flow__row {
  display: flex;
  align-items: center;
  justify-content: center;
}

.bear-flow__col {
  display: flex;
  flex-direction: column;
}

.bear-flow__node {
  border: 1px solid var(--border);
  background: var(--bg-elev);
  color: var(--fg);
}

/* Высота плашки = ROW в скрипте: по ней считаются концы рёбер. */
.bear-flow__chip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  height: 34px;
  padding: 0 0.9rem;
  border-radius: 8px;
  font-size: 0.95em;
  white-space: nowrap;
}

.bear-flow__box {
  min-width: 8rem;
  max-width: 16rem;
  padding: 1.1rem 1.25rem;
  border-radius: 10px;
  text-align: center;
}

.bear-flow__title {
  font-size: 1.15em;
  font-weight: 700;
  line-height: 1.3;
}

.bear-flow__note {
  margin-top: 0.35rem;
  color: var(--fg-muted);
}

.bear-flow__tag {
  color: var(--flow-accent);
}

.bear-flow__node.is-accent {
  border-color: var(--accent-400);
  background: color-mix(in srgb, var(--accent-400) 7%, var(--bg-elev));
}

.bear-flow__node.is-accent .bear-flow__title {
  color: var(--flow-accent);
}

.bear-flow__node.is-danger {
  border-color: color-mix(in srgb, var(--c-danger) 40%, var(--border));
  background: color-mix(in srgb, var(--c-danger) 8%, var(--bg-elev));
}

.bear-flow__node.is-danger .bear-flow__title {
  color: var(--c-danger-text);
}

/* Тема красит <a> цветом ссылки с пунктиром снизу — здесь ссылка выглядит
   как узел, а кликабельность выдаёт пунктирная акцентная рамка. */
.bear-flow__node.is-link {
  color: var(--fg);
  border: 1px dashed var(--accent-400);
  transition: background 0.15s ease;
}

.bear-flow__node.is-link:hover {
  background: color-mix(in srgb, var(--accent-400) 10%, var(--bg-elev));
}

.bear-flow__edge {
  flex-shrink: 0;
  overflow: visible;
}

.bear-flow__edge.is-accent {
  color: var(--flow-accent);
}

.bear-flow__edge.is-muted {
  color: var(--fg-muted);
}

.bear-flow__line {
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
}

.bear-flow__head,
.bear-flow__label {
  fill: currentColor;
}

.bear-flow__label {
  font-size: 12px;
}

.bear-flow__edge.is-dashed .bear-flow__line {
  stroke-dasharray: 7 6;
  animation: bear-flow-march 1.2s linear infinite;
}

@keyframes bear-flow-march {
  to {
    stroke-dashoffset: -13;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bear-flow__edge.is-dashed .bear-flow__line {
    animation: none;
  }
}
</style>
