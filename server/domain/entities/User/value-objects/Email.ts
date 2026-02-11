export class Email {
    private readonly value: string;

    private constructor(value: string){
        this.value = value
    }

    static create(value: string): Email {
        if(!value || !value.includes("@")){
            throw new Error("Invalid Email")
        }

        return new Email(value.toLowerCase())
    }

    getValue(): string {
        return this.value
    }
}