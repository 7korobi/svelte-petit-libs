<script lang="ts">
  import Portrate from "../block/Portrate.svelte"

  export let handle: string = "VSSAY"
  export let pos: "focus" | "" = ""
  export let img_src: string = ""
  export let face_id: string = "undef"
</script>

<div class="talk">
  <div class="chat {handle} {pos}">
    <slot />
  </div>
  <div class="baloon {handle} {pos}" />
  <Portrate {img_src} {face_id} />
</div>
