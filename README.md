# Anotta Frontend - Nuxt.js/Vue.js Application
A frontend application for Anotta built with Nuxt.js and Vue.js, providing a modern and responsive interface for task management.

## Technologies Used
- Nuxt.js 3
- Vue.js 3 (Composition API)
- TypeScript
- Tailwind CSS
- Headless UI
- Composables for state management

## Frontend Features
- Responsive and modern interface
- Modal for task creation and editing
- Task progress indicator
- Smooth transitions and animations
- Loading states for visual feedback
- Task list with edit and delete options
- Real-time task status updates

## Prerequisites
- Node.js (LTS version recommended)
- NPM or Yarn
- Anotta Backend running (API)

## Installation
1. Clone the repository:
```bash
git clone https://github.com/williamosilva/nuxt-todo-list
cd anotta-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Configure environment variables:
Create a `.env` file:
```
NUXT_PUBLIC_API_URL=http://localhost:3000
NUXT_PUBLIC_API_KEY=your-api-key
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## File Structure
```
├── components/
│   ├── LoadingSpinner.vue
│   ├── Footer.vue
│   ├── ProgressBadge.vue
│   ├── TodoList.vue
│   └── TodoForm.vue
├── composables/
│   └── useHook.ts
├── types/
│   └── index.ts
├── pages/
│   └── index.vue
├── app.vue
└── nuxt.config.ts
```

## Main Components
### TodoList
Component responsible for displaying the task list with options for:
- Viewing all tasks
- Editing existing tasks
- Deleting tasks
- Status updates

### TodoForm
Form used for both creating and editing tasks, including:
- Title and description fields
- Field validation
- Loading states
- Visual error feedback

### ProgressBadge
Displays overall task progress, showing:
- Total tasks
- Pending tasks
- Tasks in progress
- Completed tasks

## Composables
### useHook
Manages all state logic and API interactions:
```typescript
const {
  tasks,
  stats,
  isLoading,
  isCreating,
  isUpdating,
  isDeleting,
  fetchTasks,
  fetchTaskStats,
  createTask,
  updateTask,
  deleteTask,
} = useHook();
```

## Styles
The project uses Tailwind CSS for styling, with:
- Custom gradients
- Consistent color system
- Responsive components
- Animations and transitions
- Light and dark themes

## Usage Examples
### Creating a New Task
```typescript
const handleSubmit = async (taskData: Partial<Task>) => {
  try {
    await createTask(taskData.title!, taskData.description!);
    // Update task list
    await fetchTasks();
  } catch (error) {
    console.error("Error creating task:", error);
  }
};
```

### Status Update
```typescript
const handleStatusUpdate = async (task: Task) => {
  try {
    await updateTask(task.id, task);
    await fetchTaskStats();
  } catch (error) {
    console.error("Error updating status:", error);
  }
};
```

## Performance and Optimizations
- Lazy-loaded components
- Request caching
- Debouncing on frequent operations
- Re-render optimization
- Critical data prefetching

## License
[MIT License](LICENSE)
