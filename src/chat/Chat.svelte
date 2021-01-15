<script lang="ts">
  import talk from "./Talk.svelte"
  import post from "./Post.svelte"
  import report from "./Report.svelte"
  const sveltes = { talk, post, report }

  export let show: keyof typeof sveltes
  export let handle: string = "VSSAY"
  export let pos: "focus" | "" = ""
  export let face_id: string = ""
  export let log: string = ""
  export let to: string = ""
  export let head: string = ""
  export let label: string = ""
</script>

<svelte:component this={sveltes[show]} {handle} {pos} {face_id}>
  {#if head}
    {#if to}
      <span class="pull-right">{to}</span>▷<span class="pull-left">{head}</span>
    {:else}<span class="pull-right">{label}</span>{head}{/if}
    <hr />
  {/if}
  {#if log}
    {@html log}
  {:else}
    <slot />
  {/if}
</svelte:component>
