<script>
  export let text = "";
</script>

<div>
  {#if $$slots.default}
    <slot />
  {:else}
    <div class="text-[14px] text-gray-600 pl-4 pr-4 mt-2 mb-2">
      {text}
    </div>
  {/if}
</div>
