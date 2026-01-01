import { createContext, useContext, useEffect, useReducer } from "react";

export const ThemeContext = createContext(null);

// use reducer ---
// because theme is a global state with predictable transitions
// , and useReducer helps keep the logic centralized and scalable
export function themeReducer(state, action) {
  switch (action.type) {
    case "CHANGE_THEME":
      return {
        ...state, // color = "light"
        color: action.payload,
      };

    default:
      return state;
  }
}

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, { color: "light" });

  //
  useEffect(() => {
    if (state.color === "light") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [state.color]);

  //   change the theme
  const changeTheme = (theme) => {
    // theme get from user / change use the theme
    dispatch({ type: "CHANGE_THEME", payload: theme });
  };

  return (
    <ThemeContext.Provider value={{ ...state, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// custom hook
export const useTheme = () => {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error("useTheme must be used inside a ThemeProvider");
  }

  return theme;
};
