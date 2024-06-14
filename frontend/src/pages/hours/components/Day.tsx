import { Switch } from '@/components/ui/switch'
import { DayProps } from '../types'
import { daysES } from '../types'
import { userState } from '@/state/user'
import { toast } from 'react-toastify'
import { activateDayApi, fetchScheduleApi } from '../api'
import { HoursDialog } from './ChangeHours'

export const Day = ({
    id,
    day,
    company_id,
    initial_start_date,
    initial_end_date,
    final_start_date,
    final_end_date,
    state,
    interval
}: DayProps) => {
    const dayName = daysES.filter((d) => day === d.english)
    const token = userState((state) => state.token)
    const setHours = userState((state) => state.setHours)
    const handleActivateDay = async() => {
        try {
            await activateDayApi({state: !state as boolean}, id as number, token as string)
            toast.success(`El ${dayName[0].day} ha sido ${state ? 'desactivado' : 'activado'}`)
            const res = await fetchScheduleApi(company_id as string, token as string)
            setHours(res)
        }catch(error) {
            if (error instanceof Error) toast.error(error.message)
        }
    }
    return (
        <div className='py-4 grid grid-cols-3 items-center justify-between'>
            <div className=' w-full'>
                <p className='hidden md:block'>{dayName[0].day}</p>
                <p className='block md:hidden'>{dayName[0].day.slice(0, 3)}</p>
            </div>
            <div className='w-full flex items-center justify-center gap-3 md:gap-4 text-sm'>
                <div className=' flex items-center w-full'>
                    <p>{initial_start_date}</p>
                    <p>-</p>
                    <p>{initial_end_date}</p>
                </div>
                <div className=' flex items-center'>
                    <p>{final_start_date}</p>
                    <p>-</p>
                    <p>{final_end_date}</p>
                </div>
                <button>
                    <HoursDialog
                        id={id}
                        company_id={company_id}
                        initial_start_date={initial_start_date}
                        initial_end_date={initial_end_date}
                        final_start_date={final_start_date}
                        final_end_date={final_end_date}
                        day={dayName[0].day}
                        state={state}
                        interval={interval}
                    />
                </button>
            </div>
            <div className=' flex w-full justify-end ml-2 md:ml-0'>
                <Switch onClick={handleActivateDay} checked={state} className=''/>
            </div>
        </div>
    )
}