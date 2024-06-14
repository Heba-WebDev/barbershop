
export const convertDate = (hour: string): Date => {
    const now = new Date()
    now.setHours(parseInt(hour.slice(0, 3) as string))
    now.setMinutes(0)
    now.setSeconds(0)
    now.setMilliseconds(0)
    now.toISOString()
    return now
}