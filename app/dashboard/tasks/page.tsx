"use client";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";
import { useState } from "react";

export default function TasksPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Tasks
        </h1>
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:scale-105 transition-transform"
        >
          {isFormOpen ? "Close Form" : "Add Task"}
        </button>
      </div>

      {isFormOpen && (
        <div className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6">
          <TaskForm onSubmit={() => setIsFormOpen(false)} />
        </div>
      )}
      {!isFormOpen && <TaskList />}
    </div>
  );
}
