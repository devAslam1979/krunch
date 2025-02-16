import { LoginFormData } from "../schema/loginSchema";
import { SignupFormData } from "../schema/signupSchema";

export interface SocialIcon {
  image: string;
  link: string;
}

export type User = {
  user_id: string;
  name: string;
  phone: string;
  points: number;
};

export type Sales = {
  id: string;
  date: string;
  amount: number;
  type: "debit" | "credit";
};

export type SalesResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Sales[];
};

export type BannerItem = {
  image: string;
};

export type BannerResponse = BannerItem[];

export type SignupData = SignupFormData & {
  otp_id: number;
};

export type LoginData = LoginFormData & {
  otp_id: number;
};
