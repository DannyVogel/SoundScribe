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
