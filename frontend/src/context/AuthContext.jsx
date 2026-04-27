import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest } from "../hooks/useLogin";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); //  important
  const [error, setError] = useState(null);

  //  Load user on app start
  const STORAGE_KEY = "auth";

  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEY);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  //  Save user when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user)); //  save FULL user
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      const result = await loginRequest(username, password);
      console.log("LOGIN RESULT:", result);
      if (!result.isLoggedIn) {
        setError(result.error || "Login failed");
        setUser(null);
      } else {
        // { user, token, ... }
        setUser({
          user: result.user,
          access: result.access,
          refresh: result.refresh,
        });
      }
    } catch (err) {
      setError("Something went wrong");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
