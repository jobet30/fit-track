import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async (token) => {
    try {
      const response = await axios.get("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Error fetching user data: ", err);
      setError(err.response ? err.response.data.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (email, password) => {
    try {
      const response = await axios.post("api/register", { email, password });
      const { user, token } = response.data;
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (err) {
      handleError(err);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post("/api/login");
      const { user, token } = response.data;
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (err) {
      handleError(err);
    }
  };

  const logoutUser = async () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };

  const handleError = (err) => {
    setError(err.response ? err.response.data.message : "An error occurred");
    setLoading(false);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated,
        registerUser,
        loginUser,
        logoutUser,
        clearError,
      }}
    >
      {loading ? <div>loading...</div> : children}
      {error && <div className="error">{error}</div>}
    </AuthContext.Provider>
  );
};
