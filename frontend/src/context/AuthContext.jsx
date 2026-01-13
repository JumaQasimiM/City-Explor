import { createContext, useContext, useState } from "react";
import { loginRequest } from "../hooks/useLogin";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const result = await loginRequest(email, password);

      if (!result.isLoggedIn) {
        setError(result.error || "Login failed");
        setUser(null);
      } else {
        setUser(result.user);
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

export const useAuth = () => useContext(AuthContext);
