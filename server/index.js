import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./app/routes/authRoutes.js"
import taskRoutes from "./app/routes/taskRoutes.js"



dotenv.config();//.env 
connectDB()//Mongodb connection initilize

const app = express();


app.use(cors());
app.use(express.json());
 

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);


const PORT = process.env.PORT;

app.listen(PORT,()=>console.log(`server running at ${PORT}`))   