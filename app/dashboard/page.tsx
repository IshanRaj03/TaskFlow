"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/lib/auth";
import DashboardStats from "@/components/DashboardStats";
import TaskCalender from "@/components/TaskCalender";
import { useQuery } from "@tanstack/react-query";
import { fetchAllTasks } from "@/lib/api";

export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allTasks"],
    queryFn: fetchAllTasks,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (isLoading) return <p className="text-gray-600">Loading...</p>;
  if (error) return <p className="text-red-500">Error loading tasks</p>;

  return (
    <div className="p-8 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
      <h1 className="text-4xl font-bold text-green-600 mb-10">
        Welcome to Your Dashboard
      </h1>

      <DashboardStats />
      <TaskCalender tasks={tasks || []} />
    </div>
  );
}
