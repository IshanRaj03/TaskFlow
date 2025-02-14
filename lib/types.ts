export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
};

export interface Project {
  id: string;
  name: string;
  description?: string;
  tasks?: Task[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in-progress" | "completed";
  projectId?: string;
}

export type Category = {
  id: string;
  name: string;
  userId: string;
};
