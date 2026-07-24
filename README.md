# slidev-theme-bear

[![NPM version](https://img.shields.io/npm/v/slidev-theme-bear?color=209fb5&label=)](https://www.npmjs.com/package/slidev-theme-bear)

Тема **«Мишка на сервере»** для [Slidev](https://github.com/slidevjs/slidev): технический скелет + тёплая подача. Холодная приглушённая палитра catppuccin (Latte/Macchiato), один акцент Sapphire, catppuccin-подсветка кода, PT Sans + JetBrains Mono (self-hosted, кириллица), доступность ≥ AA. Теплота бренда живёт в маскоте и голосе, а не в цвете. Перенос [дизайн-кода блога jtprog.ru](https://jtprog.ru) в формат слайдов.

## Установка

Добавь во frontmatter `slides.md`:

<pre><code>---
theme: <b>bear</b>
---</code></pre>

Slidev предложит установить тему автоматически. Подробнее — [как использовать тему](https://sli.dev/themes/use).

## Лейауты

Тема расширяет встроенный набор Slidev (`default`, `center`, `two-cols`, `two-cols-header`, `full` перекрашены под бренд) своими лейаутами:

| Лейаут | Назначение | Особые опции |
| --- | --- | --- |
| `cover` | Обложка (тёплая зона) | `mascot: true` — показать маскота |
| `intro` / `intro-image` / `intro-image-right` | Вводные слайды | `image:` |
| `section` | Разделитель | `mascot: true` |
| `bullets` | Список тезисов | — |
| `code` | Код крупным планом (howto) | — |
| `image-right` / `image-left` | Текст + картинка сбоку | `image:` |
| `image` | Картинка во весь экран | `image:`, `dim: true` |
| `3-images` | Три изображения | `imageLeft:`, `imageTopRight:`, `imageBottomRight:` |
| `fact` / `big-metric` | Крупная цифра/факт | — |
| `statement` | Одна мысль на весь экран | — |
| `quote` | Цитата | — |
| `outro` | Итоги, ссылки, контакты | — |
| `questions` | «Вопросы?» (тёплая зона) | `mascot: true` (по умолчанию) |

## Компоненты

Автоимпортируются, доступны в любом слайде без импорта:

- **`<Callout type="…" title="…">`** — семантические callouts: `note`, `tip`, `important`, `warn`, `danger`. Каждый тип различается цветом, иконкой и заголовком (цвет — не единственный носитель смысла).
- **`<BearMark :size="24" />`** — знак (mark): упрощённый медведь для футера/шапки/мелких размеров.
- **`<Mascot :size="200" />`** — маскот: живой медведь для тёплых зон (обложка, разделы, QA).

Футер (`global-top.vue`) со знаком, названием доклада и номером слайда показывается на контентных слайдах и скрывается на титульных/тёплых.

## Цвет

Один холодный акцент Sapphire на приглушённой базе catppuccin (Latte на свету, Macchiato в темноте). Токены объявлены в `styles/vars.css` (свет/тьма), проброшены в UnoCSS через `uno.config.ts` (`bg-elev`, `text-ink`, `text-muted`, `border-hair`, `text-accent-700`, `text-link` …).

| Токен | Роль |
| --- | --- |
| `--accent-300/400/600/700` | Акцентная шкала Sapphire: `400` — декор, `700`/`300` — текст ссылок (AA) |
| `--bg` / `--bg-elev` | Фон страницы (crust) / карточки и код (base) |
| `--fg` / `--fg-muted` | Текст / мета |
| `--border` | Разделители |
| `--c-note/tip/important/warn/danger` | Семантика callouts (Lavender/Green/Mauve/Peach/Red) |

Переопределить акцент можно через `themeConfig` в headmatter: `themeConfig: { primary: '#209fb5' }`.

## Шрифты

Self-hosted (офлайн-показ, OFL, кириллица): **PT Sans** (тело) + **JetBrains Mono** (код) через `@fontsource/*`, `provider: none` — Slidev не ходит в Google Fonts.

## Код

Подсветка — **catppuccin** (`catppuccin-latte` / `catppuccin-macchiato`) через `setup/shiki.ts`. Построена ровно на тех же тонах, что и UI: блок кода и интерфейс — одна система, а не два соседа.

## Замена бренд-ассетов

Плейсхолдеры лежат в `public/` — замени своими:

- `public/mark.svg` — знак (для футера, `<BearMark>`)
- `public/logo.svg` — знак + словесный знак
- `public/mascot.svg` — маскот (для `<Mascot>`)

## Разработка

- `npm install`
- `npm run dev` — превью `example.md` (демонстрирует все лейауты, callouts, код)
- `npm run export` — PDF
- `npm run screenshot` — PNG
