import type { Email } from "../../domain/entities/User/value-objects/Email.ts";
import type { TotpPayload } from "../../types/AuthTypes.ts";

export interface TotpService{
    generate(email: Email): TotpPayload,
    verify(payload: object): boolean
}