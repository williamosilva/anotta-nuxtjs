import { ref } from "vue";

export interface Todo {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  completedAt: string | null;
  status: "pending" | "in-progress" | "completed";
}

export const useTodoStore = () => {
  const todos = ref<Todo[]>([
    {
      id: "1",
      title: "Completar projeto TODO",
      description: "Desenvolver uma aplicação de TODO list usando Nuxt.js",
      createdAt: "2025-01-02T10:00:00",
      completedAt: null,
      status: "in-progress",
    },
    {
      id: "2",
      title: "Estudar Nuxt.js",
      description: "Aprofundar conhecimentos em Nuxt 3",
      createdAt: "2025-01-01T15:30:00",
      completedAt: "2025-01-02T14:00:00",
      status: "completed",
    },
    {
      id: "3",
      title: "Reunião de planejamento",
      description: "Participar da reunião semanal de planejamento",
      createdAt: "2025-01-03T09:00:00",
      completedAt: null,
      status: "pending",
    },
  ]);

  const addTodo = (todo: Omit<Todo, "id" | "createdAt">) => {
    const newTodo = {
      ...todo,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      completedAt: null,
    };
    todos.value.push(newTodo);
  };

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    const index = todos.value.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      todos.value[index] = { ...todos.value[index], ...updates };
    }
  };

  const deleteTodo = (id: string) => {
    todos.value = todos.value.filter((todo) => todo.id !== id);
  };

  const completeTodo = (id: string) => {
    const todo = todos.value.find((todo) => todo.id === id);
    if (todo && todo.status !== "completed") {
      todo.status = "completed";
      todo.completedAt = new Date().toISOString();
    }
  };

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

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    completeTodo,
    filterTodos,
    sortTodos,
  };
};
