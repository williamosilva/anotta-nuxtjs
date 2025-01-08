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
          maxlength="30"
          class="block w-full px-4 py-2 rounded-md bg-gray-50 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0 transition-all duration-300"
          placeholder="Enter task title"
        />
        <div class="flex justify-end mt-1">
          <span
            class="text-xs"
            :class="{
              'text-gray-500': remainingTitleChars > 10,
              'text-yellow-500':
                remainingTitleChars <= 10 && remainingTitleChars > 0,
              'text-red-500': remainingTitleChars === 0,
            }"
          >
            {{ remainingTitleChars }}/20
          </span>
        </div>
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
          maxlength="100"
          class="block w-full px-4 py-2 rounded-md bg-gray-50 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0 transition-all duration-300"
          placeholder="Enter task description"
        ></textarea>
        <div class="flex justify-end mt-1">
          <span
            class="text-xs"
            :class="{
              'text-gray-500': remainingDescriptionChars > 20,
              'text-yellow-500':
                remainingDescriptionChars <= 20 &&
                remainingDescriptionChars > 0,
              'text-red-500': remainingDescriptionChars === 0,
            }"
          >
            {{ remainingDescriptionChars }}/100
          </span>
        </div>
      </div>

      <div v-if="isEditing">
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
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
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

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { Task } from "~/composables/useHook";

interface Props {
  initialData: Task | null;
  isEditing: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  initialData: null,
  isEditing: false,
});

const emit = defineEmits<{
  (e: "submit", data: Partial<Task>): void;
  (e: "cancel"): void;
}>();

const form = ref({
  title: "",
  description: "",
  status: "PENDING" as Task["status"],
});

const remainingTitleChars = computed(() => 50 - form.value.title.length);
const remainingDescriptionChars = computed(
  () => 100 - form.value.description.length
);

// Update the form when initialData changes
watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      form.value = {
        title: newData.title,
        description: newData.description,
        status: newData.status,
      };
    } else {
      form.value = {
        title: "",
        description: "",
        status: "PENDING",
      };
    }
  },
  { immediate: true }
);

const handleSubmit = () => {
  const submitData = props.isEditing
    ? {
        title: form.value.title,
        description: form.value.description,
        status: form.value.status,
      }
    : {
        title: form.value.title,
        description: form.value.description,
      };

  emit("submit", submitData);

  if (!props.isEditing) {
    form.value = {
      title: "",
      description: "",
      status: "PENDING",
    };
  }
};
</script>
