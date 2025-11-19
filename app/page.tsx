import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function Home() {
  return (
    <div>
      <Hero />
      
      {/* Featured Categories / Products Section */}
      <FeaturedProducts />

      {/* Features / Trust Section */}
      <section className="bg-zinc-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-center">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">Премиум Качество</h3>
              <p className="text-zinc-500 text-sm">Только лучшие материалы и проверенные бренды.</p>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">Бесплатная Доставка</h3>
              <p className="text-zinc-500 text-sm">По всей России при заказе от 50 000 ₽.</p>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">Гарантия 2 Года</h3>
              <p className="text-zinc-500 text-sm">Полное сервисное обслуживание на все модели.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
