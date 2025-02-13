// app/components/LayoutClient.tsx
"use client";
import { Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function LayoutClient() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const pathName = usePathname();
  const isLandingPage = pathName === "/";

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  if (pathName.startsWith("/dashboard")) {
    return null;
  }

  return (
    <>
      {!isLandingPage ? (
        <header className="fixed w-full top-0 z-50">
          <nav className="container mx-auto px-6 py-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent ">
                TaskFlow
              </h1>
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
            </div>
          </nav>
        </header>
      ) : null}
    </>
  );
}
