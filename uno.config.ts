import { defineConfig } from 'unocss'

/**
 * UnoCSS-конфиг темы «Мишка на сервере».
 *
 * Пробрасывает бренд-токены (объявленные в styles/vars.css как CSS-переменные)
 * в утилиты UnoCSS, чтобы в лейаутах/компонентах можно было писать
 * `bg-elev`, `text-ink`, `text-muted`, `border-hair`, `text-accent-700` и т.п.
 * Значения — это `var(--…)`, поэтому свет/тьма переключаются автоматически
 * вместе с `html.dark` (см. BRANDING §2).
 */
export default defineConfig({
  theme: {
    colors: {
      // тёплый янтарный акцент — одна шкала на всю тему (BRANDING §2)
      accent: {
        300: 'var(--accent-300)',
        400: 'var(--accent-400)',
        600: 'var(--accent-600)',
        700: 'var(--accent-700)',
        DEFAULT: 'var(--accent-400)',
      },
      // холодно-нейтральная база
      paper: 'var(--bg)',        // фон страницы
      elev: 'var(--bg-elev)',    // карточки, подложки, код
      ink: 'var(--fg)',          // основной текст
      muted: 'var(--fg-muted)',  // мета, подписи, номера
      hair: 'var(--border)',     // разделители, рамки
      // семантика callouts
      note: 'var(--c-note)',
      tip: 'var(--c-tip)',
      important: 'var(--c-important)',
      warn: 'var(--c-warn)',
      danger: 'var(--c-danger)',
    },
  },
  shortcuts: {
    // ссылка/акцент-текст с корректным контрастом в обеих темах (BRANDING §8)
    'text-link': 'text-accent-700 dark:text-accent-300',
  },
})
