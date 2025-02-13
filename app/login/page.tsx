"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/auth";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login } = useAuthStore();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "An error occurred");
      }
      return response.json();
    },
    onSuccess: ({ token, userId }) => {
      const { token: to, userId: ids } = useAuthStore.getState();
      console.log(ids);
      console.log(to);

      login(token, userId);
      const { token: t, userId: id } = useAuthStore.getState();
      console.log(id);
      console.log(t);

      router.push("/dashboard");
    },
    onError: (err: Error) => {
      setError(err.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutateAsync();
  };

  return (
    <div className="pt-32 min-h-screen flex flex-col">
      <div className="fixed inset-0 bg-gradient-to-br from-green-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 -z-10" />

      <main className="flex-1 flex items-start justify-center px-6 pt-8">
        <div className="w-full max-w-md p-8 space-y-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            Welcome back
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300">
            Log in to your TaskFlow account
          </p>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl">
              <p className="text-red-600 dark:text-red-400 text-center">
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-green-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-4 py-3 text-gray-800 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-green-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
              <a
                href="/forgot-password"
                className="text-sm text-green-600 dark:text-green-400 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full px-6 py-4 mt-6 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium text-lg hover:scale-105 transition-transform disabled:opacity-70 disabled:hover:scale-100"
            >
              {isPending ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="text-center text-gray-600 dark:text-gray-300">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-green-600 dark:text-green-400 hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
