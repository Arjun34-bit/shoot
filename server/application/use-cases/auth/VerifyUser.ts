import type { UserRepository } from "../../../domain/interface/UserRepositories.ts";

export class UserVerify {
    private userRepo: UserRepository

    constructor(userRepo: UserRepository){
        this.userRepo = userRepo
    }

    async execute(data: {
        id: string
    }){
        const user = await this.userRepo.findById(data.id)

        if (!user) {
            throw new Error("User not found");
        }

        if (user.isVerified) {
            throw new Error("User account already verified");
        }


        user.verify()

        await this.userRepo.update(user);

        return {
            email: user.email,
            message : "User Account Verified Successfully"
        };
    }
}