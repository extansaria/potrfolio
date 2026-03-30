// Данные для событий

export const upcomingEvents = [
  {
    id: 1,
    title: "Современный Frontend: От React до Production",
    description: "Практический воркшоп по разработке современных веб-приложений. Разберём архитектуру, best practices, оптимизацию и деплой реальных проектов.",
    speaker: "Сергеев Даниил",
    speakerRole: "Frontend Developer",
    date: "2025-12-15",
    time: "18:00",
    duration: "2 часа",
    location: "Точка кипения ПРОМТЕХДИЗАЙН",
    address: "Санкт-Петербург, ул. Большая Морская, 18",
    image: "/images/5.jpg",
    topics: [
      "React и современные хуки",
      "State management: Redux vs Context",
      "Performance optimization",
      "CI/CD и деплой",
      "Tailwind CSS и дизайн-системы"
    ],
    seats: 30,
    registeredCount: 12,
    status: "open", // open, full, closed
    tags: ["React", "JavaScript", "Frontend", "Workshop"]
  }
];

export const eventStatuses = {
  open: { label: "Открыта запись", color: "green" },
  full: { label: "Мест нет", color: "red" },
  closed: { label: "Регистрация закрыта", color: "gray" }
};

