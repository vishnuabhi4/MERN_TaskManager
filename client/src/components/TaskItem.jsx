import axios from "axios";

function TaskItem({ task, fetchTasks }) {
  const token = localStorage.getItem("token");

  const deleteTask = async () => {
    try {
      await axios.delete(`/api/tasks/${task._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleComplete = async () => {
    try {
      await axios.put(
        `/api/tasks/${task._id}`,
        { completed: !task.completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <li>
      <span
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
      >
        {task.title}
      </span>
      <button onClick={toggleComplete}>
        {task.completed ? "Undo" : "Complete"}
      </button>
      <button onClick={deleteTask}>Delete</button>
    </li>
  );
}

export default TaskItem;
