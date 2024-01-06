import { createContext, use, useCallback, useMemo, useState } from "react";

interface TerminalProviderContext {
  isFocused: boolean;
  toggleFocus: (state?: boolean) => void;
}

const TerminalContext = createContext<TerminalProviderContext>({
  isFocused: false,
  toggleFocus: () => { throw new Error('TerminalProviderContext not initialized') }
});

export const useTerminal = () => use(TerminalContext);

export const TerminalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const toggleFocus = useCallback((state?: boolean) => {
    setIsFocused(state ?? !isFocused);
  }, [isFocused]);

  const value = useMemo(() => ({
    isFocused,
    toggleFocus
  }), [isFocused, toggleFocus]);

  return (
    <TerminalContext.Provider value={value}>
      {children}
    </TerminalContext.Provider>
  );
}