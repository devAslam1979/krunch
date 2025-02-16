"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import { setUser } from "@/redux/slices/userSlice";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import api from "../utils/axiosInstance";
import { useDispatch } from "react-redux";

const AuthContext = createContext<{
  isAuthenticated: boolean | null;
  setAuth: (status: boolean) => void;
}>({
  isAuthenticated: false,
  setAuth: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const dispatch = useDispatch();

  const fetchUser = async () => {
    console.log("fetching user in auth provider");
    const accessToken = Cookies.get("access_token");
    const refreshToken = Cookies.get("refresh_token");

    const handleAuthentication = async (token: string) => {
      try {
        const userRes = await api.get(API_ENDPOINTS.GET_USER, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (userRes.status === 200) {
          dispatch(setUser(userRes?.data?.data));
          setIsAuthenticated(true);
          return true;
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
      return false;
    };

    if (accessToken && (await handleAuthentication(accessToken))) {
      return;
    }

    if (refreshToken) {
      try {
        const tokenRes = await api.post(API_ENDPOINTS.REFRESH_TOKEN, {
          refresh_token: refreshToken,
        });
        if (tokenRes.status === 200) {
          const {
            access_token: newAccessToken,
            refresh_token: newRefreshToken,
          } = tokenRes?.data?.data;
          Cookies.set("access_token", newAccessToken, {
            expires: 0.0208, // 30 minutes
            secure: true,
          });
          Cookies.set("refresh_token", newRefreshToken, {
            expires: 7, // 7 days
            secure: true,
          });
          if (await handleAuthentication(newAccessToken)) {
            return;
          }
        }
      } catch (error) {
        console.log("Error refreshing token:", error);
      }
    }

    // If everything fails, clear tokens and log out the user
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    setIsAuthenticated(false);
    dispatch(setUser(null));
  };

  useEffect(() => {
    console.log("auth provider useEffect");
    fetchUser();
  }, [dispatch]);

  const setAuth = (status: boolean) => {
    setIsAuthenticated(status);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
