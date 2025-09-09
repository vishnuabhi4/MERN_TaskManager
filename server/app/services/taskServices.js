import Task from "../models/Task.js";

export const getTasksService = async (userId) => {
  return await Task.find({ user: userId });
};

export const createTaskService = async (userId, { title, description }) => {
  const task = new Task({ title, description, user: userId });
  return await task.save();
};

export const updateTaskService = async (taskId, updates, userId) => {
  const task = await Task.findOneAndUpdate(
    { _id: taskId, user: userId },
    updates,
    { new: true }
  );

  if (!task) throw new Error("Task not found or unauthorized");
  return task;
};

export const deleteTaskService = async (taskId, userId) => {
  const task = await Task.findOneAndDelete({ _id: taskId, user: userId });
  if (!task) throw new Error("Task not found or unauthorized");
  return task;
};
