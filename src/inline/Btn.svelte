<script lang="ts">
  export let value: any
  export let as: any

  $: active = value === as

  function tap() {
    value = as
    return false
  }
</script>

<button class:active on:click={tap}>
  <slot />
</button>
