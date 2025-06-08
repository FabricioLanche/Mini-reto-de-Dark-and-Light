import { createContext } from 'react';
import type { ThemeContextType } from '../types';

export const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  setIsDark: () => {}
});