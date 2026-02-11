import type { PasswordHasher } from "../../application/ports/PasswordHasher.js";

export class FakePasswordHasher implements PasswordHasher {
    async hash(value: string): Promise<string> {
        return "hashed-password"
    }

    async compare(): Promise<boolean> {
        return true
    }
}