import { ref, watch } from "vue";
import axios from "axios";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  created_at: string;
}

export interface TaskStats {
  total: number;
  completed: number;
  formatted: string;
}

export const useHook = () => {
  const config = useRuntimeConfig();
  const API_URL = config.public.API_URL;
  const API_KEY = config.public.API_KEY;
  const tasks = ref<Task[]>([]);
  const stats = ref<TaskStats | null>(null);
  const isLoading = ref(false);
  const isCreating = ref(false);
  const isUpdating = ref(false);
  const isDeleting = ref(false);

  const axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
  };

  const fetchTasks = async () => {
    isLoading.value = true;
    try {
      const response = await axios.get(`${API_URL}/tasks`, axiosConfig);
      tasks.value = response.data;
      console.log(
        "Tarefas carregadas:",
        JSON.parse(JSON.stringify(tasks.value))
      );
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const createTask = async (title: string, description: string) => {
    isCreating.value = true;
    try {
      const response = await axios.post(
        `${API_URL}/tasks`,
        { title, description },
        axiosConfig
      );
      tasks.value.unshift(response.data);
      await fetchTaskStats();
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      throw error;
    } finally {
      isCreating.value = false;
    }
  };

  const updateTask = async (
    id: string,
    updates: { title?: string; description?: string; status?: Task["status"] }
  ) => {
    isUpdating.value = true;
    try {
      const response = await axios.put(
        `${API_URL}/tasks/${id}`,
        updates,
        axiosConfig
      );
      const index = tasks.value.findIndex((task) => task.id === id);
      if (index !== -1) {
        tasks.value[index] = response.data;
      }
      await fetchTaskStats();
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
      throw error;
    } finally {
      isUpdating.value = false;
    }
  };

  const deleteTask = async (id: string) => {
    isDeleting.value = true;
    try {
      await axios.delete(`${API_URL}/tasks/${id}`, axiosConfig);
      tasks.value = tasks.value.filter((task) => task.id !== id);
      await fetchTaskStats();
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
      throw error;
    } finally {
      isDeleting.value = false;
    }
  };

  const fetchTaskStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks/stats`, axiosConfig);
      stats.value = response.data;
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error);
      throw error;
    }
  };

  const filterTasks = (status?: Task["status"]) => {
    return tasks.value.filter((task) => !status || task.status === status);
  };

  const sortTasks = (by: "date" | "title") => {
    const sorted = [...tasks.value];
    if (by === "date") {
      sorted.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }
    return sorted;
  };

  watch(
    tasks,
    async () => {
      await fetchTaskStats();
    },
    { deep: true }
  );

  return {
    tasks,
    stats,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    fetchTaskStats,
    filterTasks,
    sortTasks,
  };
};
