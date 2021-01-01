<script lang="ts">
  import { isLegacy } from "./device"
  import { ViewBox, ZoomBox, setResize, setScroll } from "./area"
  import { onMount, onDestroy } from "svelte"

  const { style } = document.body

  export let resize: { (): void }
  export let scroll: { (): void }

  let [vw, vh] = ViewBox.size
  let [zw, zh] = ZoomBox.size

  let zs = ZoomBox.scale
  let [zt, zr, zb, zl] = ZoomBox.offset

  $: resize && style.setProperty("--view-width", `${vw}px`)
  $: resize && style.setProperty("--view-height", `${vh}px`)
  $: resize && style.setProperty("--zoom-width", `${zw}px`)
  $: resize && style.setProperty("--zoom-height", `${zh}px`)

  $: resize && style.setProperty("--zoom-in", `${zs}`)
  $: resize && style.setProperty("--zoom-out", `${1 / zs}`)

  $: scroll && style.setProperty("--zoom-top", `${zt}px`)
  $: scroll && style.setProperty("--zoom-right", `${zr}px`)
  $: scroll && style.setProperty("--zoom-bottom", `${zb}px`)
  $: scroll && style.setProperty("--zoom-left", `${zl}px`)

  if (!isLegacy) {
    onMount(() => {
      resize && window.visualViewport.addEventListener("resize", onResizeBare)
      scroll && window.visualViewport.addEventListener("scroll", onScrollBare)
    })

    onDestroy(() => {
      resize &&
        window.visualViewport.removeEventListener("resize", onResizeBare)
      scroll &&
        window.visualViewport.removeEventListener("scroll", onScrollBare)
    })
  }

  function onResizeBare() {
    setResize()
    ;[vw, vh] = ViewBox.size
    ;[zw, zh] = ZoomBox.size
    zs = ZoomBox.scale
    resize()
  }

  function onScrollBare() {
    setScroll()
    ;[zt, zr, zb, zl] = ZoomBox.offset
    scroll()
  }
</script>
