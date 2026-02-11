import type { UserRepository } from "../../../domain/interface/UserRepositories.ts";
import type { TotpPayload } from "../../../types/AuthTypes.ts";
import type { TextSecurity } from "../../ports/EncDecService.ts";
import type { TotpService } from "../../ports/TotpService.ts";

export class EnableTotp {
    private userRepo: UserRepository;
    private totpService: TotpService;
    private encryptionAlgo: TextSecurity;

    constructor(userRepo: UserRepository, totpService: TotpService, encryptionAlgo: TextSecurity){
        this.userRepo = userRepo,
        this.totpService = totpService,
        this.encryptionAlgo = encryptionAlgo
    }

    async execute(data:{
        id: string
    }): Promise<TotpPayload> {
        const user = await this.userRepo.findById(data.id)

        if (!user) {
            throw new Error("User not found");
        }

        const secret = this.totpService.generate(user.email)

        const encryptedSecret = await this.encryptionAlgo.encrypt(secret.secret)

        user.enableTotp(encryptedSecret, secret.otpauthUrl)

        await this.userRepo.update(user);

        return {
            secret: user._secret,
            otpauthUrl: user._otpauth_url
        }
    }
}