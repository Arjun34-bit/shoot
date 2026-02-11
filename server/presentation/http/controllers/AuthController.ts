import type { FastifyReply, FastifyRequest } from "fastify";
import type { AuthServices } from "../../AuthInterface.ts";
import type { EnableTotpPayload, LoginCredentials, OTPPayload, RegisterUser, VerifyPayload, VerifyTokenPayload } from "../../../types/AuthTypes.ts";

export class AuthController {
    private authService: AuthServices
    constructor(authService: AuthServices){
        this.authService = authService
    }

    async register(req: FastifyRequest<{Body: RegisterUser}>, reply: FastifyReply){
        try {
            await this.authService.register(req.body)
            reply.code(201).send({ success: true });
        } catch (error: any) {
            reply.code(400).send({ message: error.message });
        }
    }

    async login(
        req: FastifyRequest<{ Body: LoginCredentials }>,
        reply: FastifyReply
    ) {
        try {
            const result = await this.authService.login(req.body);
            reply.code(200).send({
                message:"Otp Generated Successfully",
                data:result
            });
        } catch (error: any) {
            reply.code(401).send({ message: error.message });
        }
    }

    async verify(
        req: FastifyRequest<{ Params: VerifyPayload }>,
        reply: FastifyReply
    ) {
        try {
            const result = await this.authService.verify(req.params)
            reply.code(200).send(result);
        } catch (error: any) {
            reply.code(401).send({ message: error.message });
        }
    }

    async verifyOtp(
        req: FastifyRequest<{ Body: OTPPayload }>,
        reply: FastifyReply
    ){
        try {
            const result = await this.authService.verifyOTP(req.body);
            reply.code(200).send({
                message:"OTP Verified Successfully",
                data: result
            });
        } catch (error: any) {
            reply.code(401).send({ message: error.message });
        }
    }

    async enableTotp(
        req: FastifyRequest<{ Body: EnableTotpPayload }>,
        reply: FastifyReply
    ){
        try {
            const result = await this.authService.enableTotp(req.body);
            reply.code(200).send({
                message:"TOTP Enabled successfully",
                data: result
            });
        } catch (error: any) {
            reply.code(401).send({ message: error.message });
        }
    }

    async verify2FA(
        req: FastifyRequest<{ Body: VerifyTokenPayload }>,
        reply: FastifyReply
    ){
        try {
            const result = await this.authService.verify2FAToken(req.body)
            reply.code(200).send({
                data: result
            });
        } catch (error: any) {
            reply.code(401).send({ message: error.message });
        }
    }
}