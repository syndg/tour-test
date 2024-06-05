import { z } from "zod";

export const updateProfileSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  username: z.string().min(1, "Username is required"),
  bio: z.string().optional(),
  role: z.string().optional(),
});

export type UpdateProfileData = z.infer<typeof updateProfileSchema>;
