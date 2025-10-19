import React, { createContext, useContext } from "react";
import { ThemeProvider, type Theme } from "@mui/material/styles";
import { blueTheme } from "./ThemeDefinitions";

interface FishContextTheme {
  theme: Theme;
  setTheme: (type: Theme) => void;
}

const ThemeContext = createContext<FishContextTheme>({
  theme: blueTheme,
  setTheme: () => {},
});

export const FishProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeContext.Provider value={{ theme: blueTheme, setTheme: () => {} }}>
      <ThemeProvider theme={blueTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useBerryContext = () => {
  const context = useContext(ThemeContext);

  return context;
};
