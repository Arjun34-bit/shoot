import type { UserRepository } from "../../../domain/interface/UserRepositories.ts";
import type { OTPService } from "../../ports/OtpService.ts";
import type { PasswordHasher } from "../../ports/PasswordHasher.ts";

export class UserLogin {
    private userRepo: UserRepository
    private hasher: PasswordHasher
    private otpService: OTPService

    constructor(
        userRepo: UserRepository,
        hasher: PasswordHasher,
        otpService: OTPService
    ){
        this.userRepo = userRepo,
        this.hasher = hasher,
        this.otpService = otpService
    }

    async execute(data: {
        email: string,
        password: string,
    }){
        const user = await this.userRepo.findByEmail(data.email);

        if (!user) {
            throw new Error("Invalid email or password");
        }

        if (!user.isVerified) {
            throw new Error("Account not verified");
        }

        const compare = await this.hasher.compare(data.password, user.passwordHash);

        if (!compare) {
            throw new Error("Invalid email or password");
        }

        const otp = await this.otpService.generate()

        console.log("---------OTP Generated for Login--------",otp)

        await this.otpService.save(user.id, otp);

        return {
            email: user.email,
        };
    }
}