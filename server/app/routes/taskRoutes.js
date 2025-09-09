import express from "express";
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/tasks
router.get("/", protect, getTasks);
router.post("/", protect, createTask);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

export default router;
