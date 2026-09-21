---
theme: ./
title: Мишка на сервере — тема Slidev
info: |
  Демо-дек темы «Мишка на сервере».
  Технический скелет + тёплая подача.
favicon: /brand/favicon-light.svg
class: text-center
transition: slide-left
mdc: true
layout: cover
mascot: true
---

# Мишка на сервере

Тёплая инженерная тема для Slidev

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 p-1 rounded cursor-pointer" hover="bg-accent-400 bg-opacity-10">
    Пробел — дальше <carbon:arrow-right class="inline"/>
  </span>
</div>

---
layout: intro
---

# Зачем эта тема

Холодная инженерная база catppuccin, один акцент Sapphire, много воздуха.

Одинаково хорошо вытягивает **howto с десятью code-блоками** и **эссе про надёжность в диалоге с бизнесом**.

---
layout: section
mascot: true
---

<SectionNum>01</SectionNum>

# Раздел: с чего начать

---

<Kicker>01 · основы</Kicker>

# Список тезисов

Дефолтный лейаут — рабочая лошадка для контента.

- 🧊 **Холодная база** — catppuccin Latte на свету, Macchiato в темноте
- 🔷 **Один акцент** — Sapphire `#209fb5`, разложен в шкалу под роли
- 🔡 **PT Sans + JetBrains Mono** — self-hosted, кириллица, офлайн
- 🎨 **catppuccin** — код и UI на одних тонах
- ♿ **Доступность** — контрасты ≥ AA

> Здоровая доза mono уже есть: блоки кода, inline-код, `kbd`. Прозу — humanist sans.

---
layout: two-cols
---

# Две колонки

Слева — мысль, справа — код. Ядро Slidev даёт `two-cols` из коробки, тема его перекрашивает.

::right::

```ts
interface SLO {
  target: number      // 99.9
  window: '30d'
}

function burnRate(errors: number, budget: number) {
  return errors / budget
}
```

---
layout: code
---

# Код крупным планом

```go
package main

import "fmt"

// Лейаут `code` — для howto, где кода много и он главный.
func main() {
    services := []string{"api", "db", "cache"}
    for i, s := range services {
        fmt.Printf("%d: %s up\n", i, s)
    }
}
```

---
layout: image-right
image: https://picsum.photos/seed/bear-right/1920/1080
---

# Картинка справа

Текст слева, изображение справа. Проп `image:` во frontmatter.

```bash
kubectl get pods -A | grep -v Running
```

---
layout: image-left
image: https://picsum.photos/seed/bear-left/1920/1080
---

# Картинка слева

Зеркальный лейаут: изображение слева, текст справа.

---
layout: image
image: https://picsum.photos/seed/bear-full/1920/1080
dim: true
---

# Картинка во весь экран

Full-bleed с затемнением (`dim: true`) для читаемости текста поверх.

---

# Callouts — информация

Тихая семантика: тип различается цветом, иконкой и заголовком.

<Callout type="note">Нейтральная информация — контекст, ссылка, уточнение.</Callout>

<Callout type="tip">Совет или лучшая практика: настрой `font-display: swap`.</Callout>

<Callout type="important" title="Не пропусти">Важно не пропустить: цвет — не единственный носитель смысла.</Callout>

---

# Callouts — внимание

Уровень тревоги растёт от «осторожно» до «сломаешь прод».

<Callout type="warn">Осторожно: `provider: none` отключает автозагрузку шрифтов с Google.</Callout>

<Callout type="danger">Так можно сломать прод: не мержить обе темы в один media-query.</Callout>

---

# Типографика и элементы

## Заголовок второго уровня

Абзац тела на PT Sans. Ссылка ведёт на [sli.dev](https://sli.dev) — контраст ≥ AA в обеих темах.

| Клавиша | Действие |
| --- | --- |
| <kbd>space</kbd> / <kbd>→</kbd> | следующий шаг или слайд |
| <kbd>←</kbd> | назад |
| <kbd>f</kbd> | полноэкранный режим |

---

<Kicker>02 · компоненты</Kicker>

# Карточки

Подложка и рамка — как у блока кода: карточки и код читаются одной системой.

<div class="grid grid-cols-3 gap-4 mt-6">
<Card kicker="default" title="Контекст">Нейтральная карточка в сетке: факт, условие, вводная.</Card>
<Card kicker="accent" title="Вывод" tone="accent">Главное на слайде. Рамка и заголовок в Sapphire.</Card>
<Card kicker="danger" title="Так нельзя" tone="danger">Выдать агенту ключ на запись в боевую базу.</Card>
</div>

<Card class="mt-4" :to="1">

Карточка с `:to` — ссылка на слайд: номер или `routeAlias`. Эта ведёт на обложку.

</Card>

---

<Kicker>02 · компоненты</Kicker>

# График из данных

Один ряд, подписи слева, значение у конца столбца. `highlight` — столбец, о котором говорит слайд.

<BarChart
  class="mt-8"
  unit=" мин"
  :items="[
    { label: 'Обнаружение', value: 42, highlight: true },
    { label: 'Диагноз', value: 23 },
    { label: 'Починка', value: 25 },
    { label: 'Проверка', value: 9 },
  ]"
/>

---
layout: fact
---

# 99.95%

доступность за квартал

---
layout: big-metric
---

# 3 ✕ 9

бюджет ошибок на месяц ≈ 43 минуты

---
layout: statement
---

# Надёжность — это фича, а не отдел

---
layout: quote
---

> Первым SRE был Флинн из «Трона»: он жил внутри системы и чинил её изнутри.

*— из блога «Мишка на сервере»*

---
layout: 3-images
imageLeft: https://picsum.photos/seed/bear-a/900/1200
imageTopRight: https://picsum.photos/seed/bear-b/1200/700
imageBottomRight: https://picsum.photos/seed/bear-c/1200/700
---

---
layout: outro
logo: true
---

# Итоги

- Тема переносит бренд блога в слайды: цвет, шрифты, catppuccin, tone of voice
- Полный набор лейаутов — готов к конференции
- Callouts, футер со знаком, маскот в тёплых зонах

[jtprog.ru](https://jtprog.ru) · [github.com/jtprogru](https://github.com/jtprogru)

---
layout: questions
mascot: true
---
