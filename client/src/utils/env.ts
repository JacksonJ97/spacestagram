import { z } from "zod";

const schema = z.object({
  API_BASE_URL: z.url(),
});

export const env = schema.parse({
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
});
