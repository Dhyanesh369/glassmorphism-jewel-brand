"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  lastAddedItem: Omit<CartItem, "quantity"> | null;
  clearLastAddedItem: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("aeris_cart");
      if (savedCart) {
        try {
          return JSON.parse(savedCart);
        } catch (e) {
          console.error("Failed to parse cart from local storage");
        }
      }
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<Omit<CartItem, "quantity"> | null>(null);

  // Save cart to local storage on change
  useEffect(() => {
    localStorage.setItem("aeris_cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (newItem: Omit<CartItem, "quantity">) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === newItem.id);
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentItems, { ...newItem, quantity: 1 }];
    });
    setLastAddedItem(newItem);
    // Optional: Open cart drawer automatically
    // setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const cartTotal = items.reduce((total, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ""));
    return total + price * item.quantity;
  }, 0);

  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const clearLastAddedItem = () => setLastAddedItem(null);

  return (
    <CartContext.Provider
      value={{ 
        items, addToCart, removeFromCart, updateQuantity, 
        cartTotal, cartCount, isCartOpen, openCart, closeCart,
        lastAddedItem, clearLastAddedItem
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
