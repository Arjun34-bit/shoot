# 🧱 Clean Architecture Backend (Auth / Courier Management System)

This project follows **Clean Architecture** principles (popularized by *Robert C. Martin – Uncle Bob*).
The goal is to build a **scalable, testable, and maintainable backend** using **OOP + SOLID principles**, independent of frameworks and databases.

---

## 📐 Architecture Overview

The system is structured into **clear layers**, each with a single responsibility and strict dependency rules.

```
Presentation Layer (Fastify Routes & Controllers)
        ↓
Application Layer (Services / Coordinators & Use Cases)
        ↓
Domain Layer (Entities & Repository Interfaces)
        ↓
Infrastructure Layer (DB, ORM, External Services)
```

> **Rule:** Dependencies always point **inward**
> Outer layers can depend on inner layers, never the opposite.

---

## 🧩 Layers Explained

### 1 Presentation Layer

**(Fastify routes + controllers)**

**Responsibility:**

* Handle HTTP requests & responses
* Validate request format
* Call application services

**Does NOT:**

* Contain business logic
* Access database directly

**Example:**

```ts
fastify.post("/register", authController.register);
```

---

### 2 Application Layer

This layer contains **use cases** and **coordinators (services)**.

#### 🔹 Use Cases

Use cases represent **business actions**.

Examples:

* `UserRegister`
* `UserLogin`
* `UserVerify`

**Responsibilities:**

* Enforce business rules
* Coordinate domain entities
* Use repository interfaces

**Example:**

```ts
await user.verify();
await userRepo.save(user);
```

---

#### 🔹 Coordinator (Service Layer)

Acts as an **orchestrator** between controllers and use cases.

**Example:**

```ts
export class AuthServiceImpl implements AuthServices {
  constructor(
    private loginUser: UserLogin,
    private registerUser: UserRegister
  ) {}

  async login(data) {
    return this.loginUser.execute(data);
  }

  async register(data) {
    return this.registerUser.execute(data);
  }
}
```

**Why it exists:**

* Keeps controllers thin
* Groups related use cases
* Central entry point for application logic

---

### 3 Domain Layer

The **core of the system**.
Contains **pure business logic**, independent of frameworks.

#### 🔹 Entities

Entities represent **real-world business objects**.

**Example: `User`**

```ts
export class User {
  constructor(
    public id: string,
    public email: string,
    public isVerified: boolean
  ) {}

  verify() {
    if (this.isVerified) {
      throw new Error("Already verified");
    }
    this.isVerified = true;
  }
}
```

Entities:

* Hold business rules
* Do NOT access database
* Do NOT know about Fastify, Prisma, etc.

---

#### 🔹 Repository Interfaces

Define **contracts** for data access.

```ts
export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
}
```

Why interfaces?

* Dependency Inversion
* Easy testing (mocking)
* DB/ORM can be replaced without changing business logic

---

### 4 Infrastructure Layer

Contains **implementations** of interfaces.

Examples:

* Prisma repository
* Bcrypt password hasher
* Redis, email, queues, etc.

```ts
export class PrismaUserRepository implements UserRepository {
  async findById(id: string) { /* DB logic */ }
  async save(user: User) { /* DB logic */ }
}
```

Infrastructure depends on:

* Domain interfaces
* Application ports

Domain NEVER depends on infrastructure.

---

## 🔁 Example Flow (User Verification)

```
HTTP Request
  → Route
    → Controller
      → AuthService (Coordinator)
        → UserVerify (Use Case)
          → User Entity (verify)
          → UserRepository.save()
            → DB
```

---

## 🧠 OOP Concepts Used

* **Encapsulation** – private properties & methods
* **Abstraction** – interfaces (repositories, ports)
* **Polymorphism** – multiple implementations of interfaces
* **Dependency Injection** – constructor injection
* **Single Responsibility** – one reason to change per class

---

## 🧱 SOLID Principles Applied

| Principle                   | How it’s used                |
| --------------------------- | ---------------------------- |
| **S** Single Responsibility | Each class has one job       |
| **O** Open/Closed           | New features via new classes |
| **L** Liskov Substitution   | Interfaces interchangeable   |
| **I** Interface Segregation | Small, focused interfaces    |
| **D** Dependency Inversion  | Depends on abstractions      |

---

## 🏷️ Architecture Name

This architecture is commonly known as:

* **Clean Architecture**
* **Hexagonal Architecture**
* **Ports & Adapters**
* **Onion Architecture**

(All describe the same core idea)

---

## 🎯 Why This Architecture?

* Framework-independent
* Highly testable
* Scales well for large systems
* Industry-standard backend design
* Used in real-world enterprise systems

---

## ✅ Summary

* Business logic is protected at the core
* Frameworks are replaceable details
* Code is easy to reason about and test
* Follows Uncle Bob’s Clean Architecture

---

**Author’s note:**
This project is intentionally structured for **long-term maintainability**, not quick hacks.