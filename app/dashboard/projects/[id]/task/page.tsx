"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchTasks, deleteTask } from "@/lib/api";
import TaskForm from "@/components/TaskForm";

export default function ProjectTasksPage({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [isFormOpen, setIsFormOpen] = useState(false);

  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks", params.id],
    queryFn: () => fetchTasks({ projectId: params.id }),
  });

  const { mutate: deleteTaskMutation } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", params.id],
      });
    },
  });

  const handleBack = () => {
    router.push("/dashboard/projects");
  };

  if (isLoading)
    return <p className="text-gray-600 dark:text-gray-400">Loading...</p>;
  if (error) return <p className="text-red-500">Error loading tasks</p>;

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Tasks for Project
        </h1>
        <div className="space-x-2">
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Back to Projects
          </button>
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            {isFormOpen ? "Close Form" : "Add Task"}
          </button>
        </div>
      </div>

      {isFormOpen && (
        <div className="mb-6">
          <TaskForm
            onSubmit={() => {
              setIsFormOpen(false);
              queryClient.invalidateQueries({
                queryKey: ["tasks", params.id],
              });
            }}
            projectId={params.id}
          />
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full">
          <thead className="bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm">
            <tr>
              <th className="p-4 text-left font-medium text-gray-800 dark:text-gray-200">
                Title
              </th>
              <th className="p-4 text-left font-medium text-gray-800 dark:text-gray-200">
                Due Date
              </th>
              <th className="p-4 text-left font-medium text-gray-800 dark:text-gray-200">
                Priority
              </th>
              <th className="p-4 text-left font-medium text-gray-800 dark:text-gray-200">
                Status
              </th>
              <th className="p-4 text-left font-medium text-gray-800 dark:text-gray-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks?.map((task) => (
              <tr
                key={task.id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-700/50"
              >
                <td className="p-4 text-gray-600 dark:text-gray-300">
                  {task.title}
                </td>
                <td className="p-4 text-gray-600 dark:text-gray-300">
                  {new Date(task.dueDate).toLocaleDateString()}
                </td>
                <td className="p-4 text-gray-600 dark:text-gray-300">
                  {task.priority}
                </td>
                <td className="p-4 text-gray-600 dark:text-gray-300">
                  {task.status}
                </td>
                <td className="p-4 space-x-2">
                  <button
                    onClick={() => console.log("Edit task:", task)} // Placeholder for edit functionality
                    className="px-4 py-2 bg-green-600/80 text-white rounded-full hover:scale-105 transition-transform"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (
                        confirm("Are you sure you want to delete this task?")
                      ) {
                        deleteTaskMutation(task.id);
                      }
                    }}
                    className="px-4 py-2 bg-red-600/80 text-white rounded-full hover:scale-105 transition-transform"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
