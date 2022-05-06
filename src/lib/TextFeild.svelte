<script context="module" lang="ts">
  export interface TextFeildEvents {
    enter: string;
  }
</script>

<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let value: string;
  export let placeholder: string = "";

  const dispatch = createEventDispatcher<TextFeildEvents>();
</script>

<div class="bg-gray-100 flex-1 ml-4 mr-4 h-[40px] ">
  <input
    class="bg-transparent border-transparent outline-none w-[100%] h-[100%] box-border pr-4 pl-4"
    type="text"
    bind:value
    {placeholder}
    on:keydown={(e) =>
      e.key === "Enter" && value !== "" && dispatch("enter", value)}
    on:keydown
    on:input
    on:keyup
    on:keypress
  />
</div>
