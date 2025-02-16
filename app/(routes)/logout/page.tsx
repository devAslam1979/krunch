"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAuth } from "@/app/context/AuthProvider";
import { useEffect } from "react";

const LogoutPage = () => {
  const router = useRouter();
  const { setAuth } = useAuth();

  useEffect(() => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    setAuth(false);
    router.push("/login");
  }, [router, setAuth]);

  return null;
};

export default LogoutPage;
