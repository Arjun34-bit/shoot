export interface TextSecurity {
    encrypt(text: string): Promise<string>;
    decrypt(text: string): Promise<string>
}