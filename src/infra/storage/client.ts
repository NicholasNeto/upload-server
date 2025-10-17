import { env } from "@/env"
import { S3Client } from "@aws-sdk/client-s3"

export const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${env.CLAOUDFLARE_ACCOUNT_ID}.r2.claudflarestorage.com`,
  credentials: {
    accessKeyId: env.CLAOUDFLARE_ACCESS_KEY_ID,
    secretAccessKey: env.CLAOUDFLARE_SECRET_ACCESS_KEY,
  },
})
