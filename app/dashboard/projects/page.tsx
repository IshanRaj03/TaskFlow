// app/dashboard/projects/page.tsx
"use client";
import { useState } from "react";
import ProjectList from "@/components/ProjectList";
import ProjectForm from "@/components/ProjectForm";

export default function ProjectsPage() {
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
      {!isFormOpen && <ProjectList />}
    </div>
  );
}
