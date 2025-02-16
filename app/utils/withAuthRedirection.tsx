'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import FullPageLoader from "../components/common/FullPageLoader";
import Cookies from "js-cookie";

export const withAuthRedirection = (WrappedComponent: React.FC) => {
  const Auth: React.FC = (props) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const accessToken = Cookies.get("access_token");

    useEffect(() => {
      if (isAuthenticated && accessToken) {
        router.push("/");
      }
    }, [isAuthenticated, router]);

    if (isAuthenticated === null) {
      return <FullPageLoader />;
    }
    if (isAuthenticated && accessToken) {
      return null;
    }
    return <WrappedComponent {...props} />;
  };
  return Auth;
};
