#!/usr/bin/env node
// Тянет айдентику из пакета @jtprogru/mishka-ds в тему. Единственный источник
// правды — brand/ дизайн-системы, здесь только производные. Руками в
// public/brand/ и components/brandAssets.ts не лезем: скрипт их перезапишет.
//
// Запускается сам в `prepare`, то есть на каждом `npm install` / `npm ci` и
// перед `npm publish`. Обновить айдентику = `npm update @jtprogru/mishka-ds`.
// Разошедшиеся файлы ловит CI: после установки `git diff --exit-code`.
//
// Локальный чекаут дизайн-системы вместо node_modules:
//   MISHKA_DS=../mishka-ds npm run brand:sync

import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

// Копируются как файлы в public/brand/ — доступны по URL `/brand/<name>` из
// frontmatter, markdown и <img>. Фавиконы иначе никак: их подключают строкой.
const COPY = [
  'mark.svg',
  'logo.svg',
  'mascot.svg',
  'favicon-light.svg',
  'favicon-dark.svg',
]

// Знак и логотип залиты `currentColor` и наследуют цвет текста — но только если
// лежат в DOM. Внутри <img> currentColor резолвится в чёрный, и на тёмной теме
// медведь исчезает. Поэтому для них дополнительно генерится модуль со строками:
// компоненты вставляют их инлайном через v-html.
const INLINE = ['mark.svg', 'logo.svg']

// XML запрещает `--` внутри комментария. mishka-ds этого не соблюдает: в шапке
// mascot.svg генератор пишет имена токенов (`--c-warn-text`, `--bg`), и файл
// перестаёт быть well-formed. HTML-парсер такое проглатывает, поэтому знак и
// логотип, которые вставляются инлайном, живут; а <img src="mascot.svg"> уже
// нет — Chromium парсит SVG строго как XML и показывает битую картинку.
// Чиним на копировании: комментарии здесь не несут смысла для рантайма.
// Настоящее место правки — scripts/gen-mark-geometry.mjs в дизайн-системе.
function repairXmlComments(svg) {
  let repaired = false
  const out = svg.replace(/<!--([\s\S]*?)-->/g, (whole, body) => {
    if (!body.includes('--'))
      return whole
    repaired = true
    return `<!--${body.replace(/-{2,}/g, '-')}-->`
  })
  return { out, repaired }
}

function findSource() {
  const candidates = [
    process.env.MISHKA_DS && resolve(process.env.MISHKA_DS, 'brand'),
    join(root, 'node_modules/@jtprogru/mishka-ds/brand'),
  ].filter(Boolean)

  for (const dir of candidates) {
    try {
      readdirSync(dir)
      return dir
    }
    catch {}
  }
  return null
}

function sourceVersion(brandDir) {
  try {
    const pkg = JSON.parse(readFileSync(resolve(brandDir, '../package.json'), 'utf8'))
    return `${pkg.name}@${pkg.version}`
  }
  catch {
    return '@jtprogru/mishka-ds (версия не определена)'
  }
}

const src = findSource()
if (!src) {
  // Не валим установку: без дизайн-системы тема всё равно собирается, просто
  // без медведя. Сообщение важнее падения — это девзависимость, не рантайм.
  console.warn(
    '[brand] @jtprogru/mishka-ds не найден — айдентика не обновлена.\n'
    + '        npm install, либо MISHKA_DS=../mishka-ds npm run brand:sync',
  )
  process.exit(0)
}

const version = sourceVersion(src)
const outDir = join(root, 'public/brand')

rmSync(outDir, { recursive: true, force: true })
mkdirSync(outDir, { recursive: true })

const raw = new Map()
const repairedFiles = []
for (const name of COPY) {
  const { out, repaired } = repairXmlComments(readFileSync(join(src, name), 'utf8'))
  if (repaired)
    repairedFiles.push(name)
  raw.set(name, out)
  writeFileSync(join(outDir, name), out)
}

const ident = name => name.replace(/\.svg$/, '').replace(/-(\w)/g, (_, c) => c.toUpperCase())

const module = `// СГЕНЕРИРОВАНО scripts/sync-brand.mjs из ${version} — не править руками.
// Знак и логотип нужны инлайном в DOM: их заливка — currentColor, внутри <img>
// она не работает. Файловые копии тех же ассетов лежат в public/brand/.
${INLINE.map(name => `
export const ${ident(name)}Svg = ${JSON.stringify(raw.get(name))}
`).join('')}`

writeFileSync(join(root, 'components/brandAssets.ts'), module)

writeFileSync(
  join(outDir, 'SOURCE.md'),
  `# public/brand — сгенерировано\n\n`
  + `Источник: ${version}, папка \`brand/\`. Обновляется \`npm run brand:sync\` `
  + `(и сам собой в \`prepare\`). Правки здесь затираются — менять надо артворк `
  + `\`brand/mishka-mark-source.svg\` в дизайн-системе.\n\n`
  + `Знак, логотип, маскот и фавиконы — раздел 2 лицензии mishka-ds, все права `
  + `защищены. Форк темы обязан заменить их на свои.\n`,
)

console.log(`[brand] ${COPY.length} файлов из ${version} → public/brand/, инлайн → components/brandAssets.ts`)

if (repairedFiles.length) {
  console.warn(
    `[brand] починены XML-комментарии: ${repairedFiles.join(', ')}.\n`
    + '        Источник не well-formed XML — чинить в gen-mark-geometry.mjs дизайн-системы.',
  )
}
