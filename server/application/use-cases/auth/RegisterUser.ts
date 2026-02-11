import { User } from "../../../domain/entities/User/User.ts";
import { Email } from "../../../domain/entities/User/value-objects/Email.ts";
import { Password } from "../../../domain/entities/User/value-objects/Password.ts";
import type { UserRepository } from "../../../domain/interface/UserRepositories.ts";
// import type { UserSearchRepository } from "../../../domain/interface/UserSearchRepositories.ts";
import type { PasswordHasher } from "../../ports/PasswordHasher.ts";

export class UserRegister {
  private userRepo: UserRepository;
  private hasher: PasswordHasher;
  // private searchRepo: UserSearchRepository
  constructor(
    userRepo: UserRepository,
    hasher: PasswordHasher,
    // searchRepo: UserSearchRepository,
  ) {
    ((this.userRepo = userRepo), (this.hasher = hasher));
    //   (this.searchRepo = searchRepo)
  }

  async execute(data: {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    username: string;
    phone: string;
    address: string[];
  }) {
    const hash = await this.hasher.hash(data.password);

    const passwordHash = Password.fromHash(hash);

    const emailResult = Email.create(data.email);

    const user = User.createNew({
      id: data.id,
      email: emailResult,
      passwordHash: passwordHash,
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      phone: data.phone,
    });

    await this.userRepo.save(user);

    // This is now tightly coupled, we have to add this in queue to handle it later, on ElasticSearch (ES) availability
    // await this.searchRepo.indexUser({
    //   id: user.id,
    //   email: user.emailValue,
    // });

    return user;
  }
}
