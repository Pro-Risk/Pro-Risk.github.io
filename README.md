# Портфолио Тимура Галиева

Сайт-портфолио на Next.js 16, Tailwind CSS 4 и shadcn/ui. Собирается в статический сайт и публикуется на GitHub Pages.

## Запуск

```bash
npm install
npm run dev
```

Сайт откроется на http://localhost:3000.

## Как устроено

- `src/data/projects.ts` — все проекты: описание, стек, цифры, подписи к скриншотам.
- `src/data/profile.ts` — имя, текст «обо мне», стек.
- `src/data/activity.ts` — коммиты по дням для графика активности.
- `public/screenshots/<slug>/` — скриншоты проектов в WebP.

## Как добавить скриншоты

1. Положить PNG или JPG в `../screenshots/<slug>/` (имя файла задаёт порядок: `01-…`, `02-…`).
2. Запустить `python scripts/screens.py` — скрипт сожмёт картинки в WebP и обновит `src/data/screenshots.json`.
3. Подписи добавить в `captions` нужного проекта в `src/data/projects.ts`.

## Сборка

```bash
npm run build
```

Готовый сайт появится в папке `out/`. При пуше в `main` workflow `.github/workflows/deploy.yml` собирает его и выкладывает на GitHub Pages.
