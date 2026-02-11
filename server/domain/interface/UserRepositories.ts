// domain/interfaces/UserRepository.ts

import type { User } from "../entities/User/User.ts";

export interface UserRepository {
  save(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  update(user: User) : Promise<void>;
}
