<script setup lang="ts">
import Link from '@slidev/client/builtin/Link.vue'

// Карточка контента: подложка --bg-elev и волосяная рамка, как у блоков кода
// темы, чтобы карточки и код читались одной системой.
//
// tone:
//   default — нейтральная карточка в сетке;
//   accent  — вывод, главное на слайде (рамка и заголовок в Sapphire);
//   danger  — то, чего делать нельзя (тон --c-danger, как у Callout type="danger").
//
// to — превращает карточку в ссылку на слайд: номер или routeAlias.
// Link импортируем явно: в <component :is> строковое имя не резолвится.
const props = withDefaults(defineProps<{
  title?: string
  kicker?: string
  tone?: 'default' | 'accent' | 'danger'
  to?: string | number
}>(), {
  tone: 'default',
})

const isLink = props.to !== undefined
</script>

<template>
  <component
    :is="isLink ? Link : 'div'"
    v-bind="isLink ? { to: props.to } : {}"
    class="bear-card"
    :class="[`bear-card--${props.tone}`, { 'bear-card--link': isLink }]"
  >
    <div v-if="props.kicker" class="bear-card__kicker font-mono text-xs font-bold tracking-wider">
      {{ props.kicker }}
    </div>
    <div v-if="props.title" class="bear-card__title">
      {{ props.title }}
    </div>
    <div class="bear-card__body">
      <slot />
    </div>
  </component>
</template>

<style scoped>
.bear-card {
  display: block;
  padding: 1rem 1.25rem;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--bg-elev);
  color: var(--fg);
}

.bear-card--accent {
  border-color: var(--accent-400);
  background: color-mix(in srgb, var(--accent-400) 7%, var(--bg-elev));
}

.bear-card--danger {
  border-color: color-mix(in srgb, var(--c-danger) 40%, var(--border));
  background: color-mix(in srgb, var(--c-danger) 8%, var(--bg-elev));
}

.bear-card__kicker {
  margin-bottom: 0.4rem;
  color: var(--fg-muted);
}

.bear-card__title {
  margin-bottom: 0.4rem;
  font-size: 1.15em;
  font-weight: 700;
  line-height: 1.3;
}

.bear-card__body {
  font-size: 0.92em;
  line-height: 1.5;
  color: var(--fg-muted);
}

.bear-card--accent .bear-card__kicker,
.bear-card--accent .bear-card__title {
  color: var(--accent-700);
}

html.dark .bear-card--accent .bear-card__kicker,
html.dark .bear-card--accent .bear-card__title {
  color: var(--accent-300);
}

.bear-card--danger .bear-card__kicker,
.bear-card--danger .bear-card__title {
  color: var(--c-danger-text);
}

.bear-card--accent .bear-card__body,
.bear-card--danger .bear-card__body {
  color: var(--fg);
}

.bear-card__body :deep(> :first-child) {
  margin-top: 0;
}

.bear-card__body :deep(> :last-child) {
  margin-bottom: 0;
}

.bear-card__body :deep(p) {
  margin: 0.6em 0;
}

.bear-card__body :deep(li) {
  line-height: 1.8;
}

/* Карточка-ссылка: тема красит все <a> в цвет ссылки с пунктиром снизу,
   карточке это не нужно — кликабельность показывает hover рамки. */
.bear-card.bear-card--link {
  color: var(--fg);
  border-style: solid;
  border-width: 1px;
  transition: border-color 0.15s ease;
}

.bear-card.bear-card--link:hover {
  border-color: var(--accent-400);
}
</style>
