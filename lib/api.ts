import axios from "axios";
import { Task } from "@/lib/types";
import { useAuthStore } from "./auth";

export const fetchTasks = async (params: {
  projectId?: string;
  priority?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}): Promise<Task[]> => {
  const { token, userId } = useAuthStore.getState();
  //   console.log("Token : " + token);
  //   console.log("UserID : " + userId);

  const response = await axios.get<Task[]>("/api/tasks", {
    params: { userId, ...params },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response.data);

  return response.data;
};

// export const fetchProject = async();

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
