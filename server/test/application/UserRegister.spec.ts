import { UserRegister } from "../../application/use-cases/auth/RegisterUser.js"
import { FakePasswordHasher } from "../mocks/FakePasswordHasher.js"
import { FakeUserRepo } from "../mocks/FakeUserRepository.js"

describe("UserRegistration use case", () => {

  it("should register a new user successfully", async () => {

    const userRepo = new FakeUserRepo()
    const passwordHasher = new FakePasswordHasher()
    const useCase = new UserRegister(userRepo, passwordHasher)

    const user = await useCase.execute({
      id:"32442524",
      email: "julie@gmail.com",
      password: "password123",
      firstName: "Julie",
      lastName: "J",
      username: "julie123",
      phone: "9876543210",
      address: []
    })

    expect(user).toBeDefined();
    expect(user.emailValue).toBe("julie@gmail.com");
    expect(user.isActive).toBe(true);
    expect(user.isVerified).toBe(false);

    expect(userRepo.savedUser).not.toBeNull();
    expect(userRepo.savedUser?.passwordValue).toBe("hashed-password");

  })
})