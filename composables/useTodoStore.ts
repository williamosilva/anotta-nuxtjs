import { ref } from "vue";
import axios from "axios";

export interface Todo {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  completedAt: string | null;
  status: "pending" | "in-progress" | "completed";
}

export const useTodoStore = () => {
  const API_URL = useRuntimeConfig().public.API_URL;
  const todos = ref<Todo[]>([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/todos`);
      todos.value = response.data;
    } catch (error) {
      console.error("Erro ao buscar todos:", error);
    }
  };

  const addTodo = async (todo: Omit<Todo, "id" | "createdAt">) => {
    try {
      const response = await axios.post(`${API_URL}/todos`, {
        ...todo,
        createdAt: new Date().toISOString(),
        completedAt: null,
      });
      todos.value.push(response.data);
    } catch (error) {
      console.error("Erro ao adicionar todo:", error);
    }
  };

  const updateTodo = async (id: string, updates: Partial<Todo>) => {
    try {
      const response = await axios.put(`${API_URL}/todos/${id}`, updates);
      const index = todos.value.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        todos.value[index] = response.data;
      }
    } catch (error) {
      console.error("Erro ao atualizar todo:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      todos.value = todos.value.filter((todo) => todo.id !== id);
    } catch (error) {
      console.error("Erro ao deletar todo:", error);
    }
  };

  const completeTodo = async (id: string) => {
    try {
      const updates = {
        status: "completed" as const,
        completedAt: new Date().toISOString(),
      };
      await updateTodo(id, updates);
    } catch (error) {
      console.error("Erro ao completar todo:", error);
    }
  };

  // Mantendo as funções de filtro e ordenação no cliente
  const filterTodos = (
    status?: Todo["status"],
    startDate?: string,
    endDate?: string
  ) => {
    return todos.value.filter((todo) => {
      const matchesStatus = !status || todo.status === status;
      const matchesDate =
        !startDate ||
        !endDate ||
        (todo.createdAt >= startDate && todo.createdAt <= endDate);
      return matchesStatus && matchesDate;
    });
  };

  const sortTodos = (by: "date" | "title") => {
    const sorted = [...todos.value];
    if (by === "date") {
      sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }
    return sorted;
  };

  // Carregar todos inicialmente
  fetchTodos();

  return {
    todos,
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    completeTodo,
    filterTodos,
    sortTodos,
  };
};
