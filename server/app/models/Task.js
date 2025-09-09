import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // relation with User model
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);

//JSON Test Case 
// {
//   "title": "Finish project",
//   "description": "Complete backend services",
//   "status": "pending"
// }


