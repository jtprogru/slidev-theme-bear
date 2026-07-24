import antfu from '@antfu/eslint-config'

// Конфиг на @antfu/eslint-config — стандарт экосистемы Slidev/antfu:
// один пакет покрывает JS/TS/Vue/JSON/YAML и форматирование (prettier не нужен).
export default antfu({
  vue: true,
  typescript: true,
  ignores: [
    'dist',
    '**/*.md', // презентация example.md — не линтуем как код
  ],
})
