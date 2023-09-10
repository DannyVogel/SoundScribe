export interface Note {
  id: string
  author: string
  timeStamp: Timestamp
  title: string
  content: string
  songURL: string
}

interface Timestamp {
  seconds: number
  nanoseconds: number
}
