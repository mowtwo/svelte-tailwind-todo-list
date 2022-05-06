<script lang="ts">
  import TextFeild from "./TextFeild.svelte";

  export let value: string;
  export let itemsWrapperThis: HTMLDivElement = null;
  export let disabled = false;
  export let placeholder = "";
</script>

<div class="w-[600px] overflow-hidden bg-[#fff]">
  <div class="flex items-center justify-center pt-2 pb-2">
    <TextFeild
      bind:value
      on:enter
      maxlength={40}
      showMaxLength
      {disabled}
      {placeholder}
    />
  </div>
  <div class="flex items-center">
    <div class="ml-4">
      <slot name="left-tools" />
    </div>
    <div class="ml-auto mr-4">
      <slot name="right-tools" />
    </div>
  </div>
  <div
    class="pl-4 pr-4 max-h-[400px] overflow-y-auto"
    bind:this={itemsWrapperThis}
  >
    <slot />
  </div>
</div>
