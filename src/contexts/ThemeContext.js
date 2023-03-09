import React from "react";

const defaultValue = {
  theme: "light",
  toggleTheme: () => {},
};

const ThemeContext = React.createContext(defaultValue);

export const ThemeProvider = ThemeContext.Provider;
export const ThemeConsumer = ThemeContext.Consumer;

export default ThemeContext;
