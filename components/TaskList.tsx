"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTasks, updateTask, deleteTask } from "@/lib/api";
import { Task } from "@/lib/types";
import TaskForm from "./TaskForm";

interface TaskListProps {
  setViewTask: (task: Task | null) => void;
}

export default function TaskList({ setViewTask }: TaskListProps) {
  const [filters, setFilters] = useState({
    priority: "",
    status: "",
    startDate: "",
    endDate: "",
  });
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const queryClient = useQueryClient();

  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks", filters],
    queryFn: () => fetchTasks(filters),
  });

  const { mutate: deleteTaskMutation } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", filters],
        exact: true,
      });
    },
  });

  const { mutate: markAsCompletedMutation } = useMutation({
    mutationFn: ({ taskId, task }: { taskId: string; task: Task }) =>
      updateTask(taskId, task),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", filters],
        exact: true,
      });
    },
  });

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
  };

  const handleCloseForm = () => {
    setSelectedTask(null);
  };

  if (isLoading)
    return <p className="text-gray-600 dark:text-gray-400">Loading...</p>;
  if (error) return <p className="text-red-500">Error loading tasks</p>;

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-4 sm:p-6">
      {selectedTask && (
        <div className="mb-6">
          <TaskForm
            task={selectedTask}
            onSubmit={() => {
              handleCloseForm();
              queryClient.invalidateQueries({
                queryKey: ["tasks", filters],
                exact: true,
              });
            }}
          />
        </div>
      )}

      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Priority
          </label>
          <select
            value={filters.priority}
            onChange={(e) =>
              setFilters({ ...filters, priority: e.target.value })
            }
            className="w-full px-4 py-2 text-gray-600 dark:text-gray-200 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl"
          >
            <option value="">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="w-full px-4 py-2 text-gray-600 dark:text-gray-200 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Start Date
          </label>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) =>
              setFilters({ ...filters, startDate: e.target.value })
            }
            className="w-full px-4 py-2 text-gray-600 dark:text-gray-200 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            End Date
          </label>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) =>
              setFilters({ ...filters, endDate: e.target.value })
            }
            className="w-full px-4 py-2 text-gray-600 dark:text-gray-200 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="hidden sm:table w-full">
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
                <td className="p-4 text-gray-600 dark:text-gray-300 truncate max-w-[200px]">
                  {task.title}
                </td>
                <td className="p-4 text-gray-600 dark:text-gray-300">
                  {new Date(task.dueDate).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full ${
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
                </td>
                <td className="p-4 text-gray-600 dark:text-gray-300">
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </td>
                <td className="p-4 space-x-2">
                  <button
                    onClick={() => setViewTask(task)}
                    className="px-4 py-2 bg-indigo-600/80 text-white rounded-full hover:scale-105 transition-transform w-full sm:w-auto"
                  >
                    View Task
                  </button>
                  <button
                    onClick={() => handleEdit(task)}
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
                  {task.status !== "completed" && (
                    <button
                      onClick={() =>
                        markAsCompletedMutation({
                          taskId: task.id,
                          task: { ...task, status: "completed" },
                        })
                      }
                      className="px-4 py-2 bg-green-600/80 text-white rounded-full hover:scale-105 transition-transform"
                    >
                      Mark as Completed
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="sm:hidden space-y-4">
          {tasks?.map((task) => (
            <div
              key={task.id}
              className="bg-white/50 dark:bg-gray-700/50 rounded-xl p-4 shadow-md"
            >
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                  {task.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Priority:{" "}
                  <span
                    className={`px-3 py-1 rounded-full ${
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
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Status:{" "}
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </p>
              </div>
              <div className="mt-4 flex justify-between space-x-2">
                <button
                  onClick={() => handleEdit(task)}
                  className="px-4 py-2 bg-green-600/80 text-white rounded-full hover:scale-105 transition-transform w-full"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this task?")) {
                      deleteTaskMutation(task.id);
                    }
                  }}
                  className="px-4 py-2 bg-red-600/80 text-white rounded-full hover:scale-105 transition-transform w-full"
                >
                  Delete
                </button>
                {task.status !== "completed" && (
                  <button
                    onClick={() =>
                      markAsCompletedMutation({
                        taskId: task.id,
                        task: { ...task, status: "completed" },
                      })
                    }
                    className="px-4 py-2 bg-green-600/80 text-white rounded-full hover:scale-105 transition-transform w-full"
                  >
                    Mark as Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
