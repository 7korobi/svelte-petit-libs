<script lang="ts">
  import { onMount, onDestroy } from "svelte"
  import { Lazy } from "./lazy"

  export let el: HTMLIFrameElement
  export const group = "images"
  export const src = ""
  export const title = ""
  export const width = 0
  export const height = 0
  export const timeout = 20000

  let lazy = new Lazy(group, el, src, timeout)
  
  onDestroy(() => {
    lazy.bye(group)
  })
</script>

<iframe {title} {width} {height} bind:this={el} />
