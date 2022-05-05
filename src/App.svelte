<script lang="ts">
  import Todo from "./lib/Todo.svelte";
  import TodoItem, { TodoItemEvents } from "./lib/TodoItem.svelte";
  import type { TodoItemType } from "./lib/TodoItem.svelte";
  import { now } from "svelte/internal";

  let todoList: TodoItemType[] = [];
  let todoValue = "";
  const handleDelete = (e: CustomEvent<TodoItemEvents["delete"]>) => {
    const index = todoList.findIndex((fi) => fi.id === e.detail.id);
    if (index >= 0) {
      todoList.splice(index, 1);
      todoList = todoList;
    }
  };
</script>

<div
  class="w-[100vw] h-[100vh] fixed top-0 left-0 bg-[#eee] flex items-center justify-center"
>
  <Todo
    bind:value={todoValue}
    on:enter={() => {
      const dt = new Date();
      todoList = [
        ...todoList,
        {
          id: dt.valueOf(),
          text: todoValue,
          date: dt,
          finished: false,
          deleted: false,
        },
      ];
      console.log(todoList);
      todoValue = "";
    }}
  >
    {#each todoList as item (item.id)}
      <TodoItem {item} on:delete={handleDelete} />
    {/each}
  </Todo>
</div>
