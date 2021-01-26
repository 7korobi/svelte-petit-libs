
import type { SHOWS, STYLES } from "./_dic"


type ChatCount = {
  count: number
}
type ChatMax = {
  max: number
  max_is: Chat
}
type ChatGroup = {
  min: number
  max: number
  min_is: Chat
  max_is: Chat
}
type ChatReport = {
  count: number
  all: number
  avg: number
  range: number
  density: number
  min: number
  max: number
  min_is: Chat
  max_is: Chat
}

export class Chat {
  potof_id!: string
  phase_id!: string
  part_id!: string
  book_id!: string

  mention_ids!: string[]
  idx!: string

  write_at!: number

  show!: SHOWS
  style!: STYLES
  log?: string
  q!: {
    group: string
    search_words: string
  }
}
