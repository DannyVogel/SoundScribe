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
