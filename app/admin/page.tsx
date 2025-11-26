import { Package, ShoppingCart, Users, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { name: 'Всего заказов', value: '12', icon: ShoppingCart, change: '+2', changeType: 'positive' },
    { name: 'Выручка', value: '450 000 ₽', icon: DollarSign, change: '+12%', changeType: 'positive' },
    { name: 'Активные товары', value: '6', icon: Package, change: '0', changeType: 'neutral' },
    { name: 'Клиенты', value: '8', icon: Users, change: '+1', changeType: 'positive' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900 mb-8">Обзор</h1>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((item) => {
           const Icon = item.icon;
           return (
            <div key={item.name} className="bg-white overflow-hidden shadow-sm rounded-sm p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-3 rounded-md bg-zinc-100 text-zinc-600">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-zinc-500 truncate">{item.name}</dt>
                    <dd>
                      <div className="text-lg font-medium text-zinc-900">{item.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
           );
        })}
      </div>

      <div className="bg-white shadow-sm rounded-sm p-6">
         <h2 className="text-lg font-medium text-zinc-900 mb-4">Последние заказы</h2>
         <div className="text-zinc-500 text-sm">
            Здесь будет список последних поступлений заказов.
         </div>
      </div>
    </div>
  );
}



