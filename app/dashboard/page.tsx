"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/lib/auth";

export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="p-8 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        Welcome to Your Dashboard
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Start managing your tasks and projects efficiently.
      </p>
    </div>
  );
}
