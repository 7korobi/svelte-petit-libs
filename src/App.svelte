<script lang="ts">
  import { Calendar } from "fancy-date/lib/sample"
  import { isOnline } from "./lib/browser"
  import { Bits } from "./lib/bits"

  import Poll from "./data/Poll.svelte"

  import Giji from "./layout/Giji.svelte"

  import Chat from "./chat/Chat.svelte"
  import Banner from "./chat/Banner.svelte"

  import KeyBoard from "./head/KeyBoard.svelte"
  import FullScreen from "./head/FullScreen.svelte"

  import RoosterArea from "./form/RoosterArea.svelte"

  import Btn from "./inline/Btn.svelte"

  import Scroll from "./block/Scroll.svelte"
  import Diagram from "./block/Diagram.svelte"

  export let name: string

  let fs
  let c = 0
  let f = 32
  let texts = []
  let rubys = []
  let count = 0
  let rest = "th"
  let color = "black"
  let data = []

  const GameBits = new Bits(["A", "B", "C", "D"], {
    AB: ["B", "A"],
    CD: ["C", "D"],
    BC: ["AB", "C"],
  })
  let games = 0

  let icons = [
    { v: "c01", roll: 0, x: -200, y: -100, label: "花売り メアリー" },
    { v: "c02", roll: 0, x: 200, y: -100, label: "村長をそんちょうしよう！" },
    { v: "c03", roll: 90, x: -200, y: 100, label: "1st" },
    { v: "c04", roll: 180, x: 0, y: 180, label: "" },
    { v: "c05", roll: 270, x: 200, y: 100, label: "3rd" },
  ]
  let lines = [
    { v: "c01", w: "c02", vpos: 0, wpos: 0, line: " = ", label: "ふれんず" },
    { v: "c01", w: "c02", vpos: 180, wpos: 0, line: " ->", label: "フレンズ" },
    { v: "c01", w: "c02", vpos: 0, wpos: 180, line: "<- ", label: "ふれんず" },
    { v: "c01", w: "c02", vpos: 180, wpos: 180, line: "o.x", label: "" },
  ]
  let clusters = [{ vs: ["c01"], label: "グループ" }]

  // $: console.log(group, core, mode, rect)

  $: rest = [undefined, "st", "nd", "rd"][count] ?? "th"

  $: if (count < 9) {
    color = "blue"
  } else {
    color = "gray"
  }

  setTimeout(() => {
    const data = Calendar.平気法
      .format(
        new Date().getTime(),
        "Gy年 d日|Mo Ho mo ao Ao Eo Fo No Zo|Mr Hr mr ar Ar Er Fr Nr Zr"
      )
      .split("|")
    const ymd = data[0].split(" ")
    texts = data[1].split(" ")
    rubys = data[2].split(" ")
    rubys = ["", rubys[0], "", ...rubys.slice(1)]
    texts = [ymd[0], texts[0], ymd[1], ...texts.slice(1)]
  }, 2000)

  async function reqPlan() {
    const req = await fetch("https://giji-api.duckdns.org/api/plan/progress")
    return (data = await req.json())
  }

  function keyCombo(e) {
    //console.log(e)
  }

  function keyDown(e) {
    //console.log(e)
  }

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

  function intersection(e) {
    console.log(e.detail)
  }
</script>

<Giji max={2.0}>
  <Scroll name=".1" on:change={intersection}>
    <FullScreen bind:toggle={fs}>
      <Banner>
        <h3>.1.1</h3>
      </Banner>
      <Chat show="report" handle="VSSAY">
        <h1 class="c">Hello {name}! {$isOnline ? "online" : "offline"}</h1>
        <p>
          on :
          {#each GameBits.labels as game (game)}
            <Btn type="on" bind:value={games} as={GameBits.posi[game]}>
              {game}
            </Btn>
          {/each}
          {#each GameBits.labels as game (game)}
            <Btn type="on" bind:value={games} as={GameBits.nega[game]}>
              ~{game}
            </Btn>
          {/each}
        </p>
        <p>
          off :
          {#each GameBits.labels as game (game)}
            <Btn type="off" bind:value={games} as={GameBits.posi[game]}>
              {game}
            </Btn>
          {/each}
          {#each GameBits.labels as game (game)}
            <Btn type="off" bind:value={games} as={GameBits.nega[game]}>
              ~{game}
            </Btn>
          {/each}
        </p>
        <p>
          xor :
          {#each GameBits.labels as game (game)}
            <Btn type="xor" bind:value={games} as={GameBits.posi[game]}>
              {game}
            </Btn>
          {/each}
          {#each GameBits.labels as game (game)}
            <Btn type="xor" bind:value={games} as={GameBits.nega[game]}>
              ~{game}
            </Btn>
          {/each}
        </p>
        <p>
          toggle :
          {#each GameBits.labels as game (game)}
            <Btn type="toggle" bind:value={games} as={GameBits.posi[game]}>
              {game}
            </Btn>
          {/each}
          {#each GameBits.labels as game (game)}
            <Btn type="toggle" bind:value={games} as={GameBits.nega[game]}>
              ~{game}
            </Btn>
          {/each}
        </p>
        <p>
          set :
          {#each GameBits.labels as game (game)}
            <Btn type="set" bind:value={games} as={GameBits.posi[game]}>
              {game}
            </Btn>
          {/each}
          {#each GameBits.labels as game (game)}
            <Btn type="set" bind:value={games} as={GameBits.nega[game]}>
              ~{game}
            </Btn>
          {/each}
        </p>
        <p>
          as :
          {#each GameBits.labels as game (game)}
            <Btn type="as" bind:value={games} as={GameBits.posi[game]}>
              {game}
            </Btn>
          {/each}
          {#each GameBits.labels as game (game)}
            <Btn type="as" bind:value={games} as={GameBits.nega[game]}>
              ~{game}
            </Btn>
          {/each}
        </p>
        <p>
          {#each texts as text, idx (text)}
            {#if rubys[idx]}
              <ruby
                >{text}
                <rt>{rubys[idx]}</rt></ruby
              >
            {:else}{text}{/if}
          {/each}
        </p>
        <p>
          Visit the
          <a href="https://svelte.dev/tutorial">Svelte tutorial</a>
          to learn how to build Svelte apps.
        </p>
      </Chat>
      <Banner>
        <h3>.1.2</h3>
      </Banner>
      <Chat show="talk" handle="PSAY" id="rooster" face_id="c03">
        <RoosterArea />
        <button on:click={fs}>full screen</button>
      </Chat>
    </FullScreen>
  </Scroll>

  <Scroll name=".2" on:change={intersection}>
    <Banner>
      <h3>.2</h3>
    </Banner>
    <Scroll name=".2.1" on:change={intersection}>
      <Chat show="post" handle="TSAY">
        <button on:click={handleClick}
          >Clicked
          <span style={`color: ${color}`}>{count}{rest}</span></button
        >

        <!-- https://github.com/eugenkiss/7guis/wiki#temperature-converter -->
        <input
          value={c}
          on:input={(e) => byC(e.currentTarget.value)}
          type="number"
        />
        °c =
        <input
          value={f}
          on:input={(e) => byF(e.currentTarget.value)}
          type="number"
        />
        °f<style>
          input {
            width: 5em;
          }
        </style></Chat
      >
    </Scroll>
    <Scroll name=".2.2" on:change={intersection}>
      <Chat show="report" handle="SSAY">
        <Diagram {icons} {lines} {clusters} />
      </Chat>
    </Scroll>
  </Scroll>

  <Scroll name=".3" on:change={intersection}>
    <Banner>
      <h3>.3</h3>
    </Banner>
    <Scroll name=".3.1" on:change={intersection}>
      <Chat show="post" handle="TSAY">
        <h1 class="c">こんにちは、Svelte世界！　Hello SVELTE world!</h1>
        <hr />
        <h2 class="c">こんにちは、Svelte世界！　Hello SVELTE world!</h2>
        <hr />
        <h3 class="c">こんにちは、Svelte世界！　Hello SVELTE world!</h3>
        <hr class="stripe" />
        <hr class="blank" />
        <hr class="stripe" />
        <h4 class="c">こんにちは、Svelte世界！　Hello SVELTE world!</h4>
        <hr class="footnote" />
        <h5 class="c">こんにちは、Svelte世界！　Hello SVELTE world!</h5>
        <hr class="footnote" />
        <h6 class="c">こんにちは、Svelte世界！　Hello SVELTE world!</h6>
      </Chat>
    </Scroll>
    <Scroll name=".3.2" on:change={intersection}>
      <Chat show="talk" handle="WSAY" face_id="t10" head="abc">
        <h1 class="c">こんにちは、Svelte世界！　Hello SVELTE world!</h1>
        <hr />
        <h2 class="c">こんにちは、Svelte世界！　Hello SVELTE world!</h2>
        <hr />
        <h3 class="c">こんにちは、Svelte世界！　Hello SVELTE world!</h3>
        <hr class="stripe" />
        <hr class="blank" />
        <hr class="stripe" />
        <h4 class="c">こんにちは、Svelte世界！　Hello SVELTE world!</h4>
        <hr class="footnote" />
        <h5 class="c">こんにちは、Svelte世界！　Hello SVELTE world!</h5>
        <hr class="footnote" />
        <h6 class="c">こんにちは、Svelte世界！　Hello SVELTE world!</h6>
      </Chat>
    </Scroll>
  </Scroll>
</Giji>
<KeyBoard on:key={keyDown} on:combo={keyCombo} />
<Poll timer="6h" api={reqPlan} />
