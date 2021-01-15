<script lang="ts">
import ThemeBtns from "../inline/ThemeBtns.svelte";
import HeadViewport from "../head/HeadViewport.svelte"
import SafeArea from "../head/SafeArea.svelte"

export let max = 1.0
export let min = 1.0

function resize() {}

function scroll() {}

</script>

<div class="page-active-bg">
  <div class="page-active">
    <div class="outframe">
      <ThemeBtns />
      <div class="contentframe">
        <div class="inframe">
          <slot>
            ここにコンテンツを書きます。
          </slot>
        </div>
      </div>
    </div>
  </div>
</div>
<SafeArea {resize} {scroll} />
<HeadViewport {min} {max} />
