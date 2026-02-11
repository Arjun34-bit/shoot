import type { OTPService } from "../../application/ports/OtpService.ts";
import type { RedisClientType } from "redis";

export class RedisOtpService implements OTPService {
  private readonly redis: RedisClientType;

  constructor(redis: RedisClientType) {
    this.redis = redis;
  }
  async generate(): Promise<string> {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async send(to: string, otp: string) {
    console.log(`Sending OTP ${otp} to ${to}`);
  }

  async save(id: string, otp: string) {
    await this.redis.set(`otp:${id}`, otp, { EX: 600 });
  }

  async verify(id: string, otp: string) {
    const key = `otp:${id}`;
    const storedOtp = await this.redis.get(key);

    if (!storedOtp) return false;

    const isValid = storedOtp === otp;

    if (isValid) {
      await this.redis.del(key);
    }

    return isValid;
  }
}
