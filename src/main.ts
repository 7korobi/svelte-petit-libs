import Root from "./routes/index.svelte"

const app = new Root({
  target: document.body,
  props: {
    name: "world",
  },
})

export default app
