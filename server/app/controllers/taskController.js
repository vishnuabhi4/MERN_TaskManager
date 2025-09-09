import {
  getTasksService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
} from "../services/taskServices.js";

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await getTasksService(req.user.id);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const task = await createTaskService(req.user.id, req.body);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await updateTaskService(req.params.id, req.body, req.user.id);
    res.json(task);
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    await deleteTaskService(req.params.id, req.user.id);
    res.json({ message: "✅ Task deleted" });
  } catch (err) {
    next(err);
  }
};
