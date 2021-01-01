import { writable } from "svelte/store"
import { isOnline, readyDownload } from "./browser"
import type { DIC } from "./util"

export class Lazy {
  idx: number
  url: string
  el?: (HTMLImageElement | HTMLIFrameElement) & {
    item: Lazy
  }
  promise: Promise<Event>
  timeout: number
  loader: Loader

  errorAt = 0
  isLoaded: boolean
  isExpress: boolean

  constructor(
    group: string,
    el: HTMLImageElement | HTMLIFrameElement,
    url: string,
    timeout: number
  ) {
    this.el = el as any
    this.el.item = this
    this.url = url
    this.timeout = timeout
    Loader.join(group, this)
  }

  abort() {
    this.el.dispatchEvent(new CustomEvent('--abort'))
  }

  bye(group: string) {
    Loader.bye(group, this)
  }
}

export class Loader {
  static list: DIC<Loader>

  static setup(group: string, root: HTMLDivElement) {
    const dl = this.list[group] ?? new this(group, root)
    this.list[group] = dl
  }

  static join(group: string, e: Lazy) {
    this.list[group] ?? this.setup(group, undefined)
    const dl = this.list[group]
    e.loader = dl
    e.idx = dl.list.length
    dl.list.push(e)
    dl.deploys.observe(e.el)
    dl.shows.observe(e.el)
  }

  static bye(group: string, e: Lazy) {
    const dl = this.list[group]
    const idx = dl.list.indexOf(e)
    if (idx < 0) return
    dl.list.splice(idx, 1)
    dl.deploys.unobserve(e.el)
    dl.shows.unobserve(e.el)
  }

  idx = 0
  idxStore = writable(0)
  byeOnline = isOnline.subscribe((online) => {
    if (online) doNextSequence(this)
  })

  list: Lazy[] = []
  root: HTMLDivElement
  group: string
  doing: Lazy

  shows: IntersectionObserver
  deploys: IntersectionObserver

  constructor(
    group: string,
    root?: HTMLDivElement,
    option = {
      fetchMargin: "0% 0% 0% 0%",
      indexMargin: "-50%",
    }
  ) {
    this.group = group
    this.root = root

    this.deploys = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          const e: Lazy = (target as any).item
          e.isExpress = isIntersecting
        })
        doNextSequence(this)
      },
      {
        root,
        rootMargin: option.fetchMargin,
        threshold: [0],
      }
    )

    this.shows = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          const e: Lazy = (target as any).item
          if (isIntersecting) {
            const { idx } = e
            this.idx = idx
            this.idxStore.set(idx)
          }
        })
      },
      {
        root,
        rootMargin: option.indexMargin,
        threshold: [0],
      }
    )
  }
}

function doSequence(dl: Loader, e?: Lazy) {
  if (!e) return
  if (!window.navigator.onLine) return

  dl.doing = e
  readyDownload(e.el, e.url, e.timeout)
    .then(() => {
      delete dl.doing
      e.isLoaded = true
      doNextSequence(dl)
    })
    .catch(() => {
      delete dl.doing
      if (window.navigator.onLine) {
        e.errorAt = new Date().getTime()
        doNextSequence(dl)
      }
    })
}

function doNextSequence(dl: Loader) {
  const e = nextSequence(dl)
  if (e && dl.doing && e !== dl.doing) {
    dl.doing.abort()
  }
  doSequence(dl, e)  
}

function nextSequence(dl: Loader) {
  const top: Lazy[] = []
  const back: Lazy[] = []
  const after: Lazy[] = []
  const before: Lazy[] = []
  let cursor = after
  const now = new Date().getTime()

  dl.list.forEach((e, idx) => {
    e.idx = idx
    if (dl.idx < idx) {
      cursor = e.isExpress ? back : before
    } else {
      cursor = e.isExpress ? top : after
    }
    if (!e.isLoaded && e.errorAt + e.timeout < now) {
      cursor.push(e)
    }
  })
  const e = [...top, ...back.reverse(), ...after, ...before.reverse()][0]
  return e
}
