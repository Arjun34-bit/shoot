import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
import type { CipherGCM, DecipherGCM } from "crypto";
import type { TextSecurity } from "../../application/ports/EncDecService.ts";

export class CryptoAlgorithm implements TextSecurity {
    private algo: string;
    private secret_key: Buffer;

    constructor(algo: string, secretKeyHex: string){
        this.algo = algo,
        this.secret_key = Buffer.from(secretKeyHex, "hex");

        if (this.secret_key.length !== 32) {
            throw new Error("Encryption key must be 32 bytes (AES-256)");
        }
    }


    async encrypt(plainText: string){
        const iv = randomBytes(12); 
        const cipher = createCipheriv(this.algo, this.secret_key, iv) as CipherGCM ;

        const encrypted = Buffer.concat([
            cipher.update(plainText, "utf8"),
            cipher.final()
        ]);

        const tag = cipher.getAuthTag();

        return Buffer.concat([iv, tag, encrypted]).toString("hex");
    }

    async decrypt(encyptedsecret: string){
        const buf = Buffer.from(encyptedsecret, "hex");
        const iv = buf.slice(0, 12);
        const tag = buf.slice(12, 28);
        const ciphertext = buf.slice(28);

        const dec = createDecipheriv(this.algo, this.secret_key, iv) as DecipherGCM ;
        dec.setAuthTag(tag);

        const decrypted = Buffer.concat([dec.update(ciphertext), dec.final()]);
        return decrypted.toString("utf8");
    }
}