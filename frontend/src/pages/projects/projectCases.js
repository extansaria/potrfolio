export const projectCases = [
  {
    id: 1,
    slug: 'project-case-1',
    title: 'TriceFit - интернет-магазин спортивного питания',
    shortDescription: 'Полноценный магазин для продажи спортивного питания с каталогом и карточками товаров.',
    description:
      'Проект TriceFit - интернет-магазин для продажи спортивного питания. Основной фокус: удобный каталог, понятная карточка товара, быстрый путь к покупке и адаптивный интерфейс для мобильных устройств. В кейсе показаны ключевые экраны: главная, каталог, карточка товара и финальный экран оформления.',
    role: 'Frontend-разработчик',
    stack: ['Docker', 'Figma', 'VS Code', 'React'],
    period: '2025',
    showSiteButton: true,
    missingHost: true,
    coverImage: '/case1/ember.png',
    images: [
      '/case1/summit.jpg',
      '/case1/atlas.jpg',
      '/case1/forge.jpg',
      '/case1/prism.jpg'
    ]
  },
  {
    id: 2,
    slug: 'project-case-2',
    title: 'Приоритет - сайт компании грузоперевозок',
    shortDescription: 'Корпоративный сайт транспортной компании с презентацией услуг и контактами.',
    description:
      'Проект "Приоритет" - сайт компании, которая занимается грузоперевозками. Основная задача: показать услуги, преимущества и маршруты, чтобы клиенту было просто оставить заявку на перевозку. Сайт сделан на чистом HTML, CSS и JavaScript с адаптацией под мобильные устройства и акцентом на быструю загрузку.',
    role: 'Frontend-разработчик',
    stack: ['HTML', 'CSS', 'JavaScript', 'VS Code'],
    period: '2025',
    liveUrl: 'https://extansaria.github.io/prioritet-landing/',
    coverImage:
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80',
    images: ['/case2/cargo.jpg', '/case2/route.jpg', '/case2/fleet.jpg', '/case2/transit.jpg']
  },
  {
    id: 3,
    slug: 'project-case-3',
    title: 'SVECHERI - семейный бренд свечей',
    shortDescription:
      'Сайт бренда свечей и изделий из дерева с атмосферной подачей и акцентом на историю семьи.',
    description:
      'SVECHERI - семейный бренд свечей и изделий из дерева, созданный с любовью отцом и дочерью. Верим, что Ваш дом заслуживает особого внимания и тепла. На сайте акцент сделан на визуальную атмосферу бренда, простую навигацию и аккуратную презентацию ассортимента',
    role: 'Frontend-разработчик',
    stack: ['Tilda', 'Figma', 'JavaScript'],
    period: '2025',
    liveUrl: 'https://svecheri.ru/',
    coverImage: '/case3/candle.jpg',
    coverZoom: true,
    images: [
      '/case3/candle.jpg',
      '/case3/cedar.jpg',
      '/case3/hearth.jpg',
      '/case3/aroma.jpg',
      '/case3/glow.jpg',
      '/case3/craft.jpg'
    ]
  },
  {
    id: 4,
    slug: 'project-case-4',
    title: 'Boomshell - Лаундж бар',
    shortDescription: 'Промо-сайт лаундж-бара: тёмная стилистика, меню и контакты, адаптивная вёрстка.',
    description:
      'Boomshell — лаундж-бар. Сайт в тёмной палитре с акцентами под вечерний формат: главный экран, блоки о заведении и меню, призыв связаться или забронировать. Вёрстка адаптивная для телефона и десктопа.',
    role: 'Frontend-разработчик',
    stack: ['HTML', 'CSS', 'JavaScript', 'Figma'],
    period: '2026',
    showSiteButton: true,
    missingHost: true,
    coverImage: '/case4/miks5.jpg',
    uniformGallery: true,
    images: ['/case4/miks1.png', '/case4/miks2.png', '/case4/miks3.png', '/case4/miks.png']
  },
  {
    id: 5,
    slug: 'project-case-5',
    title: 'GOLDENCHEATS - реселлер приватных читов',
    shortDescription: 'Промо-сайт сервиса GOLDENCHEATS с витриной продуктов и акцентом на доверие к бренду.',
    description:
      'GOLDENCHEATS - реселлер лучших приватных читов со всего мира для популярных игр. В кейсе показаны ключевые экраны с подачей продукта, преимуществами и удобной навигацией.',
    role: 'Frontend-разработчик',
    stack: ['HTML', 'CSS', 'JavaScript', 'Figma'],
    period: '2026',
    liveUrl: 'https://goldencheats.ru/',
    coverImage: '/case5/wa1.jpg',
    uniformGallery: true,
    images: ['/case5/wa2.jpg', '/case5/wa3.jpg', '/case5/wa4.jpg', '/case5/wa5.jpg']
  }
];

export const getProjectCaseBySlug = (slug) =>
  projectCases.find((project) => project.slug === slug);
