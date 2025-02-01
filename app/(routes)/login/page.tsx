"use client";
// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { LoginFormData, LoginSchema } from "@/app/schema/loginSchema";
// import api from "@/app/utils/axiosInstance";
// import Cookies from "js-cookie";
// import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
// import { useAuth } from "@/app/context/AuthProvider";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "@/redux/store";
// import { setUser } from "@/redux/slices/userSlice";
// import { useSearchParams } from "next/navigation";
// import { API_ENDPOINTS } from "@/app/constants/apiEndpoints";
// import { withAuthRedirection } from "@/app/utils/withAuthRedirection";

const LoginPage = () => {
  // const router = useRouter();
  // const dispatch = useDispatch<AppDispatch>();
  // const { setAuth } = useAuth();
  // const [apiError, setApiError] = useState<string | null>(null);
  // const [showPassword, setShowPassword] = useState(false);

  // const searchParams = useSearchParams();
  // const tournament_id = searchParams.get("tournament_id");
  // const slot_id = searchParams.get("slot_id");
  // const redirect = searchParams.get("redirect") || "/";

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isSubmitting },
  // } = useForm<LoginFormData>({
  //   resolver: zodResolver(LoginSchema),
  // });

  // const onSubmit = async (data: LoginFormData) => {
  //   setApiError(null);
  //   try {
  //     const res = await api.post(API_ENDPOINTS.LOGIN, data);
  //     if (res.status === 200) {
  //       const { access, refresh } = res.data.data;
  //       Cookies.set("access_token", access, {
  //         expires: 0.0208, // 30 minutes expressed in days (30 minutes = 1/48 of a day)
  //         secure: true,
  //       });
  //       Cookies.set("refresh_token", refresh, {
  //         expires: 7,
  //         secure: true,
  //       });
  //       setAuth(true);
  //       const userRes = await api.get(API_ENDPOINTS.GET_USER);
  //       if (userRes.status === 200) {
  //         dispatch(setUser(userRes?.data?.data));
  //       }
  //       const redirectPath =
  //         tournament_id && slot_id
  //           ? `/?tournament_id=${tournament_id}&slot_id=${slot_id}`
  //           : redirect;
  //       router.push(redirectPath);
  //     } else {
  //       setApiError("Login failed. Please try again.");
  //     }
  //   } catch (error: any) {
  //     setApiError(
  //       error?.response?.data?.message || "An error occurred. Please try again."
  //     );
  //   }
  // };

  return (
    <div className="min-h-[calc(100vh-84px)] flex items-center justify-center">
      <div className=" py-8 px-20 rounded-lg shadow-md w-[560px] bg-[#141517]">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Login to your Account
        </h2>

        {/* {apiError && (
          <div className="mb-4 p-2 bg-red-500 text-white rounded">
            {apiError}
          </div>
        )} */}

        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        {/* <form>
          <div className="mb-4">
            <label className="block font-medium leading-6 text-white mb-2">
              Email / Mobile
            </label>
            <input
              type="text"
              className="w-full p-2 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-black"
              placeholder="Enter your email / mobile"
              {...register("login_identifier")}
            />
            {errors.login_identifier && (
              <p className="text-red-500 text-sm mt-1">
                {errors.login_identifier.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <label className="block font-medium leading-6 text-white mb-2">
                Password
              </label>
              <div className="text-sm">
                <Link
                  href={`/forgot-password${
                    tournament_id && slot_id
                      ? `?tournament_id=${tournament_id}&slot_id=${slot_id}`
                      : ""
                  }`}
                  className="font-medium text-red-500 hover:underline "
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-2 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                placeholder="Create a password"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
              >
                {showPassword ? (
                  <EyeIcon
                    aria-hidden="true"
                    className="ml-2 h-5 w-5 text-black text-medium"
                  />
                ) : (
                  <EyeSlashIcon
                    aria-hidden="true"
                    className="ml-2 h-5 w-5 text-black text-medium"
                  />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Login..." : "Login"}
            </button>
          </div>
        </form> */}
      </div>
    </div>
  );
};
// export default withAuthRedirection(LoginPage);
export default LoginPage;
