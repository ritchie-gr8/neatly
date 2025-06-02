import { useState, useEffect, createContext } from "react";
import { authApi } from "@/lib/axios";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleAuthExpired = () => {
      setUser(null);
    };
    window.addEventListener("auth:expired", handleAuthExpired);
    return () => {
      window.removeEventListener("auth:expired", handleAuthExpired);
    };
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await authApi.getMe();
        setUser(res?.user || null);
      } catch (err) {
        console.error("Failed to load user:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (identifier, password) => {
    setLoading(true);
    try {
      const { user } = await authApi.login({ identifier, password });
      setUser(user);
      return { success: true, user };
    } catch (error) {
      setError(error.error || "Failed to login");
      return { success: false, error: error.error || "Failed to login" };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authApi.logout();
      setUser(null);
      window.location.href = "/sign-in";
      return { success: true };
    } catch (err) {
      setError(err.error || "Failed to logout");
      return { success: false, error: err.error || "Failed to logout" };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const { user } = await authApi.signup(userData);
      setUser(user);
      return { success: true, user };
    } catch (err) {
      setError(err.error || "Failed to signup");
      return { success: false, error: err.error || "Failed to signup" };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = (updatedUserData) => {
    if (!user) return { success: false, error: "No user is logged in" };
    
    // Update the user state with the new data
    setUser(prevUser => ({
      ...prevUser,
      ...updatedUserData
    }));
    
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        signup,
        logout,
        updateProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
