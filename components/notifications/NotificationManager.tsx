"use client";

import { useCart } from "@/lib/context/CartContext";
import CartToast from "./CartToast";

export default function NotificationManager() {
  const { lastAddedItem, clearLastAddedItem } = useCart();

  return (
    <CartToast 
      item={lastAddedItem} 
      onClose={clearLastAddedItem} 
    />
  );
}
