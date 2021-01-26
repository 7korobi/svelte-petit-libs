<script lang="ts">
  import ThemeBtns from "../inline/ThemeBtns.svelte"
  import HeadViewport from "../head/HeadViewport.svelte"
  import SafeArea from "../head/SafeArea.svelte"
  import Report from "../chat/Report.svelte"

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
          <slot>ここにコンテンツを書きます。</slot>
        </div>
      </div>
      <div class="toastframe">
        <div class="inframe">
          <Report handle="ADMIN">
            <div class="text fine mono">
              <p class="r">
                <span class="limit1-ok">o</span>
                <span class="limit1-ng">-</span>
                <span class="limit2-ok">o</span>
                <span class="limit2-ng">-</span>
                <span class="limit3-ok">o</span>
                <span class="limit3-ng">-</span>
              </p>
              <p
                data-tooltip="不十分な画面幅にあわせ、折返し表示をしています"
                class="limit1-ng tooltip-left"
              >
                折返中
              </p>
            </div>
          </Report>
          <div class="icons form">
            <button
              class="btn item-half tooltip-left"
              data-tooltip="詳細情報を拡げる操作の ON / OFF"
            >
              <i class="mdi mdi-arrow-expand-right" />
            </button>
            <button
              class="btn item-half tooltip-left active"
              data-tooltip="ページ一覧を一列にする / 折り返す"
            >
              <i class="mdi mdi-gesture-swipe" />
            </button>
          </div>
        </div>
      </div>
      <div class="sideframe">
        <div class="inframe">
          <div class="icons form">
            <button
              class="btn item-half tooltip-left"
              data-tooltip="詳細情報を拡げる操作の ON / OFF"
            >
              <i class="mdi mdi-arrow-expand-right" />
            </button>
            <button
              class="btn item-half tooltip-left active"
              data-tooltip="ページ一覧を一列にする / 折り返す"
            >
              <i class="mdi mdi-gesture-swipe" />
            </button>
          </div>
        </div>
      </div>
      <div class="summaryframe impose" />
      <div class="center-left" />
      <div class="center-right" />
    </div>
  </div>
</div>
<SafeArea {resize} {scroll} />
<HeadViewport {min} {max} />
