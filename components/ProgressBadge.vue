<template>
  <div class="flex flex-col gap-2">
    <div class="flex justify-between items-center text-sm text-gray-600">
      <span>Progresso das Tarefas</span>
      <span class="font-medium"
        >{{ completedTasks }} de {{ totalTasks }} tarefas</span
      >
    </div>

    <div class="relative h-3 bg-gray-200 rounded-full overflow-hidden">
      <div
        class="absolute top-0 left-0 h-full bg-green-500 transition-all duration-500 ease-in-out"
        :style="{ width: `${progressPercentage}%` }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  totalTasks: number;
  completedTasks: number;
}>();

const progressPercentage = computed(() => {
  if (props.totalTasks === 0) return 0;
  return Math.round((props.completedTasks / props.totalTasks) * 100);
});
</script>
