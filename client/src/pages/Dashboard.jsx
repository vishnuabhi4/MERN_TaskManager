import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // 👈 for navigation
import api from "../api/axios.js";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks"); // ✅ token auto-attached
      setTasks(res.data);
    } catch (err) {
      console.error("Fetch tasks error:", err);
      // If unauthorized, force logout
      if (err.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      const res = await api.post("/tasks", { title: newTask });
      setTasks([...tasks, res.data]);
      setNewTask("");
    } catch (err) {
      console.error("Add task error:", err.response?.data || err.message);
    }
  };

  const completeTask = async (taskId) => {
    try {
      const res = await api.put(`/tasks/${taskId}`, { status: "completed" });
      setTasks(tasks.map((t) => (t._id === taskId ? res.data : t)));
    } catch (err) {
      console.error("Complete task error:", err.response?.data || err.message);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((t) => t._id !== taskId));
    } catch (err) {
      console.error("Delete task error:", err.response?.data || err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");   // ✅ clear token
    navigate("/login");                 // ✅ redirect to login page
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Tasks</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Add Task */}
        <form onSubmit={addTask} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Add
          </button>
        </form>

        {/* Task List */}
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks yet. Add one!</p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg shadow"
              >
                <div>
                  <p
                    className={`font-medium ${
                      task.status === "completed" ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {task.title}
                  </p>
                  <span className="text-sm text-gray-500">{task.status}</span>
                </div>
                <div className="flex gap-2">
                  {task.status !== "completed" && (
                    <button
                      onClick={() => completeTask(task._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Complete
                    </button>
                  )}
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
