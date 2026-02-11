import type { TokenService } from "../../application/ports/TokenService.ts";
import type { TokenPayload } from "../../types/AuthTypes.ts";

interface JwtAdapter {
  sign(payload: object): string;
  verify<T>(token: string): T;
}

export class JWTTokenService implements TokenService {

    private jwt: JwtAdapter

    constructor(jwt: JwtAdapter){
        this.jwt = jwt
    }

    generate(payload: TokenPayload): string {
        return this.jwt.sign(payload);
    }

    verify(token: string): TokenPayload {
        return this.jwt.verify<TokenPayload>(token);
    }
}