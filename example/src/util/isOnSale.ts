import { isBefore, isAfter } from 'date-fns'

export const isOnSale = (startAt: Date, endAt: Date) => {
  const now = new Date()
  return isAfter(now, startAt) && isBefore(now, endAt)
}
