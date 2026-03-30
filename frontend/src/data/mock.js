// Mock данные для портфолио Сергеева Даниила

export const personalInfo = {
  name: "Сергеев Даниил",
  title: "Frontend Разработчик",
  location: "Санкт-Петербург, Россия",
  email: "danya_sergeev_2004@mail.ru",
  phone: "+7 (999) 123-45-67",
  telegram: "@extansaria",
  github: "https://github.com/daniilsergeev",
  linkedin: "https://linkedin.com/in/daniilsergeev",
  about: "Увлечённый Frontend-разработчик с опытом создания современных веб-приложений. Специализируюсь на React, TypeScript и создании отзывчивых пользовательских интерфейсов. Стремлюсь к чистому коду и отличному пользовательскому опыту."
};

export const education = [
  {
    id: 1,
    institution: "СПбГУПТД",
    fullName: "Санкт-Петербургский государственный университет промышленных технологий и дизайна",
    degree: "Бакалавр",
    field: "Информационные системы и технологии",
    period: "2022 - 2026",
    description: "Специализация: Frontend-разработка. Изучал веб-технологии, алгоритмы, базы данных и UX/UI дизайн."
  }
];

export const experience = [
  {
    id: 0,
    company: "ГК \"ИнфраТек\"",
    position: "Руководитель службы информационно-коммуникационных технологий",
    period: "2022 - 2024",
    description: "Отвечал за развитие ИКТ-инфраструктуры компании: выстраивал стратегию цифровой трансформации, координировал команду инженеров и внедрял новые сервисы поддержки бизнеса.",
    achievements: [
      "Перенёс критические сервисы в гибридное облако и повысил отказоустойчивость на 99.95%",
      "Внедрил централизованную систему мониторинга и снизил время реагирования на инциденты в 3 раза",
      "Организовал защищённый доступ для удалённых подразделений и подготовил регламенты ИБ"
    ],
    image: "/images/profile.jpg"
  },
  {
    id: 1,
    company: "TechVision Studio",
    position: "Frontend Developer",
    period: "2024 - 2026",
    description: "Разработка и поддержка клиентских веб-приложений на React. Внедрение новых фич, оптимизация производительности, код-ревью.",
    achievements: [
      "Увеличил скорость загрузки приложения на 40%",
      "Разработал UI-библиотеку компонентов",
      "Внедрил автоматизированное тестирование"
    ]
  },
  {
    id: 2,
    company: "Digital Craft Agency",
    position: "Junior Frontend Developer",
    period: "2026 - настоящее время",
    description: "Вёрстка адаптивных лендингов, интеграция с REST API, работа в команде по Agile.",
    achievements: [
      "Создал более 15 landing pages",
      "Освоил React и современный стек",
      "Участвовал в редизайне корпоративного сайта"
    ]
  }
];

export const skills = {
  frontend: [
    { name: "React", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "TypeScript", level: 80 },
    { name: "HTML/CSS", level: 95 },
    { name: "Tailwind CSS", level: 85 },
    { name: "Next.js", level: 75 }
  ],
  tools: [
    { name: "Git", level: 85 },
    { name: "Figma", level: 70 },
    { name: "VS Code", level: 90 },
    { name: "Webpack/Vite", level: 75 }
  ],
  soft: [
    "Командная работа",
    "Решение проблем",
    "Быстрое обучение",
    "Внимание к деталям"
  ]
};

export const projects = [
  {
    id: 1,
    title: "3D Визуализация и Рендеринг",
    description: "Профессиональная 3D визуализация с детальной проработкой материалов, освещения и композиции. Реалистичный рендеринг с использованием современных техник постобработки и оптимизации для достижения фотореалистичного результата.",
    technologies: ["3D Modeling", "Rendering", "Post-Processing", "Material Design"],
    image: "/images/matrix.jpg",
    github: "https://github.com/daniilsergeev/3d-visualization",
    demo: "#"
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "Полнофункциональный интернет-магазин с динамической корзиной покупок, системой управления товарами и безопасной обработкой платежей. Реализован с фокусом на удобство пользователя и оптимизацию конверсии.",
    technologies: ["React", "Redux", "Node.js", "MongoDB", "Payment API"],
    image: "/images/slate.jpg",
    github: "https://github.com/daniilsergeev/ecommerce",
    demo: "#"
  },
  {
    id: 3,
    title: "Корпоративный портал",
    description: "Масштабируемое веб-решение для бизнеса с модульной архитектурой. Включает систему управления контентом и интеграцию с внешними сервисами.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    image: "/images/nebula.jpg",
    github: "https://github.com/daniilsergeev/project3",
    demo: "#"
  },
  {
    id: 4,
    title: "Персональное Портфолио",
    description: "Современный одностраничный сайт-портфолио с анимированным интерфейсом и адаптивным дизайном. Реализован с использованием React и современных веб-технологий для демонстрации профессиональных навыков и проектов.",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Responsive Design"],
    image: "/images/ripple.jpg",
    github: "https://github.com/daniilsergeev/portfolio",
    demo: "#"
  }
];

export const footerInfo = {
  aiTool: "Emergent E1 (Claude)",
  timeSpent: "3 часа",
  jsFeatures: ["Плавная прокрутка (Smooth Scroll)", "Интерактивная форма обратной связи с отправкой в Telegram", "Анимированный градиентный фон"]
};
