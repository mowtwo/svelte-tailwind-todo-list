<script lang="ts">
  import { Config, key } from "@/context/config";

  import { getContext } from "svelte";
  import Link from "./Link.svelte";

  const config = getContext<Config>(key);
</script>

<div class="text-[14px] text-gray-400">
  正在开发 敬请等待
  <Link href={config.repo}>欢迎Fork，提交PR</Link>
</div>
