"use client";
import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Task } from "@/lib/types";

interface TaskCalenderProps {
  tasks: Task[];
}

export default function TaskCalender({ tasks }: TaskCalenderProps) {
  const taskMap = tasks.reduce((acc, task) => {
    const date = new Date(task.dueDate).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(task.title);
    return acc;
  }, {} as Record<string, string[]>);

  const handleDateClick = (date: Date) => {
    const dateString = date.toLocaleDateString();
    if (taskMap[dateString]) {
      alert(`Tasks for ${dateString}:\n${taskMap[dateString].join("\n")}`);
    } else {
      alert(`No tasks scheduled for ${dateString}`);
    }
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl mt-10 p-4 shadow-md">
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-4">
        Task Calender
      </h3>

      <div className="overflow-x-auto" style={{ maxHeight: "500px" }}>
        <Calendar
          onClickDay={handleDateClick}
          tileContent={({ date }) => {
            const dateString = date.toLocaleDateString();
            if (taskMap[dateString]) {
              return (
                <div className="text-xs sm:text-sm text-blue-500">
                  {taskMap[dateString].length} task(s)
                </div>
              );
            }
            return null;
          }}
          className="text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded-xl border border-gray-200 dark:border-gray-700 w-full sm:w-auto"
          tileClassName={({ date }) => {
            const dateString = date.toLocaleDateString();
            if (taskMap[dateString]) {
              return "text-xs sm:text-sm bg-blue-100 dark:bg-blue-900/30 rounded";
            }
            return "";
          }}
        />
      </div>
    </div>
  );
}
