import { db } from "@/infra/db"
import { schema } from "@/infra/db/schemas"
import { Readable } from "node:stream"
import { z } from "zod"

const allowedMimeTypes = ["image/jpg", "image/jpeg", "image/png", "image/webp"]

const uploadImageInput = z.object({
  fileName: z.string(),
  contentType: z.string(),
  contentStream: z.instanceof(Readable),
})

type UploadImageInput = z.input<typeof uploadImageInput>

export async function uploadImage(input: UploadImageInput) {
  const { contentStream, contentType, fileName } = uploadImageInput.parse(input)

  if (!allowedMimeTypes.includes(contentType)) {
    throw new Error("Invalid file format.")
  }

  await db.insert(schema.uploads).values({
    name: fileName,
    remoteKey: fileName,
    remoteUrl: fileName,
  })
}
