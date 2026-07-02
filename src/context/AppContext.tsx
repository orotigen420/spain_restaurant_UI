import { createContext, useContext, useState, type ReactNode } from 'react';

interface AppContextType {
  guestCount: number;
  setGuestCount: (count: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [guestCount, setGuestCount] = useState<number>(1);

  return (
    <AppContext.Provider value={{ guestCount, setGuestCount }}>
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
