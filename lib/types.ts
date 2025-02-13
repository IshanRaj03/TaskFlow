export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  userId: string;
  createdAt: Date;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: string;
  status: string;
  projectId: string;
  userId: string;
  createdAt: Date;
};

export type Category = {
  id: string;
  name: string;
  userId: string;
};
