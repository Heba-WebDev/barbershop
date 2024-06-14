import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Formik, Form } from 'formik'
import { FaEdit } from 'react-icons/fa'
import { DayProps, IChangeHoursStr } from '../types'
import { changeHoursApi, fetchScheduleApi } from '../api'
import { userState } from '@/state/user'
import { convertDate } from '../helper-func'
import { toast } from 'react-toastify'
import { useState } from 'react'

export function HoursDialog({
    id,
    initial_start_date,
    initial_end_date,
    final_start_date,
    final_end_date,
    day,
}: DayProps) {
    const [open, setOpen] = useState(false)
    const token = userState((state) => state.token)
    const initialValues = {
        initial_end_date,
        initial_start_date,
        final_end_date,
        final_start_date,
    }
    const company = userState((state) => state.company)
    const setHours = userState((state) => state.setHours)
    const hours = Array.from({ length: 24 }, (_, index) => `${index < 10 ? '0' : ''}${index}:00`)
    const handleSubmit = async(values: IChangeHoursStr) => {
        const initial_start_dateConvert: Date = convertDate(values.initial_start_date?.toString() as string)
        const initial_end_dateConvert: Date = convertDate(values.initial_end_date?.toString() as string)
        const final_start_dateConvert: Date = convertDate(values.final_start_date?.toString() as string)
        const final_end_dateConvert: Date = convertDate(values.final_end_date?.toString() as string)
        try {
            await changeHoursApi({
                initial_start_date: initial_start_dateConvert,
                initial_end_date: initial_end_dateConvert,
                final_end_date: final_end_dateConvert,
                final_start_date: final_start_dateConvert
            }, id as number, token as string)
            const refetchHours = await fetchScheduleApi(company[0].id as string, token as string)
            setHours(refetchHours)
            toast.success(`Los horarios laborales del ${day.toLocaleLowerCase()} han sido cambiados`)
            setOpen(false)
        } catch(error) {
            if (error instanceof Error) toast.error(error.message)
        }
    }
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        className="relative w-fit h-fit p-0 m-0 bg-secondary-purple text-light-cayn
                        hover:bg-transparent"
                    >
                        <FaEdit className=' absolute z-40 -top-4 ml-2 md:ml-4 text-gray-500 text-lg'></FaEdit>
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[90%] bg-secondary-purple border-transparent rounded-sm sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className='text-center text-white'>Cambiar horarios de trabajo</DialogTitle>
                        <DialogDescription className='text-center'>
                                Cambia el horario laboral del {day.toLocaleLowerCase()}
                        </DialogDescription>
                    </DialogHeader>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                    >
                        {(formik) => (
                            <Form className="flex flex-col gap-3">
                                <div className="flex flex-col py-6">
                                    <h2 className=' uppercase text-sm pb-3'>Primer turno</h2>
                                    <div className="w-full flex items-center justify-around gap-5">
                                        
                                        <div className=' w-full'>
                                            <label htmlFor='initial_start_date'></label>
                                            <select
                                                id={`start-time-${day}`}
                                                name={'initial_start_date'}
                                                onChange={formik.handleChange}
                                                value={formik.values.initial_start_date}
                                                className="bg-red-50 border leading-none border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                required
                                            >
                                                {hours.map((hour) => (
                                                    <option key={hour} value={hour}>
                                                        {hour}
                                                    </option>
                                                ))}

                                            </select>
                                        </div>
                                        <div className=' w-full'>
                                            <label htmlFor='initial_end_date'></label>
                                            <select
                                                id={`start-time-${day}`}
                                                name={'initial_end_date'}
                                                onChange={formik.handleChange}
                                                value={formik.values.initial_end_date}
                                                className="bg-red-50 border leading-none border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                required
                                            >
                                                {hours.map((hour) => (
                                                    <option key={hour} value={hour}>
                                                        {hour}
                                                    </option>
                                                ))}

                                            </select>
                                        </div>
                                    </div>
                                    <h2 className=' uppercase text-sm py-3'>Segundo turno</h2>
                                    <div className="w-full flex items-center justify-around gap-5">
                                        
                                        <div className=' w-full'>
                                            <label htmlFor='final_start_date'></label>
                                            <select
                                                id={`start-time-${day}`}
                                                name={'final_start_date'}
                                                onChange={formik.handleChange}
                                                value={formik.values.final_start_date}
                                                className="bg-red-50 border leading-none border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                required
                                            >
                                                {hours.map((hour) => (
                                                    <option key={hour} value={hour}>
                                                        {hour}
                                                    </option>
                                                ))}

                                            </select>
                                        </div>
                                        <div className=' w-full'>
                                            <label htmlFor='final_end_date'></label>
                                            <select
                                                id={`start-time-${day}`}
                                                name={'final_end_date'}
                                                onChange={formik.handleChange}
                                                value={formik.values.final_end_date}
                                                className="bg-red-50 border leading-none border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                required
                                            >
                                                {hours.map((hour) => (
                                                    <option key={hour} value={hour}>
                                                        {hour}
                                                    </option>
                                                ))}

                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="bg-light-cayn rounded-full mx-auto w-full mt-2 text-black hover:bg-[#68CBD9]"
                                >
                                Guardar
                                </Button>
                            </Form>
                        )}
                    </Formik>
                    <DialogFooter></DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
