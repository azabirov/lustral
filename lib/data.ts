export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  isMerch?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Lumina Aurelia',
    price: 125000,
    category: 'Люстры',
    image: 'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?auto=format&fit=crop&q=80&w=1600', 
    description: 'Эксклюзивная люстра сложной геометрической формы. Каждый элемент создается индивидуально, образуя неповторимый световой рисунок.',
  },
  {
    id: '2',
    name: 'Voronoi Pendant',
    price: 45000,
    category: 'Подвесные светильники',
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=1600',
    description: 'Подвесной светильник с бионической структурой. Органическая форма плафона мягко рассеивает свет, создавая уютную атмосферу.',
  },
  {
    id: '3',
    name: 'Eclipse Wall',
    price: 28900,
    category: 'Настенные бра',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1600',
    description: 'Настенный светильник с фактурной поверхностью. Игра света и тени на рельефном корпусе превращает его в арт-объект.',
  },
  {
    id: '4',
    name: 'Helix Structure',
    price: 56000,
    category: 'Люстры',
    image: 'https://images.unsplash.com/photo-1540932296774-3ed6d6147032?auto=format&fit=crop&q=80&w=1600',
    description: 'Спиралевидная конструкция, воплощающая динамику движения. Сложная геометрия достигается благодаря уникальной технологии производства.',
  },
  {
    id: '5',
    name: 'Crystal Flow',
    price: 189000,
    category: 'Люстры',
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=1600',
    description: 'Люстра, напоминающая застывший поток света. Плавные линии и безупречная отделка делают её центром притяжения в любом интерьере.',
  },
  {
    id: '6',
    name: 'Terra Table',
    price: 32000,
    category: 'Настольные лампы',
    image: 'https://images.unsplash.com/photo-1534349762913-961f69056ea4?auto=format&fit=crop&q=80&w=1600',
    description: 'Настольная лампа с основанием сложной формы. Вдохновлена природными ландшафтами и текстурами.',
  },
];

export const merchProducts: Product[] = [
  {
    id: 'm1',
    name: 'LUSTRAL Tote Bag',
    price: 2500,
    category: 'Аксессуары',
    image: 'https://images.unsplash.com/photo-1597484662317-9bd7bdda2907?auto=format&fit=crop&q=80&w=800',
    description: 'Стильный шоппер из органического хлопка с логотипом мастерской.',
    isMerch: true,
  },
  {
    id: 'm2',
    name: 'Art Sketchbook',
    price: 1800,
    category: 'Канцелярия',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
    description: 'Скетчбук для ваших идей и зарисовок. Плотная бумага, твердый переплет.',
    isMerch: true,
  },
];
