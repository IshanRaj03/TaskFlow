import axios from "axios";
import { Project, Task } from "@/lib/types";
import { useAuthStore } from "./auth";

export const fetchTasks = async (params: {
  projectId?: string;
  priority?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}): Promise<Task[]> => {
  const { token, userId } = useAuthStore.getState();
  if (!userId) throw new Error("User ID not found. Please login again.");

  let url = "/api/tasks";
  if (params.projectId) {
    url = `/api/tasks/project-tasks/${params.projectId}`;
  }

  const response = await axios.get<Task[]>(url, {
    params: { userId, ...params },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // console.log(response.data);

  return response.data;
};

export const fetchAllTasks = async (): Promise<Task[]> => {
  const { token, userId } = useAuthStore.getState();
  if (!userId) throw new Error("User ID not found. Please login again.");

  const response = await axios.get<Task[]>("/api/tasks/all", {
    params: { userId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const fetchProject = async (): Promise<Project[]> => {
  const { userId, token } = useAuthStore.getState();
  if (!userId) throw new Error("User ID not found. Please login again.");
  const res = await axios.get<Project[]>("/api/projects", {
    params: { userId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const createTask = async (taskData: Omit<Task, "id">): Promise<Task> => {
  const { token, userId } = useAuthStore.getState();

  const response = await axios.post<Task>(
    "/api/tasks",
    { ...taskData, userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const updateTask = async (
  taskId: string,
  taskData: Partial<Omit<Task, "id">>
): Promise<Task> => {
  const { token, userId } = useAuthStore.getState();
  const response = await axios.put<Task>(
    `/api/tasks/${taskId}`,
    { ...taskData, userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const deleteTask = async (taskId: string): Promise<void> => {
  const { token } = useAuthStore.getState();
  await axios.delete(`/api/tasks/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createProject = async (
  projectData: Omit<Project, "id">
): Promise<Project> => {
  const { userId, token } = useAuthStore.getState();
  if (!userId) throw new Error("User ID not found. Please login again.");
  const res = await axios.post<Project>(
    "/api/projects",
    { ...projectData, userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const updateProject = async (
  projectId: string,
  projectData: Partial<Omit<Project, "id">>
): Promise<Project> => {
  const { token, userId } = useAuthStore.getState();
  const res = await axios.put<Project>(
    `/api/projects/${projectId}`,
    { ...projectData, userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const deleteProject = async (projectId: string): Promise<void> => {
  const { token } = useAuthStore.getState();
  await axios.delete(`/api/projects/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
