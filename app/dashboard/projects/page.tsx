"use client";
import { useState } from "react";
import ProjectList from "@/components/ProjectList";
import ProjectForm from "@/components/ProjectForm";
import { Task } from "@/lib/types";

export default function ProjectsPage() {
  const [viewTask, setViewTask] = useState<Task | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Projects
        </h1>
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          {isFormOpen ? "Close Form" : "Add Project"}
        </button>
      </div>

      {isFormOpen && (
        <div className="mb-6">
          <ProjectForm onSubmit={() => setIsFormOpen(false)} />
        </div>
      )}

      {viewTask && (
        <div
          className="fixed inset-0 z-50 rounded-xl flex items-center justify-center bg-black/50"
          onClick={() => setViewTask(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              {viewTask.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Description: {viewTask.description || "No description available."}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Due Date:{" "}
              {new Date(viewTask.dueDate).toLocaleDateString() || "N/A"}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Priority:{" "}
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  viewTask.priority === "high"
                    ? "bg-red-200 text-red-700"
                    : viewTask.priority === "medium"
                    ? "bg-yellow-200 text-yellow-700"
                    : "bg-green-200 text-green-700"
                }`}
              >
                {viewTask.priority.charAt(0).toUpperCase() +
                  viewTask.priority.slice(1)}
              </span>
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Status:{" "}
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  viewTask.status === "pending"
                    ? "bg-gray-200 text-gray-700"
                    : viewTask.status === "in-progress"
                    ? "bg-blue-200 text-blue-700"
                    : "bg-green-200 text-green-700"
                }`}
              >
                {viewTask.status.charAt(0).toUpperCase() +
                  viewTask.status.slice(1)}
              </span>
            </p>
            <button
              onClick={() => setViewTask(null)} // Close modal
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {!isFormOpen && <ProjectList setViewTask={setViewTask} />}
    </div>
  );
}
