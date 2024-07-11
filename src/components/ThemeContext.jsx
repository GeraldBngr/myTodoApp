import React, { createContext, useState, useEffect } from 'react';

// Create a context for the theme
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
   // State to manage the current theme, initialized to "light"
  const [theme, setTheme] = useState("light");

  // Retrieve the theme from local storage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Toggle the theme and save to local storage
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};