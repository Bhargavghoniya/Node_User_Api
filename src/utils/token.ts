import jwt from "jsonwebtoken";

const SECRET = "MY_SECRET_KEY";

export const generateToken = (user: any) => {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        SECRET,
        { expiresIn: "1d" }
    );
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, SECRET);
};
