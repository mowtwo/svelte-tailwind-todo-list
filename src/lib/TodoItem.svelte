<script lang="ts" context="module">
  export interface TodoItemType {
    id: number;
    text: string;
    finished: boolean;
    date: Date;
    deleted: boolean;
  }

  export interface TodoItemEvents {
    delete: TodoItemType;
  }
</script>

<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import dayjs from "dayjs";

  export let item: TodoItemType;
  const dispatch = createEventDispatcher<TodoItemEvents>();

  const fmtTime = (t: Date) => {
    return dayjs(t).format("YYYY-MM-DD HH:mm:ss");
  };
</script>

<div class="flex items-center pt-4 pb-4" transition:fade>
  <input type="checkbox" bind:checked={item.finished} />
  <div
    class="ml-6 flex-1 mr-6 truncate transition-colors cursor-pointer select-none"
    class:line-through={item.finished}
    class:text-gray-400={item.finished}
    title={`${fmtTime(item.date)} | 点击查看详情`}
  >
    {item.text}
  </div>
  <button
    class="text-red-400 h-[34px] w-[60px] border-red-400 border-solid border-[1px]"
    on:click={() => {
      if (confirm(`Are you about to delete this item(id:${item.id})`)) {
        dispatch("delete", item);
      }
    }}>删除</button
  >
</div>
