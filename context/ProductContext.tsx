'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/lib/data';
import { supabase } from '@/lib/supabase';
import { addProductAction, updateProductAction, deleteProductAction } from '@/app/actions/admin';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  isLoading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch products (READ is still public via anon key, which is fine)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from('products').select('*');
        if (error) throw error;
        if (data) setProducts(data as Product[]);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // WRITE operations now go through Server Actions (Secure)
  const addProduct = async (newProduct: Omit<Product, 'id'>) => {
    try {
      const savedProduct = await addProductAction(newProduct);
      setProducts(prev => [...prev, savedProduct]);
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Ошибка: Недостаточно прав или сбой сервера');
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
    try {
      await updateProductAction(updatedProduct);
      setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Ошибка: Недостаточно прав или сбой сервера');
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await deleteProductAction(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Ошибка: Недостаточно прав или сбой сервера');
    }
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, isLoading }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
