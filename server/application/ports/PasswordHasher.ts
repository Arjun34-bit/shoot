import type { Password } from "../../domain/entities/User/value-objects/Password.ts";

export interface PasswordHasher {
    hash(raw: string): Promise<string>;
    compare(raw: string, hash: string): Promise<boolean>
}