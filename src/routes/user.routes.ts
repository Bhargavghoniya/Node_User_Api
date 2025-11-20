import { Router } from "express";
import { register, login, listUsers, getUser } from "../controllers/user.controller";
import { authUser, adminOnly } from "../middleware/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users", authUser, adminOnly, listUsers);
router.get("/users/:id", authUser, getUser);

export default router;
