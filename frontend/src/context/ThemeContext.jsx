import { createContext, useContext, useEffect, useReducer } from "react";

export const ThemeContext = createContext(null);

/* ================= REDUCER ================= */
const themeReducer = (state, action) => {
  switch (action.type) {
    case "SET_THEME":
      return {
        ...state,
        theme: action.payload,
      };

    default:
      return state;
  }
};

/* ================= GET INITIAL THEME ================= */
const getInitialTheme = () => {
  if (typeof window === "undefined") return "light";

  const savedTheme = localStorage.getItem("CEXtheme");
  return savedTheme ? savedTheme : "light";
};

/* ================= PROVIDER ================= */
export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, {
    theme: getInitialTheme(), //  load from localStorage
  });

  /* ================= SYNC WITH DOM & STORAGE ================= */
  useEffect(() => {
    const root = document.documentElement;

    if (state.theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // ✅ persist theme
    localStorage.setItem("CEXtheme", state.theme);
  }, [state.theme]);

  /* ================= ACTIONS ================= */
  const changeTheme = (theme) => {
    dispatch({ type: "SET_THEME", payload: theme });
  };

  const toggleTheme = () => {
    dispatch({
      type: "SET_THEME",
      payload: state.theme === "dark" ? "light" : "dark",
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: state.theme,
        changeTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

/* ================= CUSTOM HOOK ================= */
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
};
