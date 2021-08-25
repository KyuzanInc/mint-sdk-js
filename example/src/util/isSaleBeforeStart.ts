import { isBefore } from 'date-fns'

export const isSaleBeforeStart = (startAt: Date) => {
  const now = new Date()
  return isBefore(now, startAt)
}
