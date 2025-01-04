<template>
  <div class="max-w-lg mx-auto p-4">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">
          Título
        </label>
        <input
          id="title"
          v-model="form.title"
          type="text"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label
          for="description"
          class="block text-sm font-medium text-gray-700"
        >
          Descrição
        </label>
        <textarea
          id="description"
          v-model="form.description"
          rows="3"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        ></textarea>
      </div>

      <div>
        <label for="status" class="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          v-model="form.status"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="pending">Pendente</option>
          <option value="in-progress">Em Andamento</option>
          <option value="completed">Concluído</option>
        </select>
      </div>

      <button
        type="submit"
        class="w-full bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700"
      >
        {{ isEditing ? "Atualizar" : "Criar" }} Tarefa
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import type { Todo } from "~/composables/useTodoStore";

const props = defineProps<{
  todo?: Todo;
}>();

const emit = defineEmits<{
  (e: "submit", todo: Omit<Todo, "id" | "createdAt">): void;
}>();

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
