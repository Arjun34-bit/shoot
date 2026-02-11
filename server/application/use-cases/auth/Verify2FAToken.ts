import type { UserRepository } from "../../../domain/interface/UserRepositories.ts";
import type { VerifyTokenPayload } from "../../../types/AuthTypes.ts";
import type { TextSecurity } from "../../ports/EncDecService.ts";
import type { TotpService } from "../../ports/TotpService.ts";

export class VerifyToken {
    private userRepo: UserRepository;
    private decryptionAlgo: TextSecurity; 
    private totpService: TotpService;

    constructor(userRepo: UserRepository, decryptionAlgo: TextSecurity, totpService: TotpService){
        this.userRepo = userRepo
        this.decryptionAlgo = decryptionAlgo
        this.totpService = totpService
    }

    async execute(data: VerifyTokenPayload): Promise<boolean> {

        const user = await this.userRepo.findById(data.id)

        if (!user) {
            throw new Error("User not found");
        }

        const encryptedSecret = user.getTotpSecret;
        const decryptedSecret = await this.decryptionAlgo.decrypt(encryptedSecret)

        const payload = {
            secret:decryptedSecret,
            token:data.token
        }

        const result = this.totpService.verify(payload)

        return result
    }
}