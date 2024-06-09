export const getFormatedHours = (hours: string[]) => {
  const hoursFormated: string[] = []

  hours.forEach((hour, index) => {
    if (!hours[index + 1]) return

    hoursFormated.push(`${hour} - ${hours[index + 1]}`)
  })

  return hoursFormated
}
