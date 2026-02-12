/// <reference path="../../../../types/fastify.d.ts" />
import type { FastifyPluginAsync } from "fastify";

const authRoutes: FastifyPluginAsync = async (fastify) => {
  const authController = fastify.authController;

  fastify.post("/register", authController.register.bind(authController));
  fastify.post("/login", authController.login.bind(authController));
  fastify.post("/verify/:id", authController.verify.bind(authController));
  fastify.post("/verify-otp", authController.verifyOtp.bind(authController));
  fastify.post("/enable-totp", authController.enableTotp.bind(authController));
  fastify.post("/verify-token", authController.verify2FA.bind(authController));
};

export default authRoutes;
