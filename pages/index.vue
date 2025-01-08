<template>
  <div class="bg-gradient-to-br from-gray-50 to-gray-100">
    <div class="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Anotta</h1>
        <button
          @click="openModal()"
          class="bg-blue-600 text-white rounded-full py-2 px-6 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-md"
        >
          New Task
        </button>
      </div>

      <div class="mb-8">
        <ProgressBadge :tasks="tasks" />
      </div>

      <TodoList
        :tasks="tasks"
        @edit-task="openModal"
        @delete-task="handleDelete"
        @update-status="handleStatusUpdate"
      />

      <TransitionRoot appear :show="isModalOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div
              class="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm"
            />
          </TransitionChild>

          <div class="fixed inset-0 overflow-y-auto">
            <div
              class="flex min-h-full items-center justify-center p-4 text-center"
            >
              <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
              >
                <DialogPanel
                  class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all"
                >
                  <!-- <DialogTitle
                    as="h3"
                    class="text-lg font-medium leading-6 text-gray-900 mb-4"
                  >
                    {{ selectedTask ? "Edit Task" : "New Task" }}
                  </DialogTitle> -->
                  <TodoForm
                    :initial-data="selectedTask"
                    :is-editing="!!selectedTask"
                    @submit="handleSubmit"
                    @cancel="closeModal"
                  />
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import type { Task } from "~/composables/useHook";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";

import { useHook } from "~/composables/useHook";

const {
  tasks,
  stats,
  fetchTasks,
  fetchTaskStats,
  createTask,
  updateTask,
  deleteTask,
} = useHook();

const isModalOpen = ref(false);
const selectedTask = ref<Task | null>(null);

onMounted(async () => {
  try {
    await Promise.all([fetchTasks(), fetchTaskStats()]);
  } catch (error) {
    console.error("Error initializing data:", error);
  }
});

onMounted(() => {
  console.log("Tasks after fetch:", tasks.value);
});

watch(tasks, (newTasks) => {
  console.log("Tasks updated:", newTasks);
});

// Handlers
const openModal = (task: Task | null = null) => {
  selectedTask.value = task;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedTask.value = null;
};

const handleSubmit = async (taskData: Partial<Task>) => {
  try {
    if (selectedTask.value) {
      await updateTask(selectedTask.value.id, taskData);
    } else {
      await createTask(taskData.title!, taskData.description!);
    }
    closeModal();
  } catch (error) {
    console.error("Error handling task submission:", error);
  }
};

const handleDelete = async (taskId: string) => {
  try {
    await deleteTask(taskId);
    await fetchTaskStats();
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

const handleStatusUpdate = async (task: Task) => {
  try {
    await updateTask(task.id, task);
    await fetchTaskStats();
  } catch (error) {
    console.error("Error updating task status:", error);
  }
};
</script>
