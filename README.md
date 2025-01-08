# Anotta Frontend - Aplicação Nuxt.js/Vue.js

Frontend da aplicação Anotta desenvolvido com Nuxt.js e Vue.js, oferecendo uma interface moderna e responsiva para gerenciamento de tarefas.

## Tecnologias Utilizadas

- Nuxt.js 3
- Vue.js 3 (Composition API)
- TypeScript
- Tailwind CSS
- Headless UI
- Composables para gerenciamento de estado

## Funcionalidades do Frontend

- Interface responsiva e moderna
- Modal para criação e edição de tarefas
- Indicador de progresso das tarefas
- Animações suaves nas transições
- Loading states para feedback visual
- Lista de tarefas com opções de edição e exclusão
- Atualização em tempo real do status das tarefas

## Pré-requisitos

- Node.js (versão LTS recomendada)
- NPM ou Yarn
- Backend Anotta rodando (API)

## Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>](https://github.com/williamosilva/nuxt-todo-list)
cd anotta-frontend
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env`:
```
NUXT_PUBLIC_API_URL=http://localhost:3000
NUXT_PUBLIC_API_KEY=sua-chave-api
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

## Estrutura de Arquivos

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

## Componentes Principais

### TodoList
Componente responsável pela exibição da lista de tarefas com opções de:
- Visualização de todas as tarefas
- Edição de tarefas existentes
- Exclusão de tarefas
- Atualização de status

### TodoForm
Formulário utilizado tanto para criação quanto edição de tarefas, incluindo:
- Campos para título e descrição
- Validação de campos
- Estados de loading
- Feedback visual de erros

### ProgressBadge
Exibe o progresso geral das tarefas, mostrando:
- Total de tarefas
- Tarefas pendentes
- Tarefas em progresso
- Tarefas concluídas

## Composables

### useHook
Gerencia toda a lógica de estado e interações com a API:

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

## Estilos

O projeto utiliza Tailwind CSS para estilização, com:
- Gradientes personalizados
- Sistema de cores consistente
- Componentes responsivos
- Animações e transições
- Temas claros e escuros

## Exemplos de Uso

### Criação de Nova Tarefa
```typescript
const handleSubmit = async (taskData: Partial<Task>) => {
  try {
    await createTask(taskData.title!, taskData.description!);
    // Atualiza a lista de tarefas
    await fetchTasks();
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
  }
};
```

### Atualização de Status
```typescript
const handleStatusUpdate = async (task: Task) => {
  try {
    await updateTask(task.id, task);
    await fetchTaskStats();
  } catch (error) {
    console.error("Erro ao atualizar status:", error);
  }
};
```

## Performance e Otimizações

- Componentes lazy-loaded
- Caching de requisições
- Debouncing em operações frequentes
- Otimização de re-renders
- Prefetch de dados críticos

## Licença

[MIT License](LICENSE)
