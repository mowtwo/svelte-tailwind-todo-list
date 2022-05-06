<script context="module" lang="ts">
  export type Type = "normal" | "important" | "cancel" | "confirm";
</script>

<script lang="ts">
  export let type: Type = "normal";
  const getColorType = (t: Type) => {
    switch (t) {
      case "important":
        return "red";
      case "cancel":
        return "gray";
      case "confirm":
        return "yellow";
      default:
        return "blue";
    }
  };
</script>

<button
  class="text-{getColorType(type)}-400 h-[34px] w-[60px] border-{getColorType(
    type
  )}-400 border-solid border-[1px] select-none"
  on:click
>
  <slot />
</button>
