"use client";
import { useState } from "react";
import { createProject, updateProject } from "@/lib/api";
import { Project } from "@/lib/types";

interface ProjectFormProps {
  project?: Project;
  onSubmit: () => void;
}

export default function ProjectForm({ project, onSubmit }: ProjectFormProps) {
  const [formData, setFormData] = useState<Omit<Project, "id">>({
    name: project?.name || "",
    description: project?.description || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (project) {
        await updateProject(project.id, formData);
      } else {
        await createProject(formData);
      }
      onSubmit();
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
          Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 text-gray-800 dark:text-gray-300 py-3 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
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
          className="w-full px-4 py-3 text-gray-800 dark:text-gray-300 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all h-32"
        />
      </div>

      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="w-fit text-xl font-bold p-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-medium hover:scale-[1.02] transition-transform"
        >
          {project ? "Update Project" : "Create Project"}
        </button>
      </div>
    </form>
  );
}
