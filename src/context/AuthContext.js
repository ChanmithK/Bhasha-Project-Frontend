import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const response = await axios.post(
      "https://bhasha-project-backend-production.up.railway.app/api/auth/login",
      {
        email,
        password,
      }
    );
    setUser(response.data);
    localStorage.setItem("user", JSON.stringify(response.data));
  };

  const register = async (username, email, password) => {
    const response = await axios.post(
      "https://bhasha-project-backend-production.up.railway.app/api/auth/register",
      {
        username,
        email,
        password,
      }
    );
    setUser(response.data);
    localStorage.setItem("user", JSON.stringify(response.data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
