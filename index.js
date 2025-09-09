import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import connectDB from "./server/config/db.js";

dotenv.config();
connectDB()
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`server running at ${PORT}`))  