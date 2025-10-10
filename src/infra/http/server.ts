import { env } from "@/env"
import { fastifyCors } from "@fastify/cors"
import { fastify } from "fastify"
import { fastifyMultipart } from "@fastify/multipart"

import {
  hasZodFastifySchemaValidationErrors,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod"
import { uploadImageRoute } from "./routes/upload-image"
import { fastifySwagger } from "@fastify/swagger"
import { fastifySwaggerUi } from "@fastify/swagger-ui"

const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.setErrorHandler((error, _, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: "Validation error",
      issues: error.validation,
    })
  }

  //Envia o erro p/ alguma ferramenta de observabilidade (Sentry/Datadog/Grafana/OTel)
  console.error(error)
  return reply.status(500).send({ message: "Internal server error" })
})

server.register(fastifyCors, { origin: "*" })

server.register(fastifyMultipart)
server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Upload Server",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
})

server.register(fastifySwaggerUi, {
  routePrefix: "/docs",
})

server.register(uploadImageRoute)

server.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server running !")
})
