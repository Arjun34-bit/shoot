import { Email } from "./value-objects/Email.ts";
import { Password } from "./value-objects/Password.ts";

export class User {
    private _id: string;
    private _email: Email;
    private _passwordHash: Password;
    private _firstName: string;
    private _lastName: string;
    private _username: string;
    private _phone: string;
    private _isActive: boolean;
    private _isVerified: boolean;
    public _is_totp: boolean;
    public _secret: string;
    public _otpauth_url: string;
    private _createdAt: Date;

    constructor(
        id: string,
        email: Email,
        passwordHash: Password,
        firstName: string,
        lastName: string,
        username: string,
        phone:string,
        isActive: boolean,
        isVerified: boolean,
        isTotp: boolean,
        secret: string,
        otpauth_url: string,
        createdAt: Date
    ){
        this._id = id
        this._email = email;
        this._passwordHash = passwordHash;
        this._firstName = firstName;
        this._lastName = lastName;
        this._username = username;
        this._phone = phone;
        this._isActive = isActive;
        this._isVerified = isVerified;
        this._is_totp = isTotp;
        this._secret = secret;
        this._otpauth_url = otpauth_url;
        this._createdAt = createdAt;
    }

    static createNew(params: {
        id: string;
        email: Email;
        passwordHash: Password;
        firstName: string;
        lastName: string;
        username: string;
        phone: string;
        is_totp?: boolean;
        secret?: string,
        otpauth_url?: string
    }): User {
        return new User(
            params.id,
            params.email,
            params.passwordHash,
            params.firstName,
            params.lastName,
            params.username,
            params.phone,
            true,
            false,
            false,
            "",
            "",
            new Date(),
        );
    }

    static fromPersistence(row: {
        id: string;
        email: string;
        password: string;
        first_name: string;
        last_name: string;
        username: string;
        phone: string;
        is_active: boolean;
        is_verified: boolean;
        is_totp: boolean;
        secret: string;
        otpauth_url: string;
        created_at: Date;
    }): User {
        return new User(
            row.id,
            Email.create(row.email),
            Password.fromHash(row.password),
            row.first_name,
            row.last_name,
            row.username,
            row.phone,
            row.is_active,
            row.is_verified,
            row.is_totp,
            row.secret,
            row.otpauth_url,
            row.created_at
        );
    }

    activate() {
        this._isActive = true;
    }

    deactivate() {
        this._isActive = false;
    }

    verify() {
        if (this._isVerified) {
            throw new Error("Already verified");
        }
        this._isVerified = true;
    }

    changePassword(newPassword: Password): void {
        this._passwordHash = newPassword;
    }

    enableTotp(secret: string, url: string){
        if (this._is_totp) {
            throw new Error("Already enabled");
        }
        this._is_totp = true;
        this._secret = secret;
        this._otpauth_url = url;
    }

    get emailValue(): string {
        return this._email.getValue();
    }

    get passwordValue(): string {
        return this._passwordHash.getHash();
    }

    get id(): string {
        return this._id;
    }

    get email(): Email {
        return this._email;
    }

    get passwordHash(): string {
        return this._passwordHash.getHash()
    }

    get firstName(): string {
        return this._firstName;
    }

    get lastName(): string {
        return this._lastName;
    }

    get username(): string {
        return this._username;
    }

    get phone(): string {
        return this._phone;
    }

    get isActive(): boolean {
        return this._isActive;
    }

    get isVerified(): boolean {
        return this._isVerified;
    }

    get isTotp(): boolean {
        return this._is_totp;
    }

    get getTotpSecret(): string {
        return this._secret
    }

}