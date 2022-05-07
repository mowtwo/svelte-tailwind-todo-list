import Dialog from "@/lib/Dialog.svelte";
import DialogContent from "@/lib/DialogContent.svelte";
import type { SvelteComponent } from "svelte";
import openRender from "./open-render";

let dialogWrapper: Element;

function checkWrapper() {
  if (!dialogWrapper) {
    dialogWrapper = document.createElement("div");
    document.body.appendChild(dialogWrapper);
    dialogWrapper.setAttribute('data-created-id', Date.now().toString());
  }
  return dialogWrapper;
}

function clearWrapper() {
  if (!dialogWrapper) {
    return
  }
  if (dialogWrapper.children.length <= 0) {
    dialogWrapper.parentElement.removeChild(dialogWrapper);
    dialogWrapper = null;
  }
}

export interface ShowOptions {
  title: string;
  onOpen: () => void;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText: string;
  cancelText: string;
  showCancel: boolean;
  showConfirm: boolean;
  text: string;
}

export function show({
  title,
  onCancel,
  onClose,
  onConfirm,
  confirmText,
  cancelText,
  showCancel,
  showConfirm,
  text
}: Partial<ShowOptions> = {}) {
  const wrapper = checkWrapper();
  const dialogMount = openRender(Dialog)({
    title,
    confirmText,
    cancelText,
    showCancel,
    showConfirm,

  })


  const dialog = dialogMount(wrapper);
  const cotentMount = openRender(DialogContent)({
    text
  })

  dialog.$on('bgClick', function () {
    dialog.$set({
      openAndShow: false
    })
  })

  let conetent: SvelteComponent
  dialog.$on('opening', function () {
    const contentWrapper = dialog.$$.ctx?.[dialog.$$.props.SlotContentThis ?? -1]
    if (contentWrapper) {
      conetent = cotentMount(contentWrapper);
    }
  })

  dialog.$on('cancel', function () {
    dialog.$set({
      openAndShow: false
    })
    onCancel?.();
  })

  dialog.$on('confirm', function () {
    dialog.$set({
      openAndShow: false
    })
    onConfirm?.();
  })


  dialog.$on('closed', function () {
    conetent?.$destroy?.()
    dialog.$destroy();
    clearWrapper();
    onCancel?.()
    onClose?.();
  })

  dialog.$set({
    openAndShow: true
  })
}

export function showConfirm(title: string, text: string = '') {
  return new Promise((resolve) => {
    show({
      title, text,
      onCancel() {
        resolve(false);
      },
      onConfirm() {
        resolve(true);
      }
    })
  })
}