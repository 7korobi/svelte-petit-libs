<script lang="ts">
  import ThemeBtns from "../inline/ThemeBtns.svelte";
  import HeadViewport from "../head/HeadViewport.svelte";
  import SafeArea from "../head/SafeArea.svelte";
  import Report from "../chat/Report.svelte";

  export let max = 1.0;
  export let min = 1.0;

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
      <div class="summaryframe impose">
        <div data-v-20e9c027="" class="swipe">
          <table data-v-20e9c027="">
            <tfoot data-v-20e9c027="" class="TITLE form tb-btn"
              ><tr data-v-20e9c027=""
                ><th data-v-20e9c027="" colspan="3"
                  ><sup data-v-20e9c027="">(スクロールします)</sup></th
                ><th data-v-20e9c027=""
                  ><a data-v-20e9c027="" class="btn active">日程</a></th
                ><th data-v-20e9c027=""
                  ><a data-v-20e9c027="" class="btn">状態</a></th
                ><th data-v-20e9c027=""
                  ><a data-v-20e9c027="" class="btn">促</a></th
                ><th data-v-20e9c027="" colspan="2"
                  ><a data-v-20e9c027="" class="btn">回数</a><a
                    data-v-20e9c027=""
                    class="btn"
                    title="字数 ÷ 回数">平均</a
                  ><a data-v-20e9c027="" class="btn">字数</a><a
                    data-v-20e9c027=""
                    class="btn"
                    title="字数 ÷ 範囲">密度</a
                  ></th
                ><th data-v-20e9c027=""
                  ><a data-v-20e9c027="" class="btn">最初</a><a
                    data-v-20e9c027=""
                    class="btn"
                    title="最後 － 最初">範囲</a
                  ><a data-v-20e9c027="" class="btn">最後</a></th
                ><th data-v-20e9c027=""
                  ><a data-v-20e9c027="" class="btn">勝敗</a></th
                ><th data-v-20e9c027="" colspan="2"
                  ><a data-v-20e9c027="" class="btn">陣営</a><a
                    data-v-20e9c027=""
                    class="btn">役割</a
                  ></th
                ><th data-v-20e9c027=""
                  ><a data-v-20e9c027="" class="btn">希望</a></th
                ><th data-v-20e9c027=""
                  ><a data-v-20e9c027="" class="btn">補足</a></th
                ><th data-v-20e9c027="" class="last" /></tr
              ></tfoot
            ><tbody data-v-20e9c027="" class="potofs fine tlist"
              ><tr data-v-20e9c027=""
                ><td data-v-20e9c027="" class="c mdi" /><th
                  data-v-20e9c027=""
                  class="r leave">肉屋</th
                ><th data-v-20e9c027="" class="l leave">ニール</th><td
                  data-v-20e9c027=""
                  class="r leave"
                /><td data-v-20e9c027="" class="c leave">―</td
                ><!----><!----><!----><!----><!----><!----><!----><!----><td
                  data-v-20e9c027=""
                  class="l"><del data-v-20e9c027="">...</del></td
                ></tr
              ><tr data-v-20e9c027=""
                ><td data-v-20e9c027="" class="c mdi" /><th
                  data-v-20e9c027=""
                  class="r leave">食いしん坊</th
                ><th data-v-20e9c027="" class="l leave">マリアンヌ</th><td
                  data-v-20e9c027=""
                  class="r leave"
                /><td data-v-20e9c027="" class="c leave">―</td
                ><!----><!----><!----><!----><!----><!----><!----><!----><td
                  data-v-20e9c027=""
                  class="l"><del data-v-20e9c027="">...</del></td
                ></tr
              ><tr data-v-20e9c027=""
                ><td data-v-20e9c027="" class="c mdi" /><th
                  data-v-20e9c027=""
                  class="r victim">厭世家</th
                ><th data-v-20e9c027="" class="l victim">サイモン</th><td
                  data-v-20e9c027=""
                  class="r victim"
                >
                  2日</td
                ><td data-v-20e9c027="" class="c victim">襲撃</td
                ><!----><!----><!----><!----><!----><!----><!----><!----><td
                  data-v-20e9c027=""
                  class="l"><del data-v-20e9c027="">...</del></td
                ></tr
              ><tr data-v-20e9c027=""
                ><td data-v-20e9c027="" class="c mdi" /><th
                  data-v-20e9c027=""
                  class="r executed">聖歌隊員</th
                ><th data-v-20e9c027="" class="l executed">レティーシャ</th><td
                  data-v-20e9c027=""
                  class="r executed"
                >
                  3日</td
                ><td data-v-20e9c027="" class="c executed">処刑</td
                ><!----><!----><!----><!----><!----><!----><!----><!----><td
                  data-v-20e9c027=""
                  class="l"><del data-v-20e9c027="">...</del></td
                ></tr
              ><tr data-v-20e9c027=""
                ><td data-v-20e9c027="" class="c mdi" /><th
                  data-v-20e9c027=""
                  class="r victim">靴磨き</th
                ><th data-v-20e9c027="" class="l victim">トニー</th><td
                  data-v-20e9c027=""
                  class="r victim"
                >
                  3日</td
                ><td data-v-20e9c027="" class="c victim">襲撃</td
                ><!----><!----><!----><!----><!----><!----><!----><!----><td
                  data-v-20e9c027=""
                  class="l"><del data-v-20e9c027="">...</del></td
                ></tr
              ><tr data-v-20e9c027=""
                ><td data-v-20e9c027="" class="c mdi" /><th
                  data-v-20e9c027=""
                  class="r victim">奏者</th
                ><th data-v-20e9c027="" class="l victim">ビリー</th><td
                  data-v-20e9c027=""
                  class="r victim"
                >
                  4日</td
                ><td data-v-20e9c027="" class="c victim">襲撃</td
                ><!----><!----><!----><!----><!----><!----><!----><!----><td
                  data-v-20e9c027=""
                  class="l"><del data-v-20e9c027="">...</del></td
                ></tr
              ><tr data-v-20e9c027=""
                ><td data-v-20e9c027="" class="c mdi" /><th
                  data-v-20e9c027=""
                  class="r executed">店番</th
                ><th data-v-20e9c027="" class="l executed">ソフィア</th><td
                  data-v-20e9c027=""
                  class="r executed"
                >
                  4日</td
                ><td data-v-20e9c027="" class="c executed">処刑</td
                ><!----><!----><!----><!----><!----><!----><!----><!----><td
                  data-v-20e9c027=""
                  class="l"><del data-v-20e9c027="">...</del></td
                ></tr
              ><tr data-v-20e9c027=""
                ><td data-v-20e9c027="" class="c mdi" /><th
                  data-v-20e9c027=""
                  class="r executed">漂白工</th
                ><th data-v-20e9c027="" class="l executed">ピッパ</th><td
                  data-v-20e9c027=""
                  class="r executed"
                >
                  5日</td
                ><td data-v-20e9c027="" class="c executed">処刑</td
                ><!----><!----><!----><!----><!----><!----><!----><!----><td
                  data-v-20e9c027=""
                  class="l"><del data-v-20e9c027="">...</del></td
                ></tr
              ><tr data-v-20e9c027=""
                ><td data-v-20e9c027="" class="c mdi" /><th
                  data-v-20e9c027=""
                  class="r victim">牧人</th
                ><th data-v-20e9c027="" class="l victim">リンダ</th><td
                  data-v-20e9c027=""
                  class="r victim"
                >
                  5日</td
                ><td data-v-20e9c027="" class="c victim">襲撃</td
                ><!----><!----><!----><!----><!----><!----><!----><!----><td
                  data-v-20e9c027=""
                  class="l"><del data-v-20e9c027="">...</del></td
                ></tr
              ><tr data-v-20e9c027=""
                ><td data-v-20e9c027="" class="c mdi" /><th
                  data-v-20e9c027=""
                  class="r victim">流浪者</th
                ><th data-v-20e9c027="" class="l victim">ペラジー</th><td
                  data-v-20e9c027=""
                  class="r victim"
                >
                  6日</td
                ><td data-v-20e9c027="" class="c victim">襲撃</td
                ><!----><!----><!----><!----><!----><!----><!----><!----><td
                  data-v-20e9c027=""
                  class="l"><del data-v-20e9c027="">...</del></td
                ></tr
              ><tr data-v-20e9c027=""
                ><td data-v-20e9c027="" class="c mdi" /><th
                  data-v-20e9c027=""
                  class="r executed">若者</th
                ><th data-v-20e9c027="" class="l executed">テッド</th><td
                  data-v-20e9c027=""
                  class="r executed"
                >
                  6日</td
                ><td data-v-20e9c027="" class="c executed">処刑</td
                ><!----><!----><!----><!----><!----><!----><!----><!----><td
                  data-v-20e9c027=""
                  class="l"><del data-v-20e9c027="">...</del></td
                ></tr
              ><tr data-v-20e9c027=""
                ><td data-v-20e9c027="" class="c mdi" /><th
                  data-v-20e9c027=""
                  class="r live">子守り</th
                ><th data-v-20e9c027="" class="l live">パティ</th><td
                  data-v-20e9c027=""
                  class="r live"
                /><td data-v-20e9c027="" class="c live">生存者</td
                ><!----><!----><!----><!----><!----><!----><!----><!----><td
                  data-v-20e9c027=""
                  class="l"><del data-v-20e9c027="">...</del></td
                ></tr
              ><tr data-v-20e9c027=""
                ><td data-v-20e9c027="" class="c mdi" /><th
                  data-v-20e9c027=""
                  class="r live">小娘</th
                ><th data-v-20e9c027="" class="l live">ゾーイ</th><td
                  data-v-20e9c027=""
                  class="r live"
                /><td data-v-20e9c027="" class="c live">生存者</td
                ><!----><!----><!----><!----><!----><!----><!----><!----><td
                  data-v-20e9c027=""
                  class="l"><del data-v-20e9c027="">...</del></td
                ></tr
              ></tbody
            >
          </table>
        </div>
      </div>
      <div class="center-left" />
      <div class="center-right" />
    </div>
  </div>
</div>
<SafeArea {resize} {scroll} />
<HeadViewport {min} {max} />
