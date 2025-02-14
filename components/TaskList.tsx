"use client";
import { useState } from "react";
import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import { fetchTasks, createTask, updateTask, deleteTask } from "@/lib/api";
import { Task } from "@/lib/types";
import TaskForm from "./TaskForm";

export default function TaskList() {
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
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6">
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

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                <td className="p-4">
                  <span className="px-3 py-1 rounded-full bg-green-100/80 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                    {task.priority}
                  </span>
                </td>
                <td className="p-4 text-gray-600 dark:text-gray-300">
                  {task.status}
                </td>
                <td className="p-4 space-x-2">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
