"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { SignupFormData, SignupSchema } from "@/app/schema/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import VerifyOtp from "@/app/components/verifyOtp";
import { handleNumericInput } from "@/app/utils/helper";
import Image from "next/image";
// import api from "@/app/utils/axiosInstance";
// import { useSearchParams } from "next/navigation";
// import { API_ENDPOINTS } from "@/app/constants/apiEndpoints";
// import { withAuthRedirection } from "@/app/utils/withAuthRedirection";

const SignupPage = () => {
  // const [apiError, setApiError] = useState<string | null>(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [signupData, setSignupData] = useState<any>({});
  const [activeButton, setActiveButton] = useState<"login" | "signup">("login");
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
      <div className="h-10 bg-orange-400"></div>
      <div className="flex flex-col justify-center my-3 bg-slate-800 py-5 mx-3 rounded-[20px]">
        <div className="flex justify-center items-center">
          <div className="bg-red-600 rounded-full flex">
            <button
              className={`text-white text-lg font-semibold rounded-full py-2.5 px-10 transition-colors ${
                activeButton === "login" && "bg-blue-600"
              }`}
              onClick={() => setActiveButton("login")}
            >
              Login
            </button>
            <button
              className={`text-white text-lg font-semibold rounded-full py-2.5 px-10 transition-colors ${
                activeButton === "signup" && "bg-blue-600"
              }`}
              onClick={() => setActiveButton("signup")}
            >
              Signup
            </button>
          </div>
        </div>
        {!isOtpSent ? (
          <div className=" py-5 px-10 w-full">
            {/* {apiError && (
            <div className="mb-4 p-2 bg-red-500 text-white rounded">
              {apiError}
            </div>
          )} */}

            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <form>
              <div className="mb-4">
                <label className="block font-medium leading-6 text-white mb-2">
                  Mobile
                </label>
                <input
                  type="text"
                  maxLength={10}
                  className="w-full p-2 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                  placeholder="Enter your mobile number"
                  {...register("phone")}
                  onInput={handleNumericInput}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block font-medium leading-6 text-white mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                  placeholder="Enter your name"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full justify-center rounded-full bg-gray-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Sending OTP..." : "Send OTP"}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <VerifyOtp setIsOtpSent={setIsOtpSent} signupData={signupData} />
        )}
      </div>

      <div className="relative w-full h-[170px] ">
        <Image src="/images/hero1.jpg" alt="logo" fill />
      </div>
    </div>
  );
};

export default SignupPage;
// export default withAuthRedirection(SignupPage);
