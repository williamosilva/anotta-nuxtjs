<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold text-gray-800">Task Progress</h3>
      <span class="text-sm font-medium" :class="progressTextColor">
        {{ completedTasks }} of {{ totalTasks }} tasks
      </span>
    </div>

    <div class="relative h-2 bg-gray-100 rounded-full overflow-hidden">
      <div
        class="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500 ease-out"
        :style="{ width: `${progressPercentage}%` }"
        role="progressbar"
        :aria-valuenow="progressPercentage"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, onMounted, onUpdated } from "vue";

const props = defineProps({
  tasks: {
    type: Array,
    default: () => [],
  },
});

const totalTasks = computed(() => {
  console.log("Calculating totalTasks:", props.tasks?.length || 0);
  return props.tasks?.length || 0;
});

const completedTasks = computed(() => {
  const completed =
    props.tasks?.filter((task) => task?.status === "COMPLETED")?.length || 0;
  console.log("Calculating completedTasks:", completed);
  return completed;
});

const progressPercentage = computed(() => {
  if (totalTasks.value === 0) return 0;
  const percentage = Math.round(
    (completedTasks.value / totalTasks.value) * 100
  );
  console.log("Calculating progressPercentage:", percentage);
  return percentage;
});

const progressTextColor = computed(() => {
  if (progressPercentage.value < 30) return "text-red-500";
  if (progressPercentage.value < 70) return "text-yellow-500";
  return "text-green-500";
});

watch(
  () => props.tasks,
  (newTasks) => {
    console.log("Tasks updated in ProgressBadge:", newTasks);
  },
  { deep: true, immediate: true }
);

onMounted(() => {
  console.log("ProgressBadge mounted. Initial tasks:", props.tasks);
});

onUpdated(() => {
  console.log("ProgressBadge updated. Current tasks:", props.tasks);
});
</script>
