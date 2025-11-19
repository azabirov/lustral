const orders = [
  { id: '#LUS-8823', customer: 'Амир Тестовый', date: '15.11.2025', total: 125000, status: 'Доставлен' },
  { id: '#LUS-8824', customer: 'Иван Петров', date: '18.11.2025', total: 45000, status: 'В обработке' },
  { id: '#LUS-8825', customer: 'Елена Смирнова', date: '19.11.2025', total: 28900, status: 'Отправлен' },
];

export default function AdminOrdersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900 mb-8">Заказы</h1>

      <div className="bg-white rounded-sm shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-zinc-200">
          <thead className="bg-zinc-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Номер</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Клиент</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Дата</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Сумма</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Статус</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-zinc-500 uppercase tracking-wider">Действия</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-zinc-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500">{order.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 font-medium">
                   {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(order.total)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                     ${order.status === 'Доставлен' ? 'bg-green-100 text-green-800' : 
                       order.status === 'В обработке' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-black hover:text-zinc-600">Просмотр</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

