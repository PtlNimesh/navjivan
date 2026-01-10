import React, { createContext, useState, useContext, useEffect } from "react";
import { API_ENDPOINTS } from "../config/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Restore auth state from localStorage on app load
  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setIsAuthenticated(true);
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setAuthLoading(false); // Auth check complete
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();

      if (data.message === "Login successful!") {
        setIsAuthenticated(true);
        setToken(data.token || "auth-token");
        setUser(username);

        // store token in localStorage (optional)
        localStorage.setItem("authToken", data.token || "auth-token");
        localStorage.setItem("user", JSON.stringify(username));

        return true;
      }

      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setUser(null);

    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, user, login, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
