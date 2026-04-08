import { z } from "zod";

export const likePostSchema = z.object({
  date: z.iso.date(),
  title: z.string().min(1),
  url: z.string().min(1),
});
