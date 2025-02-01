"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import FullPageLoader from "../components/common/FullPageLoader";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const Auth: React.FC = (props) => {
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const accessToken = Cookies.get("access_token");
      if (!accessToken) {
        router.push(`/login?redirect=${pathname}`);
      } else {
        setLoading(false);
      }
    }, [router, pathname]);

    if (loading) {
      return <FullPageLoader />;
    }

    return <WrappedComponent {...props} />;
  };

  return Auth;
};

export default withAuth;
