"use client";
import { useForm } from "react-hook-form";
import { use, useEffect, useState } from "react";
import { SignupFormData, SignupSchema } from "@/app/schema/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import VerifyOtp from "@/app/components/verifyOtp";
import { handleNumericInput } from "@/app/utils/helper";
import Image from "next/image";
import MovingBanner from "@/app/components/movingBanner";
import api from "@/app/utils/axiosInstance";
import { API_ENDPOINTS } from "@/app/constants/apiEndpoints";
import { LoginFormData, LoginSchema } from "@/app/schema/loginSchema";
import { withAuthRedirection } from "@/app/utils/withAuthRedirection";
import FullPageLoader from "@/app/components/common/FullPageLoader";

const LoginPage = () => {
  const [apiError, setApiError] = useState<string | null>(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [signupData, setSignupData] = useState<any>({});
  const [loginData, setLoginData] = useState<any>({});
  const [activeButton, setActiveButton] = useState<"login" | "signup">("login");
  const [banner, setBanner] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchBanner = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(API_ENDPOINTS.AUTH_BANNER);
      if (response.status === 200) {
        setBanner(response?.data);
      }
      setIsLoading(false);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors, isSubmitting: signupIsSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema),
  });

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors, isSubmitting: loginIsSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSignupSubmit = async (data: SignupFormData) => {
    setApiError(null);
    try {
      const response = await api.post(API_ENDPOINTS.SIGNUP_VERIFY, data);
      if (response.status === 200) {
        setSignupData({ ...data, otp_id: response?.data?.data?.otp_id });
        setIsOtpSent(true);
      } else {
        setApiError(response?.data?.message);
      }
    } catch (error: any) {
      setApiError(error?.response?.data?.message);
    }
  };
  const onLoginSubmit = async (data: LoginFormData) => {
    setApiError(null);
    try {
      const response = await api.post(API_ENDPOINTS.LOGIN_VERIFY, data);
      if (response.status === 200) {
        setLoginData({ ...data, otp_id: response?.data?.data?.otp_id });
        setIsOtpSent(true);
      } else {
        setApiError(response?.data?.message);
      }
    } catch (error: any) {
      setApiError(error?.response?.data?.message);
    }
  };

  if (isLoading) {
    return (
      <div>
        <FullPageLoader />
      </div>
    );
  }
  console.log("banner", baseUrl + banner?.[0]?.image);

  return (
    <div className="overflow-y-auto  h-full">
      <div className="relative w-full h-[208px] ">
        <Image src={`${baseUrl}${banner?.[0]?.image}`} alt="img" fill />
      </div>
      <MovingBanner text="Welcome to Krunch! Get amazing deals now!" />
      {!isOtpSent ? (
        <div className="flex flex-col justify-center my-3 bg-orange-400 py-5 mx-3 rounded-[20px]">
          <div className="flex justify-center items-center">
            <div className="bg-slate-600 rounded-full flex">
              <button
                className={`text-white text-base font-semibold rounded-full py-2.5 px-10 transition-colors ${
                  activeButton === "login" && "bg-red-600"
                }`}
                onClick={() => setActiveButton("login")}
              >
                Login
              </button>
              <button
                className={`text-white text-base font-semibold rounded-full py-2.5 px-10 transition-colors ${
                  activeButton === "signup" && "bg-red-600"
                }`}
                onClick={() => setActiveButton("signup")}
              >
                Signup
              </button>
            </div>
          </div>

          <div className=" py-5 px-5 w-full">
            {apiError && (
              <div className="mb-4 p-2 bg-red-500 text-white rounded">
                {apiError}
              </div>
            )}

            {activeButton === "login" ? (
              <form onSubmit={handleLoginSubmit(onLoginSubmit)}>
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Image
                      src="/icons/flag.svg"
                      alt="logo"
                      height={24}
                      width={24}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex item-center w-full  bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-black">
                      <span className="py-2 pl-2">+91</span>
                      <input
                        type="text"
                        maxLength={10}
                        className="w-full p-2 bg-transparent outline-none focus:ring-0  text-black"
                        placeholder="Enter your mobile number"
                        {...loginRegister("phone")}
                        onInput={handleNumericInput}
                      />
                    </div>
                    {loginErrors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {loginErrors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex justify-center items-center">
                  <button
                    type="submit"
                    // disabled={loginIsSubmitting}
                    className="flex w-fit justify-center text-base rounded-full px-12 py-2.5 font-semibold leading-6 text-white shadow-sm bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loginIsSubmitting ? "Loading..." : "Login"}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSignupSubmit(onSignupSubmit)}>
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex items-center justify-end text-white">
                    <Image
                      src="/icons/user.svg"
                      alt="logo"
                      height={24}
                      width={24}
                    />
                  </div>
                  <div className="flex-1 ">
                    <input
                      type="text"
                      className="w-full p-2 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                      placeholder="Enter your name"
                      {...signupRegister("name")}
                    />
                    {signupErrors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {signupErrors.name.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Image
                      src="/icons/flag.svg"
                      alt="logo"
                      height={24}
                      width={24}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex item-center w-full  bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-black">
                      <span className="py-2 pl-2">+91</span>
                      <input
                        type="text"
                        maxLength={10}
                        className="w-full p-2 bg-transparent outline-none focus:ring-0  text-black"
                        placeholder="Enter your mobile number"
                        {...signupRegister("phone")}
                        onInput={handleNumericInput}
                      />
                    </div>
                    {signupErrors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {signupErrors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex justify-center items-center">
                  <button
                    type="submit"
                    disabled={signupIsSubmitting}
                    className="flex w-fit justify-center text-base rounded-full px-12 py-2.5 font-semibold leading-6 text-white shadow-sm bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {signupIsSubmitting ? "Loading..." : "Signup"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : (
        <VerifyOtp
          setIsOtpSent={setIsOtpSent}
          data={activeButton === "login" ? loginData : signupData}
          activeButton={activeButton}
        />
      )}

      <div className="relative w-full h-[208px] ">
        <Image src={`${baseUrl}${banner?.[1]?.image}`} alt="img" fill />
      </div>
    </div>
  );
};

export default withAuthRedirection(LoginPage);
