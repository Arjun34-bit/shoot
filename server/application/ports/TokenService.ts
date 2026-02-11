import type { TokenPayload } from "../../types/AuthTypes.ts";

export interface TokenService {
  generate(payload: TokenPayload): string;
  verify(token: string): TokenPayload;
}
