'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, products as initialProducts } from '@/lib/data';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedProducts = localStorage.getItem('lustral-products');
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts);
        if (Array.isArray(parsed) && parsed.length > 0) {
           setProducts(parsed);
        }
      } catch (e) {
        console.error('Failed to parse products', e);
      }
    }
  }, []);

  useEffect(() => {
     if (isMounted) {
        localStorage.setItem('lustral-products', JSON.stringify(products));
     }
  }, [products, isMounted]);

  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    const product = {
      ...newProduct,
      id: Math.random().toString(36).substr(2, 9),
    };
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
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

