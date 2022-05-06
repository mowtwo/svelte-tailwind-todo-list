<script context="module" lang="ts">
  export type Type = "normal" | "important" | "cancel" | "confirm";
</script>

<script lang="ts">
  export let type: Type = "normal";
  const getBgColorType = (c: string) => `text-${c}-400`;
  const getBdColorType = (c: string) => `border-${c}-400`;

  const joinColorType = (c: string) => {
    return `${getBgColorType(c)} ${getBdColorType(c)}`;
  };
  const getColorType = (t: Type) => {
    switch (t) {
      case "important":
        return joinColorType("red");
      case "cancel":
        return joinColorType("gray");
      case "confirm":
        return joinColorType("yellow");
      default:
        return joinColorType("blue");
    }
  };
</script>

<button
  class="{getColorType(
    type
  )} h-[34px] w-[60px] border-solid border-[1px] select-none"
  on:click
>
  <slot />
</button>
