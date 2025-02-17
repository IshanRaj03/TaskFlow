"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchAllTasks } from "@/lib/api";
import { useState } from "react";

export default function DashboardStats() {
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchAllTasks(),
  });

  if (isLoading) return <p className="text-gray-600">Loading...</p>;
  if (error) return <p className="text-red-500">Error loading tasks</p>;

  const totalTasks = tasks?.length || 0;
  const pendingTasks =
    tasks?.filter((task) => task.status === "pending").length || 0;
  const completedTasks =
    tasks?.filter((task) => task.status === "completed").length || 0;

  const completionPercentage =
    totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(0) : 0;

  const today = new Date();
  const upcomingTasks = tasks?.filter((task) => {
    const dueDate = new Date(task.dueDate);
    return (
      dueDate > today && dueDate <= new Date(today.setDate(today.getDate() + 7))
    );
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-4 shadow-md">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          Total Tasks
        </h3>
        <p className="text-2xl font-bold text-indigo-600">{totalTasks}</p>
      </div>

      <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-4 shadow-md">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          Pending Tasks
        </h3>
        <p className="text-2xl font-bold text-yellow-600">{pendingTasks}</p>
      </div>

      <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-4 shadow-md">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          Completed
        </h3>
        <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
      </div>

      <div className="col-span-full bg-white/80 dark:bg-gray-800/80 rounded-xl p-4 shadow-md">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
          Task Completion
        </h3>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-green-600 h-2.5 rounded-full"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          {completionPercentage}% Completed
        </p>
      </div>

      <div className="col-span-full bg-white/80 dark:bg-gray-800/80 rounded-xl p-4 shadow-md">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
          Upcoming Deadlines
        </h3>
        {upcomingTasks && upcomingTasks?.length > 0 ? (
          <ul className="space-y-2">
            {upcomingTasks.map((task) => (
              <li key={task.id} className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300 truncate max-w-[200px]">
                  {task.title}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No upcoming deadlines.
          </p>
        )}
      </div>
    </div>
  );
}
