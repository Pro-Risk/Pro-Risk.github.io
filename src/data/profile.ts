export type ExperiencePoint = {
  text: string;
  /** Название проекта перед текстом */
  title?: string;
  /** Ссылка на страницу проекта в портфолио */
  slug?: string;
};

export type Experience = {
  role: string;
  place?: string;
  period: string;
  summary?: string;
  points: ExperiencePoint[];
  slug?: string;
};

export const profile = {
  name: "Тимур Галиев",
  shortName: "Тимур",
  githubLogin: "Pro-Risk",
  github: "https://github.com/Pro-Risk",
  role: "Full-stack разработчик, 24 года",
  bio: [
    "Full-stack разработчик с опытом коммерческой разработки с января 2026 года.",
    "Веду продакшен-CRM для сервисного бизнеса, которая работает в Казахстане и Кыргызстане: бэкенд, фронтенд, серверы, CI/CD и безопасность. Делал проекты для заказчиков и свои продукты — от идеи до работающего сервиса.",
  ],
  experience: [
    {
      role: "Ведущий full-stack разработчик",
      place: "TENNET CRM",
      period: "январь 2026 — сейчас",
      summary:
        "Облачная CRM для клиник, салонов и магазинов: запись, касса, зарплата, склад, лояльность, отчёты и мессенджеры в одном окне. Ведущий разработчик с апреля 2026.",
      slug: "crm",
      points: [
        { text: "Бэкенд и фронтенд: 15 Django-приложений, около 260 моделей, 88 экранов на React и TypeScript." },
        { text: "Омниканальный инбокс (WhatsApp, Telegram, Instagram), сервис WhatsApp на Go." },
        { text: "AI-агент для ответов клиентам и записи на приём, база знаний на pgvector, MCP-сервер для сотрудников." },
        { text: "Биллинг SaaS с онлайн-оплатой и защитой от двойного списания." },
        { text: "Безопасность: проверка прав на сервере, изоляция данных между организациями." },
        { text: "Инфраструктура: выкатка без простоя (blue-green), резерв базы на репликации, мониторинг, CI/CD." },
        { text: "Два продакшен-экземпляра на одном коде (Казахстан и Кыргызстан), около 5 400 автотестов." },
      ],
    },
    {
      role: "Проекты для заказчиков",
      period: "сентябрь — октябрь 2026",
      points: [
        {
          title: "Bitlo",
          slug: "bitlo",
          text: "перенёс работающий сервис генерации песен с облачной платформы на собственный сервер в Docker без потери пользователей и данных.",
        },
        {
          title: "CowoFlo",
          slug: "cowoflo",
          text: "AI-помощник для кабинета флориста: MCP-сервер на 86 инструментов, OAuth-коннектор, подтверждение денежных операций.",
        },
        {
          title: "FacilityPro",
          slug: "facilitypro",
          text: "B2B-платформа хозяйственного аутсорсинга: четыре кабинета, офлайн-PWA, финансы и документы в PDF.",
        },
      ],
    },
    {
      role: "Свои проекты",
      period: "2026",
      points: [
        { title: "QazQR", slug: "qazqr", text: "цифровая визитка и QR-меню для заведений, работает на qaz-qr.kz." },
        { title: "Шежіре", slug: "shezhire", text: "дерево казахских родов на 3,4 млн узлов, ответ API 2–9 мс." },
        { title: "MC Panel", slug: "mc-panel", text: "панель управления игровыми серверами на Go." },
        { title: "Porthole", slug: "porthole", text: "десктоп-приложение на Rust и Tauri для игры по LAN через интернет." },
        { title: "Игры на Godot", slug: "hell-shift", text: "ретро-шутер с кооперативом через Steam и пиксельный рогалик." },
      ],
    },
  ] as Experience[],
  stack: [
    { group: "Языки", items: ["Python", "TypeScript", "Go", "Rust", "SQL", "Bash"] },
    { group: "Бэкенд", items: ["Django", "DRF", "Django Channels", "Celery", "FastAPI", "Node.js", "Express", "Fastify"] },
    { group: "Фронтенд", items: ["React", "Next.js", "Vite", "Tailwind CSS", "shadcn/ui", "TanStack Query", "Zustand", "PWA"] },
    { group: "Данные", items: ["PostgreSQL", "pgvector", "PgBouncer", "Redis", "RabbitMQ", "SQLite", "S3"] },
    {
      group: "DevOps",
      items: ["Docker", "Docker Compose", "GitHub Actions", "nginx", "Caddy", "Linux", "Cloudflare", "Prometheus", "Grafana", "Loki"],
    },
    {
      group: "Интеграции",
      items: ["Платёжные системы", "WhatsApp", "Telegram", "Instagram", "SIP / WebRTC", "OpenAI API", "Anthropic API", "MCP"],
    },
    { group: "Десктоп и игры", items: ["Tauri", "Godot", "Steamworks"] },
  ],
};
