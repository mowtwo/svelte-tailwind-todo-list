<script lang="ts">
  import { slide } from "svelte/transition";
  import Icon from "./Icon.svelte";

  export let title = "";
  export let opened = false;
</script>

<div class="border-t-gray-200 border-b-gray-200 border-t border-b">
  <div
    on:click={() => (opened = !opened)}
    class="select-none cursor-pointer flex pt-2 pb-2 items-center justify-between"
  >
    <div class="{opened ? 'text-dark-300' : 'text-gray-500'} ml-2 text-[14px]">
      {title}
    </div>
    <div class="pr-2">
      <Icon name={opened ? "arrow-up" : "arrow-down"} />
    </div>
  </div>
  {#if opened}
    <div transition:slide class="mt-2 pb-2 pl-2 pr-2">
      <slot />
    </div>
  {/if}
</div>
