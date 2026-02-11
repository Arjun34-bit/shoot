import speakeasy from "speakeasy"
import type { TotpService } from "../../application/ports/TotpService.ts";
import type { TotpPayload } from "../../types/AuthTypes.ts";
import type { Email } from "../../domain/entities/User/value-objects/Email.ts";

export class SpeakeasyOtpAuth implements TotpService {

    generate(userEmail: Email): TotpPayload{
        const secret = speakeasy.generateSecret({
            length:20,
            name: `CMS (${userEmail})`
        })

        return {
            secret: secret.base32,
            otpauthUrl: secret.otpauth_url!,
        }
    }

    verify({secret, token}: {secret: string; token: string}){
        return speakeasy.totp.verify({
            secret,
            encoding:"base32",
            token,
            window:1
        })
    }
}