"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProject, deleteProject, deleteTask, updateTask } from "@/lib/api";
import { Project, Task } from "@/lib/types";
import TaskForm from "./TaskForm";
import ProjectForm from "./ProjectForm";

interface ProjectListProps {
  setViewTask: (task: Task | null) => void;
}

export default function ProjectList({ setViewTask }: ProjectListProps) {
  const queryClient = useQueryClient();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const {
    data: projects,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProject,
  });

  const { mutate: deleteProjectMutation } = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const { mutate: deleteTaskMutation } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const { mutate: markAsCompletedMutation } = useMutation({
    mutationFn: ({ taskId, task }: { taskId: string; task: Task }) =>
      updateTask(taskId, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseForm = () => {
    setSelectedProject(null);
    setEditingTask(null);
  };

  if (isLoading)
    return <p className="text-gray-600 dark:text-gray-400">Loading...</p>;
  if (error) return <p className="text-red-500">Error loading projects</p>;

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-4 sm:p-6">
      {selectedProject && (
        <div className="bg-gray-50 rounded-md p-4 mb-6">
          <ProjectForm
            project={selectedProject}
            onSubmit={() => {
              handleCloseForm();
              queryClient.invalidateQueries({ queryKey: ["projects"] });
            }}
          />
        </div>
      )}

      {editingTask && (
        <div className="mb-6">
          <TaskForm
            task={editingTask}
            onSubmit={() => {
              setEditingTask(null);
              queryClient.invalidateQueries({ queryKey: ["projects"] });
            }}
            projectId={editingTask.projectId}
          />
        </div>
      )}

      <div className="space-y-6">
        {projects
          ?.filter((project) => project.name !== "Uncategorized")
          .map((project) => (
            <div
              key={project.id}
              className="bg-white/50 dark:bg-gray-700/50 rounded-xl p-4 shadow-md"
            >
              <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  {project.name}
                </h2>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-2 sm:mt-0">
                  <button
                    onClick={() =>
                      setIsTaskFormOpen(
                        isTaskFormOpen === project.id ? null : project.id
                      )
                    }
                    className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 w-full sm:w-auto"
                  >
                    {isTaskFormOpen === project.id
                      ? "Close Task Form"
                      : "Add Task"}
                  </button>
                  <button
                    onClick={() => handleEdit(project)}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 w-full sm:w-auto"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (
                        confirm("Are you sure you want to delete this project?")
                      ) {
                        deleteProjectMutation(project.id);
                      }
                    }}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 w-full sm:w-auto"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {project.description}
              </p>

              {isTaskFormOpen === project.id && (
                <div className="bg-gray-50 rounded-md p-4 mt-4">
                  <TaskForm
                    onSubmit={() => {
                      setIsTaskFormOpen(null);
                      queryClient.invalidateQueries({ queryKey: ["projects"] });
                    }}
                    projectId={project.id}
                  />
                </div>
              )}

              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                  Tasks
                </h3>
                {project.tasks && project.tasks.length > 0 ? (
                  <ul className="space-y-2">
                    {project.tasks.map((task) => (
                      <li
                        key={task.id}
                        className="flex flex-col sm:flex-row justify-between items-center p-2 bg-white/80 dark:bg-gray-600/50 rounded-md"
                      >
                        <div className="flex flex-col space-y-1 w-full sm:w-auto">
                          <span className="text-gray-700 dark:text-gray-300 font-medium truncate">
                            {task.title}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 mt-2 sm:mt-0">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              task.priority === "high"
                                ? "bg-red-200 text-red-700"
                                : task.priority === "medium"
                                ? "bg-yellow-200 text-yellow-700"
                                : "bg-green-200 text-green-700"
                            }`}
                          >
                            {task.priority.charAt(0).toUpperCase() +
                              task.priority.slice(1)}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              task.status === "pending"
                                ? "bg-gray-200 text-gray-700"
                                : task.status === "in-progress"
                                ? "bg-blue-200 text-blue-700"
                                : "bg-green-200 text-green-700"
                            }`}
                          >
                            {task.status.charAt(0).toUpperCase() +
                              task.status.slice(1)}
                          </span>
                          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                            {task.status !== "completed" && (
                              <button
                                onClick={() => {
                                  console.log(task);

                                  markAsCompletedMutation({
                                    taskId: task.id,
                                    task: { ...task, status: "completed" },
                                  });
                                }}
                                className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 rounded-2xl w-full sm:w-auto"
                              >
                                Mark as Completed
                              </button>
                            )}
                            <button
                              onClick={() => setViewTask(task)}
                              className="px-2 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 rounded-2xl w-full sm:w-auto"
                            >
                              View Task
                            </button>
                            <button
                              onClick={() => setEditingTask(task)}
                              className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 rounded-2xl w-full sm:w-auto"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                if (
                                  confirm(
                                    "Are you sure you want to delete this task?"
                                  )
                                ) {
                                  deleteTaskMutation(task.id);
                                }
                              }}
                              className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 rounded-2xl w-full sm:w-auto"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    No tasks available.
                  </p>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
