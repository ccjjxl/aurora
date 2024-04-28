
import { object, string } from "zod";

export const signInSchema = object({
    name: string({ required_error: "Name is required" })
        .min(1, "Name is required")
        .max(12,"Name is invalid"),
    password: string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(5, "Password must be more than 5 characters")
        .max(12, "Password must be less than 12 characters"),
})