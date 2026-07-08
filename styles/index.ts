// Базовые стили лейаутов ядра Slidev (даёт разметку center/two-cols/image/… ),
// поверх которых тема накладывает свою типографику.
import '@slidev/client/styles/layouts-base.css'

// Самостоятельно хостим шрифты (BRANDING §3): офлайн-показ, OFL, кириллица.
// PT Sans — тело (humanist sans с характером), JetBrains Mono — код.
import '@fontsource/pt-sans/400.css'
import '@fontsource/pt-sans/400-italic.css'
import '@fontsource/pt-sans/700.css'
import '@fontsource/pt-sans/700-italic.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/700.css'

// Бренд-токены → типографика → код.
import './vars.css'
import './layout.css'
import './code.css'
