<script lang="ts">
  import { Calendar } from "fancy-date/lib/sample"
  import HeadViewport from "./lib/HeadViewport.svelte"
  import SafeArea from "./lib/SafeArea.svelte"
  import KeyBoard from "./lib/KeyBoard.svelte"
  import FullScreen from "./lib/FullScreen.svelte"
  import Poll from "./lib/Poll.svelte"
  import { isOnline } from "./lib/browser"

  export let name: string

  let fs
  let c = 0
  let f = 32
  let news = [""]
  let count = 0
  let rest = "th"
  let color = "black"
  let data = []
  let testOnline = false

  $: rest = [undefined, "st", "nd", "rd"][count] ?? "th"

  $: if (count < 9) {
    color = "blue"
  } else {
    color = "gray"
  }

  setTimeout(() => {
    news = Calendar.平気法
      .format(
        new Date().getTime(),
        "Gy年Mod日 Homo Hrmr ao ar Ao Ar Eo Er Fo Fr No Nr Zo Zr"
      )
      .split(" ")
  }, 2000)

  async function reqPlan() {
    const req = await fetch("https://giji-api.duckdns.org/api/plan/progress")
    return (data = await req.json())
  }

  function keyCombo(e) {
    console.log(e)
  }

  function keyDown(e) {
    console.log(e)
  }

  function resize() {}

  function scroll() {}

  function handleClick() {
    count++
  }

  function byC(str: string) {
    c = +str
    f = +(32 + (9 / 5) * c).toFixed(1)
  }

  function byF(str: string) {
    f = +str
    c = +((5 / 9) * (f - 32)).toFixed(1)
  }
</script>

{testOnline}

<main>
  <FullScreen bind:toggle={fs}>
    <h1>Hello {name}! {$isOnline ? 'online' : 'offline'}</h1>
    <p>
      {@html news.join('<br />')}
    </p>
    <p>
      Visit the
      <a href="https://svelte.dev/tutorial">Svelte tutorial</a>
      to learn how to build Svelte apps.
    </p>
    <button on:click={fs}>full screen</button>
  </FullScreen>
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
<SafeArea {resize} {scroll} />
<HeadViewport max={2} />
<KeyBoard on:key={keyDown} on:combo={keyCombo} />
<Poll timer="6h" api={reqPlan} />

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
