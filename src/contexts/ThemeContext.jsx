import { Children } from "react";
import { useState, useEffect, createContext, useContext } from "react";
const ThemeContext = createContext();

//LocalStorage ;
const LOCAL_STORAGE_KEY = "theme-mode";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const localTheme = localStorage.getItem(LOCAL_STORAGE_KEY);
    return localTheme || "light";
  });
  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };
  const contextValue = {
    theme,
    toggleTheme,
  };
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, theme);

    document.body.className = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
