<script lang="ts">
  export let href: string;
</script>

<a
  {href}
  class="text-blue-400 underline underline-offset-2 underline-transparent hover:underline-blue-400"
>
  <slot />
</a>
