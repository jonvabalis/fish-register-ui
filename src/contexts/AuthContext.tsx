import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { setAuthToken } from "../lib/axiosConfig";
import { decodeJWT } from "../lib/jwtUtils";

interface AuthContextType {
  token: string | null;
  userUUID: string | null;
  role: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(() => {
    const savedToken = localStorage.getItem("authToken");
    setAuthToken(savedToken);
    return savedToken;
  });

  const [userUUID, setUserUUID] = useState<string | null>(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      const decoded = decodeJWT(savedToken);
      return decoded?.userUUID || null;
    }
    return null;
  });

  const [role, setRole] = useState<string | null>(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      const decoded = decodeJWT(savedToken);
      return decoded?.role || null;
    }
    return null;
  });

  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem("authToken", newToken);
      const decoded = decodeJWT(newToken);
      setUserUUID(decoded?.userUUID || null);
      setRole(decoded?.role || null);
    } else {
      localStorage.removeItem("authToken");
      setUserUUID(null);
      setRole(null);
    }
    setAuthToken(newToken);
    setTokenState(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, userUUID, role, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
