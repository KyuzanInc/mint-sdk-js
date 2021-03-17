export const residenceList = ['unknown', 'jp'] as const
export type Residence = typeof residenceList[number]
export const isValidResidence = (target: string): target is Residence => {
  return residenceList.includes(target as any)
}
