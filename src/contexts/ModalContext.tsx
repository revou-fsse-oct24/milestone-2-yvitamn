/// contexts/ModalContext.tsx
import { createContext, useState } from 'react';

export const ModalContext = createContext({
  isCartModalOpen: false,
  setIsCartModalOpen: (isOpen: boolean) => {},
});

export const ModalProvider: React.FC = ({ children }) => {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isCartModalOpen, setIsCartModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};