import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/token";

export const authUser = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;

    if (!header)
        return res.status(401).json({ message: "Token missing" });

    const token = header.split(" ")[1];

    try {
        const decoded = verifyToken(token);
        (req as any).user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid Token" });
    }
};

export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (user.role !== "Admin")
        return res.status(403).json({ message: "Admin access only" });

    next();
};
