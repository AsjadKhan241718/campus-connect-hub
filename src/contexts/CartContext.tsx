import { createContext, useContext, useState, ReactNode } from 'react';
import { Event, CartItem, DiscountRule } from '@/types';
import { calculateDiscount } from '@/lib/mock-data';
import { toast } from 'sonner';

interface CartContextType {
  items: CartItem[];
  addToCart: (event: Event, quantity?: number) => void;
  removeFromCart: (eventId: string) => void;
  updateQuantity: (eventId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  discount: number;
  discountRule: DiscountRule | null;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (event: Event, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.event.id === event.id);
      if (existing) {
        toast.success('Cart updated', {
          description: `Updated quantity for ${event.title}`,
        });
        return prev.map(item =>
          item.event.id === event.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      toast.success('Added to cart', {
        description: `${event.title} has been added to your cart`,
      });
      return [...prev, { event, quantity }];
    });
  };

  const removeFromCart = (eventId: string) => {
    setItems(prev => prev.filter(item => item.event.id !== eventId));
    toast.success('Removed from cart');
  };

  const updateQuantity = (eventId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(eventId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.event.id === eventId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce(
    (acc, item) => acc + item.event.price * item.quantity,
    0
  );

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const { discount, rule: discountRule } = calculateDiscount(totalQuantity, subtotal);
  const total = subtotal - discount;

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        discount,
        discountRule,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
