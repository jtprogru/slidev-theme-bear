# Makefile slidev-theme-bear. Тонкая обёртка над npm-скриптами: команды
# одинаково называются здесь, в CI и в голове. npm-скрипты остаются на месте —
# на них завязан CI, Makefile нужен тому, кто тему разрабатывает.

SHELL := /bin/bash
.DEFAULT_GOAL := help

NPM := npm
NPX := npx

PORT ?= 3030

# Слайды example.md, из которых собираются превью в README: имя:номер.
# Переставил слайды в example.md — поправь номера здесь.
PREVIEW_SLIDES := cover:1 code:6 callouts:10
PREVIEW_DIR    := docs/preview
PREVIEW_WIDTH  := 1280

comma := ,
empty :=
space := $(empty) $(empty)
PREVIEW_RANGE := $(subst $(space),$(comma),$(foreach s,$(PREVIEW_SLIDES),$(lastword $(subst :, ,$(s)))))

.PHONY: help install dev build export screenshot screenshot-dark preview chromium \
        lint lint-fix contrast brand-sync brand-check check ci clean distclean

help: ## Список команд
	@grep -hE '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-16s\033[0m %s\n", $$1, $$2}'

# Ставится, только если манифесты новее node_modules или его нет: make dev
# после git pull с новым локом переустановит зависимости сам, повторный — нет.
# npm ci дёргает prepare, то есть заодно синхронизирует айдентику.
node_modules: package.json package-lock.json
	$(NPM) ci
	@touch node_modules

install: node_modules ## Поставить зависимости (npm ci, только если манифесты изменились)

dev: node_modules ## Превью example.md с hot reload: make dev PORT=3031
	$(NPM) run dev -- --port $(PORT)

build: node_modules ## Сборка дека в dist/
	$(NPM) run build

# Экспорт гоняет слайды через headless-chromium из playwright. Если браузер уже
# стоит, install ничего не качает и отрабатывает за секунду.
chromium: node_modules ## Поставить chromium для экспорта
	$(NPX) playwright install chromium

export: chromium ## PDF в example-export.pdf
	$(NPM) run export

screenshot: chromium ## PNG по слайду, светлая тема, в example-export/
	$(NPM) run screenshot

screenshot-dark: chromium ## PNG по слайду, тёмная тема, в example-export-dark/
	$(NPM) run export -- --format png --dark --output example-export-dark

# Slidev перед PNG-экспортом стирает каталог назначения целиком, поэтому
# экспорт идёт во временный каталог, а в docs/preview копируются только нужные
# слайды. Экспорт отдаёт ~1960px в ширину, README держит 1280px: sips на macOS,
# ImageMagick в остальных местах.
preview: chromium ## Пересобрать превью README в docs/preview (свет и тьма)
	@set -e; \
	tmp=$$(mktemp -d); trap 'rm -rf "$$tmp"' EXIT; \
	$(NPM) run --silent export -- --format png --range $(PREVIEW_RANGE) --output "$$tmp/light"; \
	$(NPM) run --silent export -- --format png --range $(PREVIEW_RANGE) --output "$$tmp/dark" --dark; \
	for pair in $(PREVIEW_SLIDES); do \
		name=$${pair%%:*}; no=$${pair##*:}; \
		for theme in light dark; do \
			src="$$tmp/$$theme/$$no.png"; dst="$(PREVIEW_DIR)/$$name-$$theme.png"; \
			if command -v sips >/dev/null; then \
				sips --resampleWidth $(PREVIEW_WIDTH) "$$src" --out "$$dst" >/dev/null; \
			elif command -v magick >/dev/null; then \
				magick "$$src" -resize $(PREVIEW_WIDTH)x "$$dst"; \
			else \
				echo "✗ нужен sips (macOS) или magick (ImageMagick)"; exit 1; \
			fi; \
			echo "  → $$dst"; \
		done; \
	done

lint: node_modules ## eslint
	$(NPM) run lint

lint-fix: node_modules ## eslint --fix
	$(NPM) run lint:fix

contrast: node_modules ## Проверка контраста WCAG AA
	$(NPM) run contrast

# MISHKA_DS из командной строки make пробрасывает в окружение скрипта сам.
brand-sync: node_modules ## Синхронизировать айдентику из mishka-ds: make brand-sync MISHKA_DS=../mishka-ds
	$(NPM) run brand:sync

# То же, что шаг CI после npm ci. Синхронизированные файлы остаются в дереве:
# если проверка упала, дифф и есть починка, его остаётся закоммитить.
brand-check: brand-sync ## Закоммиченная айдентика совпадает с mishka-ds
	@git diff --exit-code -- public/brand components/brandAssets.ts \
		&& echo "✓ public/brand и components/brandAssets.ts в синхроне с mishka-ds" \
		|| { echo "✗ айдентика отстала от mishka-ds — закоммить дифф выше"; exit 1; }

check: lint contrast ## Быстрые проверки перед коммитом: lint + contrast

ci: brand-check lint contrast build export ## Всё, что гоняет CI, в том же порядке

clean: ## Удалить сборку и экспорты
	rm -rf dist example-export.pdf example-export example-export-dark

distclean: clean ## Удалить сборку, экспорты и node_modules
	rm -rf node_modules
