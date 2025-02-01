"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import OtpInput from "react-otp-input";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useForm, Controller } from "react-hook-form";
import { SignupFormData } from "@/app/schema/signupSchema";
// import { toast } from "react-toastify";
// import Cookies from "js-cookie";
// import { useAuth } from "@/app/context/AuthProvider";
// import api from "@/app/utils/axiosInstance";
import { handleNumericInput } from "@/app/utils/helper";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "@/redux/store";
// import { setUser } from "@/redux/slices/userSlice";
// import { API_ENDPOINTS } from "@/app/constants/apiEndpoints";

interface FormData {
  otp: string;
}

interface VerifyOtpProps {
  setIsOtpSent: (value: boolean) => void;
  signupData: SignupFormData;
}

const VerifyOtp = ({ setIsOtpSent, signupData }: VerifyOtpProps) => {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  // const { setAuth } = useAuth();
  // const dispatch = useDispatch<AppDispatch>();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: any) => {
    setApiError(null);
    // try {
    //   const res = await api.post(API_ENDPOINTS.SIGNUP, {
    //     ...data,
    //     ...signupData,
    //   });
    //   if (res.status === 200) {
    //     const { access_token, refresh_token } = res.data.data;
    //     Cookies.set("access_token", access_token, {
    //       expires: 0.0208, // 30 minutes expressed in days (30 minutes = 1/48 of a day)
    //       secure: true,
    //     });
    //     Cookies.set("refresh_token", refresh_token, {
    //       expires: 7,
    //       secure: true,
    //     });
    //     setAuth(true);
    //     const userRes = await api.get(API_ENDPOINTS.GET_USER);
    //     if (userRes.status === 200) {
    //       dispatch(setUser(userRes?.data?.data));
    //     }
    //     const redirectPath =
    //       tournament_id && slot_id
    //         ? `/?tournament_id=${tournament_id}&slot_id=${slot_id}`
    //         : "/";
    //     router.push(redirectPath);
    //     toast.success("Account created successfully!", {
    //       position: "top-right",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     });
    //   } else {
    //     setApiError("Signup failed. Please try again.");
    //   }
    // } catch (error: any) {
    //   setApiError(
    //     error?.response?.data?.message || "An error occurred. Please try again."
    //   );
    // }
  };

  const handleResendOtp = async () => {
    setCountdown(30);
    setIsResendDisabled(true);
    // try {
    //   const res = await api.post(API_ENDPOINTS.GENERATE_OTP, {
    //     email: signupData.email,
    //   });
    //   if (res.status === 200) {
    //     toast.success("OTP sent successfully on your email!", {
    //       position: "top-right",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     });
    //   }
    // } catch (error: any) {
    //   setApiError(
    //     error?.response?.data?.message || "An error occurred. Please try again."
    //   );
    // }
  };

  useEffect(() => {
    if (countdown === 0) {
      setIsResendDisabled(false);
      return;
    }

    const timerId = setTimeout(() => setCountdown(countdown - 1), 1000);

    return () => clearTimeout(timerId);
  }, [countdown]);

  return (
    <div className="flex flex-col items-center justify-center py-8 px-20 rounded-lg shadow-md w-[560px] bg-[#0a1228]">
      <h2 className="text-2xl font-bold text-center text-white mb-6">
        Enter Verification Code
      </h2>
      <div className="mb-6">
        <p className="text-white text-center mb-4">
          We have sent a verification code on your email
        </p>
        <div className="flex justify-center">
          <span className="text-white font-bold text-xl">
            {signupData?.phone}
          </span>
          <PencilSquareIcon
            aria-hidden="true"
            className="h-6 w-6 shrink-0 font-semibold text-white ml-3 cursor-pointer hover:text-red-500 transition-all"
            onClick={() => setIsOtpSent(false)}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-8 px-12">
          <Controller
            name="otp"
            control={control}
            rules={{
              required: "OTP is required",
              minLength: { value: 4, message: "OTP must be 4 digits" },
            }}
            render={({ field }) => (
              <OtpInput
                {...field}
                value={field.value}
                onChange={field.onChange}
                numInputs={4}
                renderInput={(props) => (
                  <input {...props} onInput={handleNumericInput} />
                )}
                shouldAutoFocus
                containerStyle="space-x-2"
                inputStyle={{
                  borderColor: "#000000",
                  borderWidth: 1,
                  borderStyle: "solid",
                  color: "#000000",
                  width: "50px",
                  height: "50px",
                  fontSize: "20px",
                  borderRadius: "5px",
                }}
              />
            )}
          />
          {errors.otp && (
            <p className="text-red-500 text-center mt-2">
              {errors.otp.message}
            </p>
          )}
        </div>

        {apiError && (
          <p className="text-red-500 text-center mb-4">{apiError}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      <div className="text-center mt-6">
        {isResendDisabled ? (
          <p className="text-white">Resend OTP in {countdown} seconds</p>
        ) : (
          <button
            className="text-white underline"
            onClick={handleResendOtp}
            disabled={isResendDisabled}
          >
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyOtp;
