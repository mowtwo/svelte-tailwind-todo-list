<script context="module" lang="ts">
  export interface TextFeildEvents {
    enter: string;
    clean: string;
  }
</script>

<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  export let value: string;
  export let placeholder = "";
  export let maxlength = 400;
  export let showMaxLength = false;
  export let cleanable = true;

  const dispatch = createEventDispatcher<TextFeildEvents>();

  $: inputCount = value?.length ?? 0;
</script>

<div
  class="bg-gray-100 flex-1 ml-4 mr-4 h-[40px] overflow-hidden flex items-center"
>
  <input
    class="bg-transparent border-transparent outline-none h-[100%] box-border pr-4 pl-4 flex-1"
    type="text"
    bind:value
    {placeholder}
    {maxlength}
    on:keydown={(e) =>
      e.key === "Enter" && value !== "" && dispatch("enter", value)}
    on:keydown
    on:input
    on:keyup
    on:keypress
  />
  {#if cleanable && value.length > 0}
    <div
      class="text-white bg-cool-gray-400 w-4 h-4 flex items-center justify-center mr-4 cursor-pointer rounded-md leading-4"
      title="清空"
      transition:fade
      on:click={() => {
        const temp = value;
        value = "";
        dispatch("clean", temp);
      }}
    >
      ×
    </div>
  {/if}
  {#if showMaxLength}
    <div class="mr-4 text-[14px] text-gray-400">
      <span class:text-red-500={value.length >= maxlength}>{inputCount}</span
      >/{maxlength}
    </div>
  {/if}
</div>
