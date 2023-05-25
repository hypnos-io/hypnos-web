import {SyntheticEvent} from 'react'

export function handleImageError(
  event: SyntheticEvent<HTMLImageElement>,
  imagePath: string,
  cb?: (event: SyntheticEvent<HTMLImageElement>) => void
) {
  event.currentTarget.onerror = null
  event.currentTarget.src = imagePath
  console.clear()
  if (cb) {
    cb(event)
  }
}
