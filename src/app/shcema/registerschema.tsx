import * as zod from "zod";

export const registerSchema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .regex(/^[a-zA-Z][a-zA-Z'\-\s]*[a-zA-Z]$/, "Please enter a valid name"),

    email: zod
      .string()
      .nonempty("email is required")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid Email",
      ),

    password: zod
      .string()
      .nonempty("password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Invalid password",
      ),

    rePassword: zod.string().nonempty("rePassword is required"),

    phone: zod
      .string()
      .nonempty("phone is required")
      .regex(/^01[0125][0-9]{8}$/, "invalid phone number"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "invalid rePassword",
  });
