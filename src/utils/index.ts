import { Note } from '@/types'

export const getYouTubeEmbedUrl = (url) => {
  const youtubeUrlRegex =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?(?=.*v=(\w+))(?:\S+)?|embed\/(\w+)|v\/(\w+)|user\/\w+)?|youtu\.be\/(\w+))$/
  const match = url.match(youtubeUrlRegex)

  if (match) {
    const videoId = match[1] || match[2] || match[3] || match[4]
    return `https://www.youtube.com/embed/${videoId}`
  }

  return null
}

export const uuidv4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export const youtubeUrlRegex =
  /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?(?=.*v=([-\w]+))(?:\S+)?|embed\/([-\w]+)|v\/([-\w]+)|user\/\w+)?|youtu\.be\/([-\w]+))/

export const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const findNoteById = (
  id: string,
  notesDictionary: Record<string, Note>
): Note | undefined => {
  for (const key in notesDictionary) {
    if (notesDictionary[key].id === id) {
      return notesDictionary[key]
    }
  }
  return undefined
}
export const findNoteKeyById = (
  id: string,
  notesDictionary: Record<string, Note>
): string | undefined => {
  for (const key in notesDictionary) {
    if (notesDictionary[key].id === id) {
      return key
    }
  }
  return undefined
}
