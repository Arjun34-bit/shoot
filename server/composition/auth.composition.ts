import { AuthServiceImpl } from "../application/services/AuthService.ts";
import { UserLogin } from "../application/use-cases/auth/LoginUser.ts";
import { UserRegister } from "../application/use-cases/auth/RegisterUser.ts";
import { UserVerify } from "../application/use-cases/auth/VerifyUser.ts";
import { SequlizeAuthRepo } from "../infrastructure/database/entry/AuthSequelizeRepo.ts";
import { RedisOtpService } from "../infrastructure/cache/RedisOtpService.ts";
import { BcryptHasher } from "../infrastructure/security/BcryptHasher.ts";
import { createRedisClient } from "../infrastructure/redis/redis.ts";
import { UserOtpVerify } from "../application/use-cases/auth/OtpVerify.ts";
import { JWTTokenService } from "../infrastructure/security/JwtAuth.ts";
import type { FastifyInstance } from "fastify";
import { CryptoAlgorithm } from "../infrastructure/security/CryptoSecurity.ts";
import { EnableTotp } from "../application/use-cases/auth/EnableTotp.ts";
import { SpeakeasyOtpAuth } from "../infrastructure/security/SpeakeasyAuth.ts";
import { VerifyToken } from "../application/use-cases/auth/Verify2FAToken.ts";
// import { ElasticUserSearchRepository } from "../infrastructure/search/UserElasticSearchRepository.ts";

export async function buildAuthService(fastify: FastifyInstance) {
  const redis = await createRedisClient();
  const algo = "aes-256-gcm";
  const SECRET_KEY = process.env.CRYPTO_SECRET!;
  //   const userSearchRepo = new ElasticUserSearchRepository();

  const jwtToken = new JWTTokenService(fastify.jwt);
  const userRepo = new SequlizeAuthRepo();
  const bcryptHash = new BcryptHasher();
  const otpService = new RedisOtpService(redis);
  const secureTextService = new CryptoAlgorithm(algo, SECRET_KEY); // Encrypt and Decrypt Text
  const totpService = new SpeakeasyOtpAuth(); // 2FA

  const loginUser = new UserLogin(userRepo, bcryptHash, otpService);
  const registerUser = new UserRegister(userRepo, bcryptHash);
  const verifyUser = new UserVerify(userRepo);
  const verifyOTP = new UserOtpVerify(userRepo, otpService, jwtToken);
  const enableTotp = new EnableTotp(userRepo, totpService, secureTextService); // 2FA
  const verifyToken = new VerifyToken(userRepo, secureTextService, totpService);

  return new AuthServiceImpl(
    loginUser,
    registerUser,
    verifyUser,
    verifyOTP,
    enableTotp,
    verifyToken,
  );
}
