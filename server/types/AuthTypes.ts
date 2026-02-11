import type { Email } from "../domain/entities/User/value-objects/Email.ts"

export interface LoginCredentials {
  email: string  
  password: string
}

export interface RegisterUser {
  id: string
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
  phone: string
  address: string[]
}

export interface VerifyPayload {
  id: string
}

export interface OTPPayload {
  id: string,
  otp: string
}

export interface EnableTotpPayload {
  id: string
}

export interface TokenPayload {
  id: string;
  email: Email;
}

export interface TotpPayload {
  secret: string; 
  otpauthUrl: string;
}

export interface VerifyTokenPayload {
  id: string;
  token: string
}