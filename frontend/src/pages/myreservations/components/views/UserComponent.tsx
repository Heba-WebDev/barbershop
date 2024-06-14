import { ReservationSection } from '../ReservationSection'
import { NewReservationDialog } from '../NewReservationDialog'
import { api } from '@/axios'
import { useEffect } from 'react'
import { Appointment, userState } from '@/state/user'

const getAppointments = async (token: string): Promise<Appointment[]> => {
    try {
        const { data } = await api.get<Appointment[]>('/api/appointment', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return data
    } catch (error) {
        throw new Error('Cannot get appointments')
    }
}

const getTimeForDate = (date: Date) => {
    const hours = date.getUTCHours().toString().padStart(2, '0')
    const minutes = date.getUTCMinutes().toString().padStart(2, '0')

    return `${hours}:${minutes}`
}

export const UserComponent = () => {

    const token = userState((store) => store.token)
    const appointments = userState((store) => store.appointment)
    const setAppointments = userState((store) => store.setAppointments)

    useEffect(() => {
        if (token) {
            getAppointments(token)
                .then(data => setAppointments(data))
        }
    }, [])
    
    return (
        <div className="pb-20">
            <h1 className="text-center text-2xl text-purple-300 py-4">Mis reservaciones:</h1>
            {
                appointments?.map(({ id, employee, start_date, start_time, ServiceAppointment}) => {

                    const date = start_date.toString().split('T')[0].replace(/-/g, '/')
                    const hour = getTimeForDate(new Date(start_time))

                    const serviceName = ServiceAppointment[0]?.service.name ?? 'Unknow'

                    return (
                        <div className="py-2" key={id}>
                            <ReservationSection 
                                employeeName={employee.user.name}
                                barberShopName={employee.company.name}
                                date={date}
                                service={serviceName}
                                hour={hour}
                            />
                        </div>
                    )
                })
            }
            
            <NewReservationDialog />
        </div>
    )
}
