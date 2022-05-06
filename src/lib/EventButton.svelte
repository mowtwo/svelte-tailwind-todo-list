<script context="module" lang="ts">
  export type Type = "normal" | "important" | "cancel" | "confirm";
</script>

<script lang="ts">
  export let type: Type = "normal";
</script>

<button
  class="h-[34px] w-[60px] border-solid border-[1px] select-none text-blue-400 border-blue-400"
  class:text-red-400={type === "important"}
  class:border-red-400={type === "important"}
  class:text-gray-400={type === "cancel"}
  class:border-gray-400={type === "cancel"}
  class:text-yellow-400={type === "confirm"}
  class:border-yellow-400={type === "confirm"}
  on:click
>
  <slot />
</button>
