<template>
  <div
    class="max-w-4xl mx-auto p-8 bg-gray-50 min-h-screen overflow-hidden rounded-2xl shadow-sm"
  >
    <h1 class="text-4xl font-bold mb-8 text-gray-800">My Tasks</h1>

    <div class="flex gap-4 mb-8">
      <select
        v-model="statusFilter"
        class="bg-white border-none rounded-full px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
      >
        <option value="">All statuses</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <select
        v-model="sortBy"
        class="bg-white border-none rounded-full px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
      >
        <option value="date">Sort by Date</option>
        <option value="title">Sort by Title</option>
      </select>
    </div>

    <TransitionGroup name="list" tag="div" class="space-y-4">
      <div
        v-for="todo in sortedAndFilteredTodos"
        :key="todo.id"
        class="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-semibold text-gray-800">{{ todo.title }}</h3>
          <div class="flex gap-2">
            <button
              @click="editTodo(todo)"
              class="text-blue-600 hover:text-blue-800 transition-colors duration-300"
            >
              <EditIcon class="w-5 h-5" />
            </button>
            <button
              @click="deleteTodo(todo.id)"
              class="text-red-600 hover:text-red-800 transition-colors duration-300"
            >
              <TrashIcon class="w-5 h-5" />
            </button>
            <button
              v-if="todo.status !== 'completed'"
              @click="completeTodo(todo.id)"
              class="text-green-600 hover:text-green-800 transition-colors duration-300"
            >
              <CheckIcon class="w-5 h-5" />
            </button>
          </div>
        </div>

        <p class="text-gray-600 mb-4">{{ todo.description }}</p>

        <div class="flex items-center justify-between text-sm text-gray-500">
          <div>
            <p>Created: {{ formatDate(todo.createdAt) }}</p>
            <p v-if="todo.completedAt">
              Completed: {{ formatDate(todo.completedAt) }}
            </p>
          </div>
          <span
            :class="{
              'bg-yellow-100 text-yellow-800': todo.status === 'pending',
              'bg-blue-100 text-blue-800': todo.status === 'in-progress',
              'bg-green-100 text-green-800': todo.status === 'completed',
            }"
            class="px-3 py-1 rounded-full text-xs font-medium"
          >
            {{ todo.status }}
          </span>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useTodoStore } from "../composables/useTodoStore";
import { EditIcon, TrashIcon, CheckIcon } from "lucide-vue-next";

const todoStore = useTodoStore();
const statusFilter = ref("");
const sortBy = ref("date");

const sortedAndFilteredTodos = computed(() => {
  let filtered = todoStore.filterTodos(statusFilter.value || undefined);
  return todoStore.sortTodos(filtered, sortBy.value);
});

const formatDate = (date) => {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const editTodo = (todo) => {
  // Implement edit logic
};

const deleteTodo = (id) => {
  todoStore.deleteTodo(id);
};

const completeTodo = (id) => {
  todoStore.completeTodo(id);
};
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
