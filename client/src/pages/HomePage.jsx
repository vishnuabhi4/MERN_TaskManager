import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">
          Welcome to Task Manager
        </h1>
        <p className="text-gray-600 mb-6">
          Organize your tasks!
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
