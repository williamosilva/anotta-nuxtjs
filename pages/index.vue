<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto py-6">
      <!-- Adicione este container para agrupar a badge e o botão -->
      <div class="flex justify-end items-center mb-4">
        <!-- Badge de progresso -->

        <!-- Botão de Nova Tarefa -->
        <button
          @click="() => openModal()"
          class="bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700"
        >
          Nova Tarefa
        </button>
      </div>

      <TodoList />
      <div class="w-64 m-auto">
        <ProgressBadge
          :total-tasks="todoStore.todos.value.length"
          :completed-tasks="completedTasksCount"
        />
      </div>

      <TransitionRoot appear :show="isModalOpen" as="template">
      </TransitionRoot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";
import { useTodoStore } from "~/composables/useTodoStore";

const todoStore = useTodoStore();
const isModalOpen = ref(false);
const selectedTodo = ref(null);

const completedTasksCount = computed(() => {
  return todoStore.todos.value.filter((todo) => todo.status === "completed")
    .length;
});

const openModal = (todo = null) => {
  selectedTodo.value = todo;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedTodo.value = null;
};

// @ts-ignore
const handleSubmit = (todoData) => {
  if (selectedTodo.value) {
    // @ts-ignore
    todoStore.updateTodo(selectedTodo.value.id, todoData);
  } else {
    todoStore.addTodo(todoData);
  }
  closeModal();
};
</script>
