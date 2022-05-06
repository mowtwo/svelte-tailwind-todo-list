<script lang="ts">
  import type { TodoItemType } from "./TodoItem.svelte";

  export let todoList: TodoItemType[] = [];
  export let maxTodoCount = 0;
  $: currentTodos = todoList.filter((item) => !item.finished);
  $: finishedTodos = todoList.filter((item) => item.finished);
</script>

<div class="flex items-center text-[10px] pt-4 pb-2">
  <div class="mr-2 text-[14px]">
    已完成:<span class="text-gray-400 ml-1">{finishedTodos.length}</span>
  </div>
  |
  <div class="ml-2 mr-2 text-[14px]">
    待完成:<span class="text-gray-400 ml-1">{currentTodos.length}</span>
  </div>
  |
  <div class="ml-2 mr-2 text-[14px]">
    总:<span class="text-gray-400 ml-1">{todoList.length}/{maxTodoCount}</span>
  </div>
</div>
