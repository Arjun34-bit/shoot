export class Password{
    private readonly hash: string

    private constructor(hash: string){
        this.hash = hash
    }

    static fromHash(hash: string): Password {
        if(!hash){
            throw new Error("Password hash required")
        }

        return new Password(hash)
    }

    static fromPlain(plain: string, hash: string): Password {
        return new Password(hash)
    }

    getHash(): string {
        return this.hash
    }
}