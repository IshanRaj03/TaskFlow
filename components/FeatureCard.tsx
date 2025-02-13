import { ReactNode } from "react";

export default function FeatureCard({
  icon,
  title,
}: {
  icon: ReactNode;
  title: string;
}) {
  return (
    <div className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl hover:scale-105 transition-transform">
      <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-green-600 dark:text-green-400 mb-4">
        {icon}
      </div>
      <h3 className="font-medium text-gray-900 dark:text-white">{title}</h3>
    </div>
  );
}
