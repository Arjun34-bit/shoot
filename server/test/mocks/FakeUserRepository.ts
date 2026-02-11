import type { User } from "../../domain/entities/User/User.ts";
import type { UserRepository } from "../../domain/interface/UserRepositories.js";

export class FakeUserRepo implements UserRepository {
    public savedUser: User | null = null;

    async save(user:User): Promise<void> {
        this.savedUser = user
    }

    async findByEmail(email: string): Promise<User | null> {
        return null
    }

    async findById(id: string): Promise<User | null> {
        return null
    }

    async update(): Promise<void> {}
}