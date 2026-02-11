import type { EnableTotpPayload, LoginCredentials, OTPPayload, RegisterUser, TotpPayload, VerifyPayload, VerifyTokenPayload } from "../types/AuthTypes.ts";

export interface AuthServices {

// An interface is a pure abstraction
// It defines what must be done and hides how it is done
// It contains no implementation

    login(data: LoginCredentials): Promise<void>
    register(data: RegisterUser): Promise<void>
    verify(data: VerifyPayload): Promise<void>
    verifyOTP(data: OTPPayload): Promise<{ status: boolean; token: string; }>
    enableTotp(data: EnableTotpPayload): Promise<TotpPayload>
    verify2FAToken(data: VerifyTokenPayload): Promise<boolean>
}