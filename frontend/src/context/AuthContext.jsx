import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest } from "../hooks/useLogin";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); //  important
  const [error, setError] = useState(null);

  //  Load user on app start
  useEffect(() => {
    const savedUser = localStorage.getItem("City_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  //  Save user when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("City_user", JSON.stringify(user)); //  save FULL user
    } else {
      localStorage.removeItem("City_user");
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const result = await loginRequest(email, password);

      if (!result.isLoggedIn) {
        setError(result.error || "Login failed");
        setUser(null);
      } else {
        setUser(result.user); // { id, role, token, ... }
      }
    } catch (err) {
      setError("Something went wrong");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
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
