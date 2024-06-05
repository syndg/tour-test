import { z } from "zod";

export const onboardingProfileUpdateSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  username: z.string().min(1, "Username is required"),
});

export type OnboardingProfileUpdate = z.infer<
  typeof onboardingProfileUpdateSchema
>;
