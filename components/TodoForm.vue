<template>
  <div class="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-sm">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">
      {{ isEditing ? "Edit" : "Create" }} Task
    </h2>
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          id="title"
          v-model="form.title"
          type="text"
          required
          class="block w-full px-4 py-2 rounded-md bg-gray-50 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0 transition-all duration-300"
          placeholder="Enter task title"
        />
      </div>

      <div>
        <label
          for="description"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          v-model="form.description"
          rows="3"
          class="block w-full px-4 py-2 rounded-md bg-gray-50 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0 transition-all duration-300"
          placeholder="Enter task description"
        ></textarea>
      </div>

      <div>
        <label
          for="status"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Status
        </label>
        <select
          id="status"
          v-model="form.status"
          class="block w-full px-4 py-2 rounded-md bg-gray-50 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0 transition-all duration-300"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <button
        type="submit"
        class="w-full bg-blue-600 text-white rounded-md py-3 px-4 font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
      >
        {{ isEditing ? "Update" : "Create" }} Task
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  todo: {
    type: Object,
    default: () => null,
  },
});

const emit = defineEmits(["submit"]);

const isEditing = computed(() => !!props.todo);

const form = ref({
  title: props.todo?.title ?? "",
  description: props.todo?.description ?? "",
  status: props.todo?.status ?? "pending",
});

const handleSubmit = () => {
  emit("submit", {
    title: form.value.title,
    description: form.value.description,
    status: form.value.status,
    completedAt:
      form.value.status === "completed" ? new Date().toISOString() : null,
  });

  if (!isEditing.value) {
    form.value = {
      title: "",
      description: "",
      status: "pending",
    };
  }
};
</script>
