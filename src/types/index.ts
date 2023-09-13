export interface Note {
  id: string
  author: string
  timeStamp: Timestamp
  title: string
  content: string
  songURL: string
  likedBy: string[]
  comments?: object[]
  [key: string]: any
}

interface Timestamp {
  seconds: number
  nanoseconds: number
}
