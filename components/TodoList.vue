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
        <option value="PENDING">Pending</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="COMPLETED">Completed</option>
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
        v-for="task in sortedAndFilteredTasks"
        :key="task.id"
        class="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-semibold text-gray-800">{{ task.title }}</h3>
          <div class="flex gap-2">
            <button
              @click="$emit('edit-task', task)"
              class="text-blue-600 hover:text-blue-800 transition-colors duration-300"
            >
              <EditIcon class="w-5 h-5" />
            </button>
            <button
              @click="$emit('delete-task', task.id)"
              class="text-red-600 hover:text-red-800 transition-colors duration-300"
            >
              <TrashIcon class="w-5 h-5" />
            </button>
            <button
              v-if="task.status !== 'COMPLETED'"
              @click="$emit('update-status', task.id, 'COMPLETED')"
              class="text-green-600 hover:text-green-800 transition-colors duration-300"
            >
              <CheckIcon class="w-5 h-5" />
            </button>
          </div>
        </div>

        <p class="text-gray-600 mb-4">{{ task.description }}</p>

        <div class="flex items-center justify-between text-sm text-gray-500">
          <div>
            <p>Created: {{ formatDate(task.created_at) }}</p>
          </div>
          <span
            :class="{
              'bg-yellow-100 text-yellow-800': task.status === 'PENDING',
              'bg-blue-100 text-blue-800': task.status === 'IN_PROGRESS',
              'bg-green-100 text-green-800': task.status === 'COMPLETED',
            }"
            class="px-3 py-1 rounded-full text-xs font-medium capitalize"
          >
            {{ formatStatus(task.status) }}
          </span>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useTodoStore, Task } from "../composables/useTodoStore";
import { EditIcon, TrashIcon, CheckIcon } from "lucide-vue-next";

// Props e Emits
defineEmits<{
  "edit-task": [task: Task];
  "delete-task": [id: string];
  "update-status": [id: string, status: Task["status"]];
}>();

const { filterTasks, sortTasks } = useTodoStore();

const statusFilter = ref<Task["status"] | "">("");
const sortBy = ref<"date" | "title">("date");

const sortedAndFilteredTasks = computed(() => {
  const filtered = filterTasks(statusFilter.value || undefined);
  return sortTasks(sortBy.value);
});

const formatDate = (date: string) => {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatStatus = (status: Task["status"]) => {
  return status.toLowerCase().replace("_", " ");
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
