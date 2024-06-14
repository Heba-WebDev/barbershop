import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ServiceHoursNav } from '@/components/globals/ServiceHoursNav'
import { Company, userState } from '@/state/user'
import { fetchCompanyApi, fetchScheduleApi } from './api'
import { Day } from './components/Day'

export const HoursView = () => {
    const navigate = useNavigate()
    const isLoggedin = userState((state) => state.is_loggedin)
    const company = userState((state) => state.company)
    const user = userState((state) => state.user)
    const token = userState((state) => state.token)
    const hours = userState((state) => state.hours)
    const setHours = userState((state) => state.setHours)
    const setCompany = userState((state) => state.setCompany)
    const fetchCompany = async () => {
        const res: [] = await fetchCompanyApi(token as string)
        const com = res.filter((company: Company) => company.user_id === user?.id)
        setCompany(com)
        return res
    }
    const fetchSchedule = async () => {
        if(!company || company.length === 0) {
            const res: [] = await fetchCompanyApi(token as string)
            const com: Company[] = res.filter((company: Company) => company.user_id === user?.id)
            setCompany(com)
        }
        const res = await fetchScheduleApi(company[0].id as string, token as string)
        setHours(res)
        return res
    }
    useEffect(() => {
        if (!isLoggedin || user?.role[0] !== 'OWNER') navigate('/')
        if (company.length === 0) fetchCompany()
        if (!hours || hours.length === 0) fetchSchedule()
    }, [isLoggedin, user?.role, navigate])
    return (
        <main className="p-2 px-4">
            <ServiceHoursNav />
            <h2 className="py-2 px-1 md:text-2xl font-bold pb-3">Disponibilidad</h2>
            <section className="bg-secondary-purple rounded-2xl grid gap-2 py-2 px-4">
                {hours && hours.map((x) => {
                    return (
                        <>
                            <Day
                                id={x.id}
                                day={x.day}
                                company_id={x.company_id}
                                initial_start_date={x.initial_start_date}
                                initial_end_date={x.initial_end_date}
                                final_start_date={x.final_start_date}
                                final_end_date={x.final_end_date}
                                interval={x.interval}
                                state={x.state}
                            />
                        </>
                    )
                })}
            </section>
        </main>
    )
}
