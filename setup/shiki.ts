import { defineShikiSetup } from '@slidev/types'
import catppuccinLatte from 'tm-themes/themes/catppuccin-latte.json'
import catppuccinMacchiato from 'tm-themes/themes/catppuccin-macchiato.json'

/**
 * Подсветка кода темы «Мишка на сервере» (BRANDING §4, версия 0.2).
 *
 * catppuccin совпадает по температуре с холодным брендом и построен ровно
 * на тех же тонах, что и UI (Latte/Macchiato) — блок кода и интерфейс
 * становятся одной системой. Фон кода (base) выровнен с --bg-elev (см. vars.css),
 * чтобы блок не читался случайным сбоем оттенка.
 *
 * Темы не входят в bundled-набор Shiki у Slidev 0.47, поэтому подгружаем их
 * как TextMate-темы из пакета `tm-themes` (офлайн, без сети).
 */
export default defineShikiSetup(() => {
  return {
    themes: {
      light: catppuccinLatte as any,
      dark: catppuccinMacchiato as any,
    },
  }
})
