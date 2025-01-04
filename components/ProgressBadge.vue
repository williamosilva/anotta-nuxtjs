<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold text-gray-800">Task Progress</h3>
      <span class="text-sm font-medium text-gray-600">
        {{ completedTasks }} of {{ totalTasks }} tasks
      </span>
    </div>

    <div class="relative h-2 bg-gray-100 rounded-full overflow-hidden">
      <div
        class="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500 ease-out"
        :style="{ width: `${progressPercentage}%` }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  totalTasks: {
    type: Number,
    required: true,
  },
  completedTasks: {
    type: Number,
    required: true,
  },
});

const progressPercentage = computed(() => {
  if (props.totalTasks === 0) return 0;
  return Math.round((props.completedTasks / props.totalTasks) * 100);
});

const progressTextColor = computed(() => {
  if (progressPercentage.value < 30) return "text-red-500";
  if (progressPercentage.value < 70) return "text-yellow-500";
  return "text-green-500";
});
</script>
