import Image from 'next/image';

const projects = [
  {
    id: 1,
    title: "Резиденция в Барвихе",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1600",
    description: "Комплексное освещение гостиной и столовой зоны."
  },
  {
    id: 2,
    title: "Penthouse Moscow City",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1600",
    description: "Акцентное освещение для современного интерьера в стиле минимализм."
  },
  {
    id: 3,
    title: "Boutique Hotel SPB",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1600",
    description: "Разработка световых сценариев для лобби и номеров."
  },
  {
    id: 4,
    title: "Country House",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1600",
    description: "Теплый свет для загородного дома из бруса."
  }
];

export default function ProjectsPage() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-medium text-zinc-900 sm:text-5xl">Наши Проекты</h1>
          <p className="mt-4 text-lg text-zinc-500 max-w-2xl mx-auto">
            Вдохновение реализованными идеями. Мы гордимся каждым созданным интерьером.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-2 lg:gap-x-8">
          {projects.map((project) => (
            <div key={project.id} className="group cursor-pointer">
              <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-zinc-100 mb-4">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-0" />
              </div>
              <h3 className="text-xl font-serif font-medium text-zinc-900 group-hover:text-gold-600 transition-colors">
                {project.title}
              </h3>
              <p className="mt-2 text-zinc-500 text-sm">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

