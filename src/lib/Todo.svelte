<script context="module" lang="ts">
  export interface TodoEvents {
    enter: string;
  }
</script>

<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let value: string;
  export let itemsWrapperThis: HTMLDivElement;
  const dispatch = createEventDispatcher<TodoEvents>();
</script>

<div class="w-[600px] overflow-hidden bg-[#fff]">
  <div class="flex items-center justify-center pt-2 pb-2">
    <div class="bg-gray-100 flex-1 ml-4 mr-4 h-[40px] ">
      <input
        class="bg-transparent border-transparent outline-none w-[100%] h-[100%] box-border pr-4 pl-4"
        type="text"
        bind:value
        placeholder="Enter something want to do"
        on:keydown={(e) =>
          e.key === "Enter" && value !== "" && dispatch("enter", value)}
      />
    </div>
  </div>
  <div
    class="pl-4 pr-4 max-h-[400px] overflow-y-auto"
    bind:this={itemsWrapperThis}
  >
    <slot />
  </div>
</div>
