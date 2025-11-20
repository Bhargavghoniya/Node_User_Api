import express from "express";
import userRoutes from "./routes/user.routes";
import { AppDataSource } from "./config/data-source";

const app = express();
app.use(express.json());

// connect DB
AppDataSource.initialize()
    .then(() => console.log("Database connected"))
    .catch(err => console.error(err));

app.use("/", userRoutes);

export default app;
