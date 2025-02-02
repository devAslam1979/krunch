"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { SignupFormData, SignupSchema } from "@/app/schema/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import VerifyOtp from "@/app/components/verifyOtp";
import { handleNumericInput } from "@/app/utils/helper";
import Image from "next/image";
import MovingBanner from "@/app/components/movingBanner";
// import api from "@/app/utils/axiosInstance";
// import { useSearchParams } from "next/navigation";
// import { API_ENDPOINTS } from "@/app/constants/apiEndpoints";
// import { withAuthRedirection } from "@/app/utils/withAuthRedirection";

const SignupPage = () => {
  // const [apiError, setApiError] = useState<string | null>(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [signupData, setSignupData] = useState<any>({});
  const [activeButton, setActiveButton] = useState<"login" | "signup">("login");

  const handleOTP = () => {
    setIsOtpSent(true);
  };
  // const [showPassword, setShowPassword] = useState(false);

  // const searchParamas = useSearchParams();
  // const tournament_id = searchParamas.get("tournament_id");
  // const slot_id = searchParamas.get("slot_id");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema),
  });

  // const onSubmit = async (data: SignupFormData) => {
  //   setApiError(null);
  //   try {
  //     const response = await api.post(API_ENDPOINTS.SIGNUP_VERIFY, data);
  //     if (response.status === 200) {
  //       setSignupData({ ...data, otp_id: response?.data?.data?.otp_id });
  //       setIsOtpSent(true);
  //     } else {
  //       setApiError(response?.data?.message);
  //     }
  //   } catch (error: any) {
  //     setApiError(error?.response?.data?.message);
  //   }
  // };

  return (
    <div className="overflow-y-auto">
      <div className="relative w-full h-[170px] ">
        <Image src="/images/img1.jpg" alt="logo" fill />
      </div>
      <MovingBanner text="Welcome to Krunch! Get amazing deals now!" />
      {!isOtpSent ? (
        <div className="flex flex-col justify-center my-3 bg-slate-800 py-5 mx-3 rounded-[20px]">
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
            {/* {apiError && (
            <div className="mb-4 p-2 bg-red-500 text-white rounded">
              {apiError}
            </div>
          )} */}

            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <form>
              {activeButton === "signup" && (
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex items-center justify-end text-white">
                    <Image
                      src="/icons/user.svg"
                      alt="logo"
                      height={24}
                      width={24}
                    />

                    {/* <span>+91</span> */}
                  </div>
                  <div className="flex-1 ">
                    {/* <label className="block font-medium leading-6 text-white mb-2">
                    Name
                  </label> */}
                    <input
                      type="text"
                      className="w-full p-2 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                      placeholder="Enter your name"
                      {...register("name")}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              )}
              <div className="mb-4 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Image
                    src="/icons/flag.svg"
                    alt="logo"
                    height={24}
                    width={24}
                  />
                  {/* <span className="text-white">+91</span> */}
                </div>
                <div className="flex-1">
                  {/* <label className="block font-medium leading-6 text-white mb-2">
                    Mobile
                  </label> */}
                  <div className="flex item-center w-full  bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-black">
                    <span className="py-2 pl-2">+91</span>
                    <input
                      type="text"
                      maxLength={10}
                      className="w-full p-2 bg-transparent outline-none focus:ring-0  text-black"
                      placeholder="Enter your mobile number"
                      {...register("phone")}
                      onInput={handleNumericInput}
                    />
                  </div>
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="mt-6 flex justify-center items-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={handleOTP}
                  className="flex w-fit justify-center text-base rounded-full bg-gray-500 px-12 py-2.5 font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting
                    ? "Loading..."
                    : activeButton === "login"
                    ? "Login"
                    : "Signup"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <VerifyOtp setIsOtpSent={setIsOtpSent} signupData={signupData} />
      )}

      <div className="relative w-full h-[170px] ">
        <Image src="/images/hero1.jpg" alt="logo" fill />
      </div>
    </div>
  );
};

export default SignupPage;
// export default withAuthRedirection(SignupPage);
