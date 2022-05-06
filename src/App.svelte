<script lang="ts">
  import Todo from "./lib/Todo.svelte";
  import TodoItem, { TodoItemEvents } from "./lib/TodoItem.svelte";
  import type { TodoItemType } from "./lib/TodoItem.svelte";
  import { onMount, tick } from "svelte";
  import { OPENED_FLAG, STORAGE_KEY } from "./data/constant";
  import { JSONStringify, ParseJSON } from "@/utils/JSON";
  import dayjs from "dayjs";
  import Edit, { EditEvents } from "./lib/Edit.svelte";
  import RightTools from "./lib/RightTools.svelte";
  let todoList: TodoItemType[] = [];
  const maxTodoCount = 60;
  let todoValue = "";
  let opened = JSON.parse(localStorage.getItem(OPENED_FLAG) ?? "false");
  let mounted = false;
  $: {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSONStringify(todoList));
    }
  }
  onMount(() => {
    if (!opened) {
      opened = true;
      localStorage.setItem(OPENED_FLAG, "true");
      todoList = [
        {
          id: 1,
          text: "你好，欢迎使用",
          finished: false,
          deleted: false,
          date: dayjs("2022-5-6 9:00:00").toDate(),
        },
        {
          id: 2,
          text: "目前还在开发阶段",
          finished: false,
          deleted: false,
          date: dayjs("2022-5-6 9:00:00").toDate(),
        },
        {
          id: 3,
          text: "请期待后续功能，谢谢",
          finished: false,
          deleted: false,
          date: dayjs("2022-5-6 9:00:00").toDate(),
        },
      ];
    } else {
      todoList = ParseJSON(localStorage.getItem(STORAGE_KEY) ?? "[]");
    }
    mounted = true;
  });
  const handleDelete = (e: CustomEvent<TodoItemEvents["delete"]>) => {
    const index = todoList.findIndex((fi) => fi.id === e.detail.id);
    if (index >= 0) {
      todoList.splice(index, 1);
      todoList = todoList;
    }
  };

  // get todo items container dom ref
  let todoItemsContainer: HTMLDivElement;
  const enterAndScrollDown = () => {
    todoItemsContainer.scrollTo({
      top: todoItemsContainer.scrollHeight,
      behavior: "smooth",
    });
  };
  let showEdit = false;
  let currentEdit: TodoItemType = null;
  const handleEdit = (item: CustomEvent<TodoItemEvents["edit"]>) => {
    currentEdit = item.detail;
    showEdit = true;
  };
  const handleEditCancel = () => (showEdit = false);
  const handleEditConfirm = (e: CustomEvent<EditEvents["confirm"]>) => {
    const index = todoList.findIndex((fi) => fi.id === e.detail.id);
    if (index >= 0) {
      todoList[index] = e.detail;
      todoList = todoList;
    }
    handleEditCancel();
  };

  let showFinished = true;
</script>

<div class="fixed z-10 right-4 top-4">
  <a
    class="inline-block pt-2 pb-2 pl-4 pr-4 bg-black text-white"
    href="https://github.com/mowtwo/svelte-tailwind-todo-list">Fork</a
  >
</div>

<div
  class="w-[100vw] h-[100vh] fixed top-0 left-0 bg-[#eee] flex items-center justify-center"
>
  <Todo
    bind:value={todoValue}
    bind:itemsWrapperThis={todoItemsContainer}
    on:enter={async () => {
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
      todoValue = "";
      await tick();
      enterAndScrollDown();
    }}
  >
    {#each todoList as item (item.id)}
      {#if !showFinished}
        {#if !item.finished}
          <TodoItem bind:item on:delete={handleDelete} on:edit={handleEdit} />
        {/if}
      {:else}
        <TodoItem bind:item on:delete={handleDelete} on:edit={handleEdit} />
      {/if}
    {/each}
    <div slot="left-tools" class="text-[14px] flex items-center">
      {#if todoList.length > 0}
        <div class="mt-4 mb-2">
          显示已完成 <input
            type="checkbox"
            bind:checked={showFinished}
            class="ml-2"
          />
        </div>
      {/if}
    </div>
    <div slot="right-tools">
      {#if todoList.length > 0}
        <RightTools {todoList} {maxTodoCount} />
      {/if}
    </div>
  </Todo>
</div>

{#if showEdit}
  <Edit
    on:bgClick={handleEditCancel}
    on:cancel={handleEditCancel}
    on:confirm={handleEditConfirm}
    item={currentEdit}
  />
{/if}
