// components/header.tsx
"use client";
import { useAuthStore } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { AlignLeft } from "lucide-react";
import { useState } from "react";
import { Moon, Sun } from "lucide-react";

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { logout } = useAuthStore();
  const router = useRouter();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="bg-transparent z-20 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="md:hidden p-2">
          <AlignLeft className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
      <div className="flex items-center gap-10">
        <div className="hidden md:flex text-xl font-bold items-center gap-8">
          <button onClick={toggleDarkMode} className="p-2">
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-gray-300" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleDarkMode} className="p-2">
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-gray-300" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
