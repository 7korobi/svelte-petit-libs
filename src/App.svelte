<script lang="ts">
  import { Calendar } from "fancy-date/lib/sample"

  Calendar.平気法

  export let name: string

  let count = 0
  let rest = "th"
  let color = "black"

  $: rest = [undefined, "st", "nd", "rd"][count] ?? "th"

  $: if (count < 9) {
    color = "blue"
  } else {
    color = "gray"
  }

  function handleClick() {
    count++
  }

  let c = 0
  let f = 32

  function byC(str: string) {
    c = +str
    f = +(32 + (9 / 5) * c).toFixed(1)
  }

  function byF(str: string) {
    f = +str
    c = +((5 / 9) * (f - 32)).toFixed(1)
  }
</script>

<main>
  <h1>Hello {name}!</h1>
  <p>
    Visit the
    <a href="https://svelte.dev/tutorial">Svelte tutorial</a>
    to learn how to build Svelte apps.
  </p>
  <button on:click={handleClick}>Clicked
    <span style={`color: ${color}`}>{count}{rest}</span></button>

  <!-- https://github.com/eugenkiss/7guis/wiki#temperature-converter -->
  <input value={c} on:input={(e) => byC(e.currentTarget.value)} type="number" />
  °c =
  <input value={f} on:input={(e) => byF(e.currentTarget.value)} type="number" />
  °f
  <style>
    input {
      width: 5em;
    }
  </style>
</main>

<style lang="scss">
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
    h1 {
      color: #ff3e00;
      text-transform: uppercase;
      font-size: 4em;
      font-weight: 100;
    }
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
