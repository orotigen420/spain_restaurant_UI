import { createContext, useContext, useState, type ReactNode } from 'react';

export interface CartItem {
  id: string;
  quantity: number;
}

interface AppContextType {
  guestCount: number;
  setGuestCount: (count: number) => void;
  cart: CartItem[];
  addToCart: (id: string, quantity: number) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalCartQuantity: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [guestCount, setGuestCount] = useState<number>(1);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (id: string, quantity: number) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === id);
      if (existingItemIndex > -1) {
        return prevCart.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { id, quantity }];
    });
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalCartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        guestCount,
        setGuestCount,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        totalCartQuantity,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
