import { sequelize } from "../../../config/database.ts";
import { User } from "../../../domain/entities/User/User.ts";
import type { UserRepository } from "../../../domain/interface/UserRepositories.ts";

export class SequlizeAuthRepo implements UserRepository {

    async findByEmail(email: string): Promise<User | null>{
        const [rows]: any = await sequelize.query(
        `SELECT * FROM public.users WHERE email = ?`,
        { replacements: [email] }
        );

        if (!rows.length) return null;

        return User.fromPersistence(rows[0]);
    }

    async save(user: User): Promise<void>{
        try {
            const sql = `
        INSERT INTO public.users (first_name, last_name, email, username, password, phone, is_active, is_verified)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `

        const result = await sequelize.query(sql, {
            replacements: [
                user.firstName,
                user.lastName,
                user.emailValue,
                user.username,
                user.passwordValue,
                user.phone,
                user.isActive,
                user.isVerified
            ]
        })
        } catch (error) {
            console.log(error)
        }
        
    }

    async findById(id: string): Promise<User | null>{
       const [rows]: any = await sequelize.query(
        `SELECT * FROM public.users WHERE id = ?`,
        { replacements: [id] }
        );

        if (!rows.length) return null;

        return User.fromPersistence(rows[0]);
    }

    async update(user: User): Promise<void> {
        const sql = `
            UPDATE public.users
            SET is_verified = ?, is_totp = ?, secret = ?, otpauth_url = ?
            WHERE id = ?   
        `;

        await sequelize.query(sql, {
            replacements: [
            user.isVerified,
            user._is_totp,
            user._secret,
            user._otpauth_url,
            user.id
            ]
        });
    }
}