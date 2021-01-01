import { readable, derived } from "svelte/store"
import { __BROWSER__ } from "./device"

export const isOnline = readable(window.navigator.onLine, (set) => {
  window.addEventListener("offline", update)
  window.addEventListener("online", update)

  function update() {
    set(window.navigator.onLine)
    requestAnimationFrame(() => {
      set(window.navigator.onLine)
    })
  }

  return function release() {
    window.removeEventListener("offline", update)
    window.removeEventListener("online", update)
  }
})

export const isWatching = readable(
  "hidden" !== document.visibilityState,
  (set) => {
    window.addEventListener("visibilitychange", update)

    function update() {
      set("hidden" !== document.visibilityState)
      requestAnimationFrame(() => {
        set("hidden" !== document.visibilityState)
      })
    }

    return function release() {
      window.removeEventListener("visibilitychange", update)
    }
  }
)

export const isActive = derived(
  [isOnline, isWatching],
  ([online, watching]) => online && watching
)

export function readyOnline(): Promise<void> {
  return new Promise((ok) => {
    if (window.navigator.onLine) {
      ok()
    } else {
      window.addEventListener("online", update)
    }

    function update() {
      window.removeEventListener("online", update)
      ok()
    }
  })
}

export function readyWatching(): Promise<void> {
  return new Promise((ok) => {
    if ("hidden" !== document.visibilityState) {
      ok()
    } else {
      window.addEventListener("visibilitychange", update)
    }

    function update() {
      if ("hidden" === document.visibilityState) return
      window.removeEventListener("visibilitychange", update)
      ok()
    }
  })
}

export function readyDownload(
  el: HTMLImageElement | HTMLIFrameElement,
  url: string,
  timeout = 20000
): Promise<Event> {
  return new Promise((ok, ng) => {
    const timer = setTimeout(fail, timeout)
    el.addEventListener("error", fail)
    el.addEventListener("load", success)
    el.src = url

    function bye() {
      el.removeEventListener("error", fail)
      el.removeEventListener("load", success)
    }

    function fail(e: Event = new Event(`timeout ${timeout / 1000}sec`)) {
      el.src = ""
      bye()
      ng(e)
    }

    function success(e: Event) {
      bye()
      ok(e)
    }
  })
}
