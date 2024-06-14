

export interface DayProps {
    company_id: string,
    day: string,
    final_end_date: string,
    final_start_date: string,
    id: number,
    initial_end_date: string,
    initial_start_date: string,
    interval: number,
    state: boolean,
}

export interface IActivateDay {
    state: boolean,
}

export interface IChangeHours {
    initial_end_date: Date | null,
    initial_start_date: Date | null,
    final_end_date: Date | null,
    final_start_date: Date | null,
}

export interface IChangeHoursStr {
    initial_end_date: string | null,
    initial_start_date: string | null,
    final_end_date: string | null,
    final_start_date: string | null,
}

export const daysES = [
    {
        english: 'SUNDAY',
        day: 'DOMINGO'
    },
    {
        english: 'MONDAY',
        day: 'LUNES'
    },
    {
        english: 'TUESDAY',
        day: 'MARTES'
    },
    {
        english: 'WEDNESDAY',
        day: 'MIÉRCOLES'
    },
    {
        english: 'THURSDAY',
        day: 'JUEVES'
    },
    {
        english: 'FRIDAY',
        day: 'VIERNES'
    },
    {
        english: 'SATURDAY',
        day: 'SÁBADO'
    },
]