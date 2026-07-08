import { createContext, useContext, useState, ReactNode } from "react";
import QuoteModal from "./QuoteModal";

interface QuoteModalContextValue {
  open: (product?: string) => void;
  close: () => void;
}

const QuoteModalContext = createContext<QuoteModalContextValue>({
  open: () => {},
  close: () => {},
});

export function useQuoteModal() {
  return useContext(QuoteModalContext);
}

export default function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultProduct, setDefaultProduct] = useState("");

  const open = (product = "") => {
    setDefaultProduct(product);
    setIsOpen(true);
  };
  const close = () => setIsOpen(false);

  return (
    <QuoteModalContext.Provider value={{ open, close }}>
      {children}
      <QuoteModal isOpen={isOpen} onClose={close} defaultProduct={defaultProduct} />
    </QuoteModalContext.Provider>
  );
}
