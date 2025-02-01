import { z } from "zod";

const phoneRegex = new RegExp("^[1-9][0-9]{9}$");
const PhoneSchema = z
  .string({ invalid_type_error: "Phone Number is required" })
  .min(1, { message: "Phone Number is required" })
  .max(10, { message: "Invalid Number" })
  .regex(phoneRegex, "Invalid Number");

export const SignupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: PhoneSchema,
});

export type SignupFormData = z.infer<typeof SignupSchema>;
