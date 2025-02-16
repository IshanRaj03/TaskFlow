"use client";
import { useState } from "react";
import { createTask, updateTask } from "@/lib/api";
import { Task } from "@/lib/types";

interface TaskFormProps {
  projectId?: string;
  task?: Task;
  onSubmit: () => void;
}

export default function TaskForm({ task, projectId, onSubmit }: TaskFormProps) {
  const [formData, setFormData] = useState<Omit<Task, "id">>({
    title: task?.title || "",
    description: task?.description || "",
    dueDate: task?.dueDate || "",
    priority: task?.priority || "low",
    status: task?.status || "pending",
    projectId: task?.projectId || projectId || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      await updateTask(task.id, formData);
    } else {
      await createTask(formData);
    }
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
          Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full text-gray-800 dark:text-gray-300 px-4 py-3 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
          required
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full px-4 py-3 text-gray-800 dark:text-gray-300 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all h-32"
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
          Due Date
        </label>
        <input
          type="date"
          value={formData.dueDate}
          onChange={(e) =>
            setFormData({ ...formData, dueDate: e.target.value })
          }
          className="w-full px-4 py-3 text-gray-800 dark:text-gray-300 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
          required
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
          Priority
        </label>
        <select
          value={formData.priority}
          onChange={(e) =>
            setFormData({
              ...formData,
              priority: e.target.value as Task["priority"],
            })
          }
          className="w-full px-4 py-3 text-gray-800 dark:text-gray-300 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
          required
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="w-fit text-xl font-bold p-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-medium hover:scale-[1.02] transition-transform"
        >
          {task ? "Update Task" : "Create Task"}
        </button>
      </div>
    </form>
  );
}
