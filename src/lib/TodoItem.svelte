<script lang="ts" context="module">
  export interface TodoItemOptions {
    
  }

  export interface TodoItemType {
    id: number;
    text: string;
    finished: boolean;
    date: Date;
    deleted: boolean;
    options?: TodoItemOptions;
  }

  export interface TodoItemEvents {
    delete: TodoItemType;
    edit: TodoItemType;
  }
</script>

<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import dayjs from "dayjs";
  import { abs } from "@/utils/Math";
  import EventButton from "./EventButton.svelte";
  import { showConfirm } from "@/utils/dialog";

  export let item: TodoItemType;
  const dispatch = createEventDispatcher<TodoItemEvents>();

  const fmtTime = (t: Date) => {
    const d = dayjs(t);
    const n = dayjs(Date.now());
    const yearX = abs(d.year() - n.year());
    if (yearX < 1) {
      const monthX = abs(d.month() - n.month());
      if (monthX < 1) {
        const dateX = abs(d.date() - n.date());
        if (dateX < 1) {
          return `今天 ${d.format("HH:mm:ss")}`;
        } else if (dateX < 2) {
          return `昨天 ${d.format("HH:mm:ss")}`;
        } else if (dateX < 3) {
          return `前天 ${d.format("HH:mm:ss")}`;
        }
        return `本月 ${d.format("DD日 HH:mm")}`;
      } else if (monthX < 2) {
        return `上月 ${d.format("DD日 HH:mm")}`;
      }
      return `今年 ${d.format("MM月DD日")}`;
    } else if (yearX < 2) {
      return `去年 ${d.format("MM月DD日")}`;
    }
    return d.format("YYYY年MM月DD日");
  };
</script>

<div class="flex items-center pt-4 pb-4" in:fade>
  <input type="checkbox" bind:checked={item.finished} />
  <div
    class="ml-6 flex-1 mr-6 truncate transition-colors cursor-pointer select-none"
    class:line-through={item.finished}
    class:text-gray-400={item.finished}
    title={`${fmtTime(item.date)} | 点击查看详情`}
    on:click={() => dispatch("edit", item)}
  >
    {item.text}
  </div>
  <EventButton
    type="important"
    on:click={async () => {
      if (
        await showConfirm("提示", `你确定要删除这个代办事项吗？(id:${item.id})`)
      ) {
        dispatch("delete", item);
      }
    }}>删除</EventButton
  >
</div>
