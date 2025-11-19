'use client';

import { useState, useEffect } from 'react';
import { useHero } from '@/context/HeroContext';
import { Save, Plus, Trash2, Image as ImageIcon } from 'lucide-react';

export default function AdminHeroPage() {
  const { heroData, updateHeroData } = useHero();
  const [formData, setFormData] = useState(heroData);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setFormData(heroData);
  }, [heroData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const addImage = () => {
    setFormData(prev => ({ ...prev, images: [...prev.images, ''] }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateHeroData(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Hero Секция</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-sm p-6 space-y-8">
        {/* Text Content */}
        <div className="space-y-6">
           <h2 className="text-lg font-medium text-zinc-900 border-b border-zinc-100 pb-2">Текстовый контент</h2>
           
           <div>
             <label className="block text-sm font-medium text-zinc-700 mb-1">Заголовок</label>
             <input
               type="text"
               name="title"
               value={formData.title}
               onChange={handleChange}
               className="block w-full border border-zinc-300 px-3 py-2 rounded-sm focus:ring-black focus:border-black text-sm"
             />
             <p className="mt-1 text-xs text-zinc-500">Первая строка крупного текста</p>
           </div>

           <div>
             <label className="block text-sm font-medium text-zinc-700 mb-1">Подзаголовок</label>
             <input
               type="text"
               name="subtitle"
               value={formData.subtitle}
               onChange={handleChange}
               className="block w-full border border-zinc-300 px-3 py-2 rounded-sm focus:ring-black focus:border-black text-sm"
             />
             <p className="mt-1 text-xs text-zinc-500">Вторая строка, курсивом</p>
           </div>

           <div>
             <label className="block text-sm font-medium text-zinc-700 mb-1">Описание</label>
             <textarea
               name="description"
               rows={3}
               value={formData.description}
               onChange={handleChange}
               className="block w-full border border-zinc-300 px-3 py-2 rounded-sm focus:ring-black focus:border-black text-sm"
             />
           </div>
        </div>

        {/* Images */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
             <h2 className="text-lg font-medium text-zinc-900">Изображения слайдера</h2>
             <button 
               type="button" 
               onClick={addImage}
               className="flex items-center gap-1 text-sm text-black font-medium hover:text-zinc-600"
             >
               <Plus className="h-4 w-4" />
               Добавить фото
             </button>
          </div>
          
          <div className="space-y-3">
            {formData.images.map((url, index) => (
              <div key={index} className="flex gap-3 items-start">
                 <div className="mt-2 flex-shrink-0 text-zinc-400">
                    <ImageIcon className="h-5 w-5" />
                 </div>
                 <div className="flex-grow">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="block w-full border border-zinc-300 px-3 py-2 rounded-sm focus:ring-black focus:border-black text-sm"
                    />
                 </div>
                 <button 
                   type="button"
                   onClick={() => removeImage(index)}
                   className="mt-2 text-red-500 hover:text-red-700 p-1"
                   disabled={formData.images.length <= 1}
                   title="Удалить"
                 >
                   <Trash2 className="h-5 w-5" />
                 </button>
              </div>
            ))}
            {formData.images.length === 0 && (
               <div className="text-center py-8 text-zinc-500 text-sm bg-zinc-50 rounded-sm">
                  Нет изображений. Добавьте хотя бы одно.
               </div>
            )}
          </div>
          <p className="text-xs text-zinc-500">
             Изображения будут автоматически переключаться каждые 5 секунд. Рекомендуемый формат: Горизонтальный, высокое разрешение (2500px+).
          </p>
        </div>

        <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
          {isSaved && (
            <span className="text-green-600 text-sm font-medium animate-fade-in">
              Изменения сохранены!
            </span>
          )}
          <button
            type="submit"
            className="ml-auto flex items-center gap-2 bg-black text-white px-6 py-3 rounded-sm text-sm font-medium hover:bg-zinc-800 transition-colors"
          >
            <Save className="h-4 w-4" />
            Сохранить изменения
          </button>
        </div>
      </form>
    </div>
  );
}
