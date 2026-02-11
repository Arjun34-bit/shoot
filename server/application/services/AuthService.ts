import type { AuthServices } from "../../presentation/AuthInterface.ts";
import type { EnableTotpPayload, LoginCredentials, OTPPayload, RegisterUser, TotpPayload, VerifyPayload, VerifyTokenPayload } from "../../types/AuthTypes.ts";
import type { EnableTotp } from "../use-cases/auth/EnableTotp.ts";
import type { UserLogin } from "../use-cases/auth/LoginUser.ts";
import type { UserOtpVerify } from "../use-cases/auth/OtpVerify.ts";
import type { UserRegister } from "../use-cases/auth/RegisterUser.ts";
import type { VerifyToken } from "../use-cases/auth/Verify2FAToken.ts";
import type { UserVerify } from "../use-cases/auth/VerifyUser.ts";

export class AuthServiceImpl implements AuthServices {
  private loginUser: UserLogin;
  private registerUser: UserRegister
  private verifyUser: UserVerify
  private verifyOtp: UserOtpVerify
  private enableTOtp: EnableTotp
  private verify2FA: VerifyToken
  constructor(
    loginUser: UserLogin, registerUser: UserRegister, verifyUser: UserVerify, verifyOtp: UserOtpVerify,
    enableTOtp: EnableTotp, verify2FA: VerifyToken
  ) {
    this.loginUser = loginUser;
    this.registerUser = registerUser;
    this.verifyUser = verifyUser;
    this.verifyOtp = verifyOtp;
    this.enableTOtp = enableTOtp
    this.verify2FA = verify2FA
  }

  async login(data: LoginCredentials) {
    await this.loginUser.execute(data);
  }

  async register(data: RegisterUser) {
    await this.registerUser.execute(data);
  }

  async verify(data: VerifyPayload) {
    await this.verifyUser.execute(data);
  }

  async verifyOTP(data: OTPPayload): Promise<{ status: boolean; token: string; }>{
    return await this.verifyOtp.execute(data)
  }

  async enableTotp(data: EnableTotpPayload): Promise<TotpPayload>{
    return await this.enableTOtp.execute(data)
  }

  async verify2FAToken(data: VerifyTokenPayload): Promise<boolean>{
    return await this.verify2FA.execute(data)
  }
}
