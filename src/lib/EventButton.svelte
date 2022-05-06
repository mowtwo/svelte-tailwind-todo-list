<script context="module" lang="ts">
  export type Type = "normal" | "important" | "cancel" | "confirm";
</script>

<script lang="ts">
  export let type: Type = "normal";

  const textColorMapper: Record<Type, string> = {
    important: "text-red-400",
    cancel: "text-grat-400",
    confirm: "text-yellow-400",
    normal: "text-blue-400",
  };

  const borderColorMapper: Record<Type, string> = {
    important: "border-red-400",
    cancel: "border-grat-400",
    confirm: "border-yellow-400",
    normal: "border-blue-400",
  };

  $: textColor = textColorMapper[type] ?? "text-blue-400";
  $: borderColor = borderColorMapper[type] ?? "border-blue-400";
</script>

<button
  class="h-[34px] w-[60px] border-solid border-[1px] select-none {textColor} {borderColor}"
  on:click
>
  <slot />
</button>
