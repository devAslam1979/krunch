export const API_ENDPOINTS = {
  LOGIN: "/auth/login",
  LOGIN_VERIFY: "/auth/login-verify",
  SIGNUP: "/auth/signup",
  SIGNUP_VERIFY: "/auth/signup-verify",
  GENERATE_OTP: "/auth/generate-otp",
  GET_USER: "/user",
  REFRESH_TOKEN: "/auth/refresh",
  SOCIAL_ICONS: "/social-icons",
  MENU: "/menu",
  GET_SALES: (page: number) => `/user/sales?page=${page}`,
  HOME_BANNER: "/banners?target=home",
  AUTH_BANNER: "/banners?target=auth",
};
