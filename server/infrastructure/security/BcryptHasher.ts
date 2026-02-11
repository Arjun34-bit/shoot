import bcrypt from "bcrypt";
import type { PasswordHasher } from "../../application/ports/PasswordHasher.ts";

export class BcryptHasher implements PasswordHasher {
  hash(raw: string) {
    return bcrypt.hash(raw, 10);
  }

  compare(raw: string, hash: string) {
    return bcrypt.compare(raw, hash);
  }
}
