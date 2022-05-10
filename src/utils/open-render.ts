import type { SvelteComponent } from "svelte";
import { mount_component } from "svelte/internal"

export default function openRender<CT extends typeof SvelteComponent>(C: CT) {
  return function factory(props: ConstructorParameters<CT>[0]['props']) {
    let c: SvelteComponent;
    return function mount(target: Element) {
      return c = new C({ target, props });
    }
  }
}

export function append(c: SvelteComponent, t: SvelteComponent) {
  return mount_component(c, t, null, null)
}