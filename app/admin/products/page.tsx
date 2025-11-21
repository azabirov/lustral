'use client';

import { useProducts } from '@/context/ProductContext';
import { Product } from '@/lib/data';
import { Plus, Pencil, Trash2, X, Save, Upload } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    category: '',
    price: 0,
    image: '',
    description: '',
  });

  const openAddModal = () => {
    setFormData({
      name: '',
      category: 'Люстры',
      price: 0,
      image: '',
      description: '',
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setFormData(product);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price) {
       alert('Заполните обязательные поля');
       return;
    }

    if (isEditing && formData.id) {
       await updateProduct(formData as Product);
    } else {
       await addProduct(formData as Omit<Product, 'id'>);
    }

    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Вы уверены, что хотите удалить этот товар?')) {
       await deleteProduct(id);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    setIsUploading(true);

    try {
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('images').getPublicUrl(filePath);
      
      setFormData(prev => ({ ...prev, image: data.publicUrl }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Ошибка загрузки изображения');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Товары</h1>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 text-sm font-medium rounded-sm hover:bg-zinc-800"
        >
          <Plus className="h-4 w-4" />
          Добавить товар
        </button>
      </div>

      <div className="bg-white rounded-sm shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-zinc-200">
          <thead className="bg-zinc-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Товар</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Категория</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Цена</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-zinc-500 uppercase tracking-wider">Действия</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-zinc-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-sm bg-zinc-100 relative">
                      {product.image ? (
                         <Image className="object-cover" src={product.image} alt="" fill />
                      ) : (
                         <div className="h-full w-full bg-zinc-200" />
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-zinc-900">{product.name}</div>
                      <div className="text-sm text-zinc-500 truncate max-w-xs">{product.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-zinc-100 text-zinc-800">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500">
                  {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(product.price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                     onClick={() => openEditModal(product)}
                     className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button 
                     onClick={() => handleDelete(product.id)}
                     className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product Modal */}
      {isModalOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-sm shadow-xl w-full max-w-lg overflow-hidden">
               <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
                  <h2 className="text-lg font-bold text-zinc-900">
                     {isEditing ? 'Редактировать товар' : 'Новый товар'}
                  </h2>
                  <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-black">
                     <X className="h-5 w-5" />
                  </button>
               </div>
               
               <form onSubmit={handleSave} className="p-6 space-y-4">
                  <div>
                     <label className="block text-sm font-medium text-zinc-700 mb-1">Название</label>
                     <input 
                        type="text" 
                        value={formData.name} 
                        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="block w-full border border-zinc-300 px-3 py-2 rounded-sm focus:ring-black focus:border-black text-sm"
                        required
                     />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-1">Категория</label>
                        <select 
                           value={formData.category} 
                           onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                           className="block w-full border border-zinc-300 px-3 py-2 rounded-sm focus:ring-black focus:border-black text-sm"
                        >
                           <option value="Люстры">Люстры</option>
                           <option value="Подвесные светильники">Подвесные светильники</option>
                           <option value="Настенные бра">Настенные бра</option>
                           <option value="Настольные лампы">Настольные лампы</option>
                           <option value="Аксессуары">Аксессуары</option>
                        </select>
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-1">Цена (₽)</label>
                        <input 
                           type="number" 
                           value={formData.price} 
                           onChange={e => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                           className="block w-full border border-zinc-300 px-3 py-2 rounded-sm focus:ring-black focus:border-black text-sm"
                           required
                        />
                     </div>
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-zinc-700 mb-1">Изображение</label>
                     <div className="flex gap-2">
                        <input 
                           type="url" 
                           value={formData.image} 
                           onChange={e => setFormData(prev => ({ ...prev, image: e.target.value }))}
                           className="block w-full border border-zinc-300 px-3 py-2 rounded-sm focus:ring-black focus:border-black text-sm"
                           placeholder="https://..."
                        />
                        <label className={`flex items-center justify-center px-3 border border-zinc-300 rounded-sm bg-zinc-50 cursor-pointer hover:bg-zinc-100 ${isUploading ? 'opacity-50' : ''}`}>
                           <Upload className="h-4 w-4 text-zinc-600" />
                           <input 
                              type="file" 
                              className="hidden" 
                              accept="image/*" 
                              onChange={handleFileUpload} 
                              disabled={isUploading}
                           />
                        </label>
                     </div>
                     {isUploading && <p className="text-xs text-zinc-500 mt-1">Загрузка...</p>}
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-zinc-700 mb-1">Описание</label>
                     <textarea 
                        rows={3}
                        value={formData.description} 
                        onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        className="block w-full border border-zinc-300 px-3 py-2 rounded-sm focus:ring-black focus:border-black text-sm"
                     />
                  </div>

                  <div className="pt-4 flex justify-end gap-3">
                     <button 
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 border border-zinc-300 rounded-sm text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                     >
                        Отмена
                     </button>
                     <button 
                        type="submit"
                        disabled={isUploading}
                        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-sm text-sm font-medium hover:bg-zinc-800 disabled:opacity-50"
                     >
                        <Save className="h-4 w-4" />
                        Сохранить
                     </button>
                  </div>
               </form>
            </div>
         </div>
      )}
    </div>
  );
}
