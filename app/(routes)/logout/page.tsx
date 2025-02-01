"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";
// import { useAuth } from "@/app/context/AuthProvider";

const LogoutPage = () => {
  const router = useRouter();
  // const { setAuth } = useAuth();

  // useEffect(() => {
  //   Cookies.remove("access_token");
  //   Cookies.remove("refresh_token");
  //   setAuth(false);
  //   router.push("/");
  // }, [router, setAuth]);

  return null;
};

export default LogoutPage;
