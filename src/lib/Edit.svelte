<script context="module" lang="ts">
</script>

<script lang="ts">
  import TextFeild from "./TextFeild.svelte";
  import type { TodoItemType } from "./TodoItem.svelte";

  export let item: TodoItemType;
</script>

<div class="font-bold text-[18px] pt-2 pb-4 text-center">代办事项详情</div>
{#if item}
  <TextFeild
    bind:value={item.text}
    maxlength={40}
    showMaxLength
    placeholder="代办事项不能为空"
  />
{/if}
