#!/usr/bin/env node
/*
 * Проверка контрастности бренд-токенов ≥ WCAG AA (BRANDING §8).
 *
 * Читает реальные значения из styles/vars.css (:root — light, html.dark — dark),
 * резолвит var(...)-ссылки и считает WCAG contrast ratio для каждой текстовой
 * пары «цвет текста / фон». Падает с кодом 1, если хоть одна пара ниже порога.
 *
 * Зависимостей нет намеренно: формула WCAG детерминирована, а лишний npm-пакет
 * в CI маленькой темы не нужен. Значения совпадают с WebAIM Contrast Checker
 * (округление до 2 знаков).
 *
 *   node scripts/check-contrast.mjs
 */
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const AA_NORMAL = 4.5 // обычный текст (крупный/жирный порог — 3.0, здесь не нужен)

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const css = readFileSync(resolve(root, 'styles/vars.css'), 'utf8')

/** Вытащить объявления `--token: value;` из указанного CSS-блока по селектору. */
function parseBlock(selector) {
  const re = new RegExp(`${selector}\\s*\\{([^}]*)\\}`, 's')
  const body = css.match(re)?.[1] ?? ''
  const vars = {}
  for (const m of body.matchAll(/(--[\w-]+)\s*:([^;]+);/g))
    vars[m[1].trim()] = m[2].trim()
  return vars
}

const rootVars = parseBlock(':root')
const darkVars = { ...rootVars, ...parseBlock('html\\.dark') } // dark наследует и переопределяет root

/** Резолвит var(--x) в конкретный #hex внутри темы (с фоллбэком на :root). */
function resolveColor(value, vars) {
  let v = value.trim()
  let guard = 0
  while (v.startsWith('var(') && guard++ < 10) {
    const name = v.slice(4, v.indexOf(')')).trim()
    v = (vars[name] ?? rootVars[name] ?? '').trim()
  }
  return v
}

function toRgb(hex) {
  const h = hex.replace('#', '')
  const n = h.length === 3 ? h.split('').map(c => c + c).join('') : h
  return [0, 2, 4].map(i => Number.parseInt(n.slice(i, i + 2), 16))
}

function relLuminance(hex) {
  const [r, g, b] = toRgb(hex).map((c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(fg, bg) {
  const l1 = relLuminance(fg)
  const l2 = relLuminance(bg)
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1]
  return (hi + 0.05) / (lo + 0.05)
}

// Текстовые пары «цвет текста → фон». Декоративные роли (полоски callout,
// бордеры, accent-400/600) не текст и намеренно не проверяются.
const commonPairs = [
  ['--fg', '--bg', 'основной текст / фон страницы'],
  ['--fg', '--bg-elev', 'основной текст / карточка'],
  ['--fg-muted', '--bg', 'приглушённый текст / фон страницы'],
  ['--fg-muted', '--bg-elev', 'приглушённый текст / карточка'],
  ['--c-note-text', '--bg-elev', 'callout note (заголовок)'],
  ['--c-tip-text', '--bg-elev', 'callout tip (заголовок)'],
  ['--c-important-text', '--bg-elev', 'callout important (заголовок)'],
  ['--c-warn-text', '--bg-elev', 'callout warn (заголовок)'],
  ['--c-danger-text', '--bg-elev', 'callout danger (заголовок)'],
]
// Ссылки: на светлой теме — accent-700, на тёмной — accent-300 (см. text-link).
const lightPairs = [
  ['--accent-700', '--bg', 'ссылка / фон страницы'],
  ['--accent-700', '--bg-elev', 'ссылка / карточка'],
]
const darkPairs = [
  ['--accent-300', '--bg', 'ссылка / фон страницы'],
  ['--accent-300', '--bg-elev', 'ссылка / карточка'],
]

const themes = [
  { name: 'light (Latte)', vars: rootVars, pairs: [...commonPairs, ...lightPairs] },
  { name: 'dark (Macchiato)', vars: darkVars, pairs: [...commonPairs, ...darkPairs] },
]

let failed = 0
for (const theme of themes) {
  console.log(`\n=== ${theme.name} ===`)
  for (const [fgTok, bgTok, label] of theme.pairs) {
    const fg = resolveColor(theme.vars[fgTok], theme.vars)
    const bg = resolveColor(theme.vars[bgTok], theme.vars)
    if (!/^#[0-9a-f]{3,6}$/i.test(fg) || !/^#[0-9a-f]{3,6}$/i.test(bg)) {
      console.log(`  ⚠ ${label}: не удалось резолвить (${fgTok}=${fg}, ${bgTok}=${bg})`)
      failed++
      continue
    }
    const ratio = contrast(fg, bg)
    const ok = ratio >= AA_NORMAL
    if (!ok)
      failed++
    console.log(
      `  ${ok ? '✓' : '✗'} ${label.padEnd(34)} ${fg} on ${bg}  ${ratio.toFixed(2)}:1`
      + `${ok ? '' : `  < ${AA_NORMAL} AA`}`,
    )
  }
}

if (failed) {
  console.error(`\n✗ ${failed} пар(а) ниже WCAG AA (${AA_NORMAL}:1). Правь styles/vars.css.`)
  process.exit(1)
}
console.log(`\n✓ Все текстовые пары ≥ WCAG AA (${AA_NORMAL}:1).`)
