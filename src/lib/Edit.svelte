<script context="module" lang="ts">
  export interface EditEvents {
    bgClick: undefined;
    cancel: undefined;
    confirm: TodoItemType;
  }
</script>

<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { fly, fade } from "svelte/transition";
  import EventButton from "./EventButton.svelte";
  import TextFeild from "./TextFeild.svelte";
  import type { TodoItemType } from "./TodoItem.svelte";

  export let item: TodoItemType;

  let editing: TodoItemType = null;

  onMount(() => {
    editing = { ...item };
  });

  const dispatch = createEventDispatcher<EditEvents>();
</script>

<div
  class="fixed z-20 w-[100vw] h-[100vh] bg-[rgba(0,0,0,.2)] flex"
  on:click={() => dispatch("bgClick")}
  transition:fade
>
  <div
    class="bg-white w-[600px] mt-4 ml-auto mr-auto p-2 shadow-md mb-auto"
    transition:fly={{
      y: -50,
    }}
    on:click|stopPropagation
  >
    <div class="font-bold text-[18px] pt-2 pb-4 text-center">代办事项详情</div>
    {#if editing}
      <TextFeild
        bind:value={editing.text}
        maxlength={40}
        showMaxLength
        placeholder="代办事项不能为空"
      />
    {/if}
    <div class="mt-8 ml-4 mr-4 text-right">
      <EventButton type="cancel" on:click={() => dispatch("cancel")}
        >取消</EventButton
      >
      <EventButton
        on:click={() => {
          dispatch("confirm", editing);
        }}>修改</EventButton
      >
    </div>
  </div>
</div>
