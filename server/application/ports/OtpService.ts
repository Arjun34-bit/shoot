export interface OTPService {
    generate():Promise<string>
    send(to: string, otp: string): Promise<void>
    save(id: string, otp: string): Promise<void>
    verify(id: string, otp: string): Promise<boolean>
}