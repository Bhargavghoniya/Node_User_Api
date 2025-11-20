import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token";

const repo = AppDataSource.getRepository(User);

// 1. Register User
export const register = async (req: Request, res: Response) => {
    const { name, email, password, role, phone, city, country } = req.body;

    const exists = await repo.findOne({ where: { email } });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = repo.create({
        name, email, password: hashed, role, phone, city, country
    });

    await repo.save(user);

    res.status(201).json(user);
};

// 2. Login
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await repo.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    res.json({ access_token: token, token_type: "bearer" });
};

// 3. List Users (Admin Only)
export const listUsers = async (req: Request, res: Response) => {
    const { q, country } = req.query;

    const qb = repo
        .createQueryBuilder("user")
        .select();

    if (q) {
        qb.where("user.name LIKE :q OR user.email LIKE :q", {
            q: `%${q}%`
        });
    }

    if (country) {
        qb.andWhere("user.country LIKE :country", { country: `${country}` });
    }

    const users = await qb.getMany();
    res.json(users);
};

// 4. Get User Details
export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const logged = (req as any).user;

    const user = await repo.findOne({ where: { id: Number(id) } });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (logged.role !== "Admin" && logged.id !== user.id)
        return res.status(403).json({ message: "Not allowed" });

    res.json(user);
};
