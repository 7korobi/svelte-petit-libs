<script lang="ts">
  export let handle: string = "VSSAY"
  export let pos: "focus" | "" = ""
</script>

<div class="report">
  <div class="chat {handle} {pos}">
    <slot />
  </div>
</div>
