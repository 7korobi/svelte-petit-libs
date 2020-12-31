<script lang="ts">
  export const min = 1.0
  export const max = 1.0

  let viewport_content = [
    "viewport-fit=cover",
    "width=device-width",
    "initial-scale=1.0",
    `minimum-scale=${min}`,
    ...(min < max
      ? [`maximum-scale=${max}`, "user-scalable=yes"]
      : [`maximum-scale=${max}`, "user-scalable=no"]),
  ]
</script>

<svelte:head>
  <meta name="viewport" content={viewport_content.join(',')} />
</svelte:head>
