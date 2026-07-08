import { defineShikiSetup } from '@slidev/types'
import gruvboxLight from 'tm-themes/themes/gruvbox-light-medium.json'
import gruvboxDark from 'tm-themes/themes/gruvbox-dark-medium.json'

/**
 * Подсветка кода темы «Мишка на сервере».
 *
 * gruvbox совпадает по температуре с брендом (тёплый кремовый на свету,
 * тёплый тёмно-коричневый в темноте) и с рабочим окружением автора
 * (ghostty + neovim на gruvbox) — см. BRANDING §4.
 *
 * Тема не входит в bundled-набор Shiki у Slidev 0.47, поэтому подгружаем
 * gruvbox как TextMate-тему из пакета `tm-themes` (офлайн, без сети).
 */
export default defineShikiSetup(() => {
  return {
    themes: {
      light: gruvboxLight as any,
      dark: gruvboxDark as any,
    },
  }
})
