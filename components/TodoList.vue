<template>
  <div class="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-sm">
    <!-- Título -->
    <div class="mb-8 text-center">
      <h1 class="text-3xl font-bold text-gray-900">Minhas Tarefas</h1>
    </div>

    <!-- Filtros -->
    <div class="flex flex-wrap gap-4 mb-6">
      <select
        v-model="statusFilter"
        class="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">Todos os status</option>
        <option value="pending">Pendente</option>
        <option value="in-progress">Em Andamento</option>
        <option value="completed">Concluído</option>
      </select>
      <select
        v-model="sortBy"
        class="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="date">Ordenar por Data</option>
        <option value="title">Ordenar por Título</option>
      </select>
    </div>

    <!-- Lista de Tarefas -->
    <div class="space-y-6">
      <div
        v-for="todo in sortedAndFilteredTodos"
        :key="todo.id"
        class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
      >
        <!-- Cabeçalho da Tarefa -->
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-800 truncate">
            {{ todo.title }}
          </h3>
          <div class="flex gap-3">
            <button
              @click="editTodo(todo)"
              class="text-blue-600 hover:text-blue-800 font-medium"
            >
              Editar
            </button>
            <button
              @click="deleteTodo(todo.id)"
              class="text-red-600 hover:text-red-800 font-medium"
            >
              Excluir
            </button>
            <button
              v-if="todo.status !== 'completed'"
              @click="completeTodo(todo.id)"
              class="text-green-600 hover:text-green-800 font-medium"
            >
              Concluir
            </button>
          </div>
        </div>

        <!-- Descrição -->
        <p class="text-sm text-gray-600 mt-4">
          {{ todo.description }}
        </p>

        <!-- Informações Adicionais -->
        <div class="mt-4 text-sm text-gray-500">
          <p>Criado em: {{ formatDate(todo.createdAt) }}</p>
          <p v-if="todo.completedAt">
            Concluído em: {{ formatDate(todo.completedAt) }}
          </p>
          <span
            :class="{
              'text-yellow-600 font-medium': todo.status === 'pending',
              'text-blue-600 font-medium': todo.status === 'in-progress',
              'text-green-600 font-medium': todo.status === 'completed',
            }"
          >
            Status: {{ todo.status }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useTodoStore } from "~/composables/useTodoStore";
import dayjs from "dayjs";

const todoStore = useTodoStore();
const statusFilter = ref("");
const sortBy = ref<"date" | "title">("date");

const sortedAndFilteredTodos = computed(() => {
  let filtered = todoStore.filterTodos(statusFilter.value || undefined);
  return todoStore.sortTodos(sortBy.value);
});

const formatDate = (date: string) => {
  return dayjs(date).format("DD/MM/YYYY HH:mm");
};

const editTodo = (todo: Todo) => {
  // Implementar lógica de edição
};

const deleteTodo = (id: string) => {
  todoStore.deleteTodo(id);
};

const completeTodo = (id: string) => {
  todoStore.completeTodo(id);
};
</script>

<style scoped>
/* Adiciona uma transição elegante aos botões */
button:hover {
  transform: translateY(-1px);
  transition: transform 0.2s ease, color 0.2s ease;
}
</style>
