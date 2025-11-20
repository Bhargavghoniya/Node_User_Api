import jwt from "jsonwebtoken";

const SECRET = "Bhargav_Ghoniya";

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
