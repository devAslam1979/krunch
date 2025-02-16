import { z } from "zod";

const phoneRegex = new RegExp("^[6-9][0-9]{9}$");
const PhoneSchema = z
  .string()
  .regex(phoneRegex, "Please enter a valid mobile number.")
  .length(10, "Please enter a valid mobile number.");

export const LoginSchema = z.object({
  phone: PhoneSchema,
});

export type LoginFormData = z.infer<typeof LoginSchema>;
