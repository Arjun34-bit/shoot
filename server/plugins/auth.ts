// plugins/auth.ts
import fp from "fastify-plugin";
import { buildAuthService } from "../composition/auth.composition.ts";
import { AuthController } from "../presentation/http/controllers/AuthController.ts";

export default fp(async (fastify) => {
  const authService = await buildAuthService(fastify);
  const authController = new AuthController(authService);

  fastify.decorate("authController", authController);
});