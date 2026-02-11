import type { UserRepository } from "../../../domain/interface/UserRepositories.ts";
import type { OTPService } from "../../ports/OtpService.ts";
import type { TokenService } from "../../ports/TokenService.ts";

export class UserOtpVerify {
    private userRepo: UserRepository
    private otpService: OTPService
    private tokenService: TokenService

    constructor(userRepo: UserRepository, otpService: OTPService, tokenService: TokenService){
        this.userRepo = userRepo,
        this.otpService = otpService,
        this.tokenService = tokenService
    }

    async execute(data:{
        id: string,
        otp: string
    }){
        const user = await this.userRepo.findById(data.id)

        if (!user) {
            throw new Error("User not found");
        }

        if (!user.isVerified) {
            throw new Error("User not verified");
        }

        const isVerified = await this.otpService.verify(data.id, data.otp)

        if(!isVerified){
            throw new Error("OTP not verified")
        }

        const token = this.tokenService.generate({
            id: user.id,
            email: user.email,
        });

        return {
            status: true,
            token:token,
        }
    }
}