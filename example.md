---
theme: ./
title: Мишка на сервере — тема Slidev
info: |
  Демо-дек темы «Мишка на сервере».
  Технический скелет + тёплая подача.
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

Холодная инженерная база, один тёплый акцент, много воздуха.

Одинаково хорошо вытягивает **howto с десятью code-блоками** и **эссе про надёжность в диалоге с бизнесом**.

---
layout: section
mascot: true
---

# Раздел: с чего начать

---

# Список тезисов

Дефолтный лейаут — рабочая лошадка для контента.

- 🧊 **Холодная база** — off-white на свету, сине-графит в темноте
- 🔶 **Один акцент** — янтарный `#fb923c`, разложен в шкалу под роли
- 🔡 **PT Sans + JetBrains Mono** — self-hosted, кириллица, офлайн
- 🎨 **gruvbox** — подсветка кода в цвет бренда
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
---

# Итоги

- Тема переносит бренд блога в слайды: цвет, шрифты, gruvbox, tone of voice
- Полный набор лейаутов — готов к конференции
- Callouts, футер со знаком, маскот в тёплых зонах

[jtprog.ru](https://jtprog.ru) · [github.com/jtprogru](https://github.com/jtprogru)

---
layout: questions
mascot: true
---
