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

  export let item: TodoItemType;
  const dispatch = createEventDispatcher<TodoItemEvents>();
</script>

<div class="flex items-center pt-4 pb-4">
  <input type="checkbox" bind:checked={item.finished} />
  <div
    class="ml-6 flex-1 mr-6 truncate transition-colors"
    class:line-through={item.finished}
    class:text-gray-400={item.finished}
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
