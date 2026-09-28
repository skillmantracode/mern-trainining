import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { loginUser, logout, getMe } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    me();
  }, []);

async function login(payload) {
  setLoading(true);

  try {
    await loginUser(payload);
    await me();
  } catch (error) {
    setUser(null);
    setIsLoggedin(false);

    throw error;
  } finally {
    setLoading(false);
  }
}

  async function logoutUser() {
    setLoading(true);
    const res = await logout();
    setIsLoggedin(false);
    setUser(null);
    setLoading(false);
    return true;
  }

  async function me() {
    try {
      const res = await getMe();
      setUser(res.data.user);
      setIsLoggedin(true);
    } catch (error) {
      setUser(null);
      setIsLoggedin(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoggedin, loading, login, me, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
