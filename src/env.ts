import { z } from "zod"

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(["development", "test", "production"]).default("production"),
  DATABASE_URL: z.string().url().startsWith("postgresql://"),
  CLAOUDFLARE_ACCOUNT_ID: z.string(),
  CLAOUDFLARE_ACCESS_KEY_ID: z.string(),
  CLAOUDFLARE_SECRET_ACCESS_KEY: z.string(),
  CLAOUDFLARE_BUCKETE: z.string(),
  CLAOUDFLARE_PUBLIC_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)
