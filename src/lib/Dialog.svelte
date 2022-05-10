<script context="module" lang="ts">
  export interface DialogEvents {
    bgClick: undefined;
    cancel: undefined;
    confirm: undefined;
    closed: undefined;
    opened: undefined;
    opening: undefined;
    closing: undefined;
  }

  export type Size = "md" | "lg" | "sm";
</script>

<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { fly, fade } from "svelte/transition";
  import EventButton from "./EventButton.svelte";

  export let title = "";
  export let showCancel = true;
  export let showConfirm = true;
  export let openAndShow = false;
  export let confirmText = "确定";
  export let confirmDisabled = false;
  export let cancelText = "取消";
  export let cancelDisabled = false;
  export let openOnInited = false;
  export let SlotContentThis: HTMLDivElement = null;
  export let size: Size = "md";

  const dispatch = createEventDispatcher<DialogEvents>();

  onMount(() => {
    if (openOnInited) {
      openAndShow = true;
    }
  });

  const sizeMapper: Record<Size, string> = {
    md: "w-[600px]",
    lg: "w-[800px]",
    sm: "w-[400px]",
  };

  $: sizeClass = sizeMapper[size];
</script>

<div>
  {#if openAndShow}
    <div
      class="fixed z-20 w-[100vw] h-[100vh] bg-[rgba(0,0,0,.2)] flex"
      on:click={() => dispatch("bgClick")}
      transition:fade
      on:introend={() => {
        if (openAndShow) {
          dispatch("opened");
        }
      }}
      on:introstart={() => {
        if (openAndShow) {
          dispatch("opening");
        }
      }}
      on:outrostart={() => {
        if (!openAndShow) {
          dispatch("closing");
        }
      }}
      on:outroend={() => {
        if (!openAndShow) {
          dispatch("closed");
        }
      }}
    >
      <div
        class="bg-white mt-4 ml-auto mr-auto p-2 shadow-md mb-auto {sizeClass}"
        transition:fly={{
          y: -50,
        }}
        on:click|stopPropagation
      >
        <div class="font-bold text-[18px] pt-2 pb-4 text-center">{title}</div>
        <div bind:this={SlotContentThis}>
          <slot />
        </div>
        {#if showCancel || showConfirm}
          <div class="mt-8 ml-4 mr-4 text-right">
            {#if showCancel}
              <EventButton
                type="cancel"
                on:click={() => dispatch("cancel")}
                disabled={cancelDisabled}
              >
                {cancelText}
              </EventButton>
            {/if}
            {#if showConfirm}
              <EventButton
                on:click={() => dispatch("confirm")}
                disabled={confirmDisabled}>{confirmText}</EventButton
              >
            {/if}
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>
