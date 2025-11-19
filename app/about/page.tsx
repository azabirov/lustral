import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative py-24 sm:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
            <h2 className="text-base font-semibold leading-7 text-gold-500 uppercase tracking-widest">Собственное производство</h2>
            <p className="mt-2 text-4xl font-serif font-medium tracking-tight text-zinc-900 sm:text-6xl">
              Мастерская света
            </p>
            <p className="mt-6 text-lg leading-8 text-zinc-600">
              LUSTRAL — это не просто магазин, это бренд. Каждая люстра производится нами вручную в нашей московской мастерской. Мы контролируем каждый этап: от эскиза и 3D-моделирования до финальной сборки.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-16 items-center">
          <div className="relative h-96 lg:h-full min-h-[400px]">
             <Image
                // Workshop/Hands image
                src="https://images.unsplash.com/photo-1621839673705-6617adf9e890?auto=format&fit=crop&q=80&w=2000"
                alt="Process of creation"
                fill
                className="object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700"
              />
          </div>
          <div>
            <h3 className="text-3xl font-serif text-zinc-900 mb-6">Создано нами, для вас</h3>
            <div className="space-y-8 text-zinc-600">
              <p>
                В сердце нашего бренда — инновации и ремесло. Мы используем современные технологии 3D-печати для создания сложных, бионических форм, которые невозможно повторить традиционными методами литья.
              </p>
              <p>
                При этом, каждая деталь дорабатывается вручную нашими мастерами. Это гарантирует исключительное качество и уникальность каждого изделия. Вы покупаете не просто светильник, а объект авторского дизайна.
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4 marker:text-gold-500">
                <li>100% Локальное производство</li>
                <li>Авторский дизайн и инжиниринг</li>
                <li>Экологичные материалы и переработка</li>
                <li>Пожизненная гарантия на корпус</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-zinc-50 py-24 sm:py-32 mt-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-zinc-600">Лет экспериментов</dt>
              <dd className="order-first text-5xl font-serif font-semibold tracking-tight text-zinc-900">5</dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-zinc-600">Уникальных моделей</dt>
              <dd className="order-first text-5xl font-serif font-semibold tracking-tight text-zinc-900">120+</dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-zinc-600">Часов ручного труда</dt>
              <dd className="order-first text-5xl font-serif font-semibold tracking-tight text-zinc-900">10k+</dd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
