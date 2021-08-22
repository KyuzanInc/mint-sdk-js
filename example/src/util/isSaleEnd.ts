import { isAfter } from 'date-fns'

export const isSaleEnd = (endAt: Date) => {
  const now = new Date()
  return isAfter(now, endAt)
}
