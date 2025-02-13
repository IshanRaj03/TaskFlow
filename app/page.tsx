"use client";

import FeatureCard from "@/components/FeatureCard";
import StatCard from "@/components/StatCard";
import {
  Moon,
  Sun,
  CheckCircle,
  Calendar,
  FolderKanban,
  Bell,
  AlignRight,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="fixed inset-0 bg-gradient-to-br from-green-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 -z-10" />

      <div className="fixed inset-0 overflow-hidden -z-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-200 dark:bg-green-900/20 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-20" />
      </div>

      {/* Header */}
      <header className="fixed w-full top-0 z-50">
        <nav className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              TaskFlow
            </h1>
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Pricing
              </a>
              <button onClick={toggleDarkMode} className="p-2">
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-gray-300" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-600" />
                )}
              </button>
              <a
                href="/signup"
                className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:scale-105 transition-transform"
              >
                Get Started
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button onClick={toggleDarkMode} className="p-2">
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-gray-300" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-600" />
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2"
              >
                <AlignRight className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl">
              <nav className="flex flex-col space-y-4 px-4">
                <a
                  href="#features"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2"
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2"
                >
                  Pricing
                </a>
                <a
                  href="/signup"
                  className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium text-center"
                >
                  Get Started
                </a>
              </nav>
            </div>
          )}
        </nav>
      </header>

      <main className="pt-32">
        {/* Hero Section */}
        <section className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Left Side */}
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                <Sparkles className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                  New Features Available
                </span>
              </div>

              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Work smarter, not harder with
                <span className="block text-green-600 dark:text-green-400">
                  TaskFlow
                </span>
              </h2>

              <p className="text-lg text-gray-600 dark:text-gray-300">
                Transform your productivity with our intuitive task management
                platform. Built for teams who want to achieve more.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/signup"
                  className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium text-center hover:scale-105 transition-transform"
                >
                  Start for free
                </a>
                <button className="group px-8 py-4 border border-gray-200 dark:border-gray-700 rounded-full inline-flex items-center justify-center gap-2 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                  Watch demo
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Side - Feature Cards */}
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                <FeatureCard icon={<CheckCircle />} title="Task Management" />
                <FeatureCard icon={<FolderKanban />} title="Project Views" />
                <FeatureCard icon={<Calendar />} title="Smart Calendar" />
                <FeatureCard icon={<Bell />} title="Reminders" />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-6 py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard number="10k+" label="Active Users" />
            <StatCard number="1M+" label="Tasks Completed" />
            <StatCard number="99.9%" label="Uptime" />
            <StatCard number="4.9/5" label="User Rating" />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-6 py-24">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Everything you need to stay productive
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Powerful features to help you manage tasks, collaborate with your
              team, and achieve your goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <CheckCircle />,
                title: "Task Management",
                description:
                  "Create, organize, and prioritize tasks with ease. Set deadlines and track progress effortlessly.",
              },
              {
                icon: <FolderKanban />,
                title: "Project Views",
                description:
                  "Visualize your projects in multiple views - list, board, calendar, or timeline.",
              },
              {
                icon: <Calendar />,
                title: "Smart Calendar",
                description:
                  "Integrated calendar view to help you manage deadlines and schedule your work efficiently.",
              },
              {
                icon: <Bell />,
                title: "Reminders",
                description:
                  "Never miss a deadline with customizable notifications and reminders.",
              },
              {
                icon: <CheckCircle />,
                title: "Team Collaboration",
                description:
                  "Work together seamlessly with your team, assign tasks, and track progress.",
              },
              {
                icon: <CheckCircle />,
                title: "Progress Tracking",
                description:
                  "Monitor project progress with detailed analytics and reporting tools.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl"
              >
                <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-green-600 dark:text-green-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2025 TaskFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
