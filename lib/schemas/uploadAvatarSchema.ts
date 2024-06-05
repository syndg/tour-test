import { z } from "zod";

export const uploadSchema = z.object({
  avatar: z.instanceof(File).refine((file) => file.size < 5 * 1024 * 1024, {
    message: "File is too large",
  }),
});

export type UploadData = z.infer<typeof uploadSchema>;
