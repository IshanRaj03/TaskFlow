"use client";
import Link from "next/link";
import { X, CheckCircle, FolderKanban, Settings } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-gray-50 dark:bg-gray-800/90 backdrop-blur-md  shadow-lg 
          transition-transform duration-300 z-10
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="p-6">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 text-gray-600 dark:text-gray-300 md:hidden"
          >
            <X className="h-6 w-6" />
          </button>

          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-8">
            TaskFlow
          </h2>
          <nav className="space-y-4">
            <Link
              href="/dashboard/tasks"
              className="flex items-center gap-3 py-3 px-4 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              <CheckCircle className="h-5 w-5" />
              Tasks
            </Link>
            <Link
              href="/dashboard/projects"
              className="flex items-center gap-3 py-3 px-4 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              <FolderKanban className="h-5 w-5" />
              Projects
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 py-3 px-4 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </div>
      </aside>
    </>
  );
}
