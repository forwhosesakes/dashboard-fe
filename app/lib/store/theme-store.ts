
export type Theme = 'light' | 'dark';


import { create } from 'zustand';

export interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setDarkTheme:()=>void,
  setLightTheme:()=>void
}


// You can also define theme-specific types
export interface ThemeColors {
  light: {
    background: string;
    text: string;
    primary: string;
    secondary: string;
  };
  dark: {
    background: string;
    text: string;
    primary: string;
    secondary: string;
  };
}

export interface ThemeConfig {
  colors: ThemeColors;
  transitions: {
    duration: number;
    timing: string;
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}



// Custom type guards
export function isValidTheme(theme: string): theme is Theme {
  return theme === 'light' || theme === 'dark';
}

// Utility type for theme-aware styles
export type ThemeAwareStyle<T> = {
  [K in Theme]: T;
};



const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'light';
  }
  return 'light';
};

const updateRootClass = (theme: Theme): void => {
  if (typeof window !== 'undefined') {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }
};

export const useThemeStore = create<ThemeState>()((set) => ({
  theme: getInitialTheme(),
  setTheme: (theme: Theme) => {
    updateRootClass(theme);
    localStorage.setItem('theme', theme);
    set({ theme });
  },
  setDarkTheme :() => {
    set((state) => {
      const newTheme: Theme = 'dark' 
      updateRootClass(newTheme);
      localStorage.setItem('theme', newTheme);
      return { theme: newTheme };
    });
  },

  setLightTheme :() => {
    set((state) => {
      const newTheme: Theme = 'light' 
      updateRootClass(newTheme);
      localStorage.setItem('theme', newTheme);
      return { theme: newTheme };
    });
  },
  toggleTheme: () => {
    set((state) => {
      const newTheme: Theme = state.theme === 'light' ? 'dark' : 'light';
      updateRootClass(newTheme);
      localStorage.setItem('theme', newTheme);
      return { theme: newTheme };
    });
  },
}));





