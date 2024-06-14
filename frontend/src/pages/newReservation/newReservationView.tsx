/* eslint-disable indent */
/* eslint-disable quotes */
import { Calendar } from "@/components/ui/calendar"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { TbCircleNumber1Filled, TbCircleNumber2Filled, TbCircleNumber3Filled, TbCircleNumber4Filled } from "react-icons/tb"
import { RxCaretSort } from "react-icons/rx"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { userState } from "@/state/user"
import { api } from "@/axios"
import { toast } from "react-toastify"

interface Employee {
    id: string
    company: {
        name: string
    }
}

interface CompanyServices {
    services: Service[]
    employee: Employee
}

interface Service {
    id: string
    name: string
    price: number
}

const getAvailableSchedules = async (companyId: string, token: string, date: Date): Promise<string[]> => {
    try {
        const dateString = date.toISOString()

        const { data } = await api.get<string[]>(`/api/schedule/available-hours/${companyId}/${dateString}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return data
    } catch (error) {
        throw new Error('Cannot get available schedules')
    }
}

const getCompanyServices = async (companyId: string, token: string): Promise<CompanyServices> => {
    try {
        const { data } = await api.get<CompanyServices>(`/api/service/${companyId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return data
    } catch (error) {
        throw new Error('Cannot get services')
    }
}

const createApointment = async (date: string, serviceId: string, employeeId: string, token: string): Promise<unknown> => {
    try {
        const { data } = await api.post<unknown>(`/api/appointment`, {
            startDate: date,
            services: [serviceId],
            employeeID: employeeId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })


        return data
    } catch (error) {
        throw new Error('Cannot create an appointment')
    }
}

export const NewReservationView = () => {
    const token = userState((state) => state.token)
    const isLoggedin = userState((state) => state.is_loggedin)
    const user = userState((state) => state.user)

    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const barberShopId = searchParams.get('barberShopId')

    const [availableSchedules, setAvailableSchedules] = useState<string[]>([])
    const [selectedDate, setSelectedDate] = useState<Date>()
    const [scheduleSelected, setScheduleSelected] = useState<string>()

    const [services, setServices] = useState<Service[]>()
    const [employee, setEmployee] = useState<Employee>()

    const [serviceSelected, setServiceSelected] = useState<string>()

    const [open, setOpen] = useState(false)

    const handleClickSelectDate = (date: Date) => {
        setSelectedDate(date!)
        setScheduleSelected('')
    }

    const handleClickCreateAppointment = () => {
        if (!selectedDate) return
        if (!scheduleSelected) return
        if (!serviceSelected) return
        if (!employee?.id) return
        if (!token) return

        const date = selectedDate.toISOString().split('T').at(0)
        const hour = scheduleSelected.split(' - ')[0]
        const completeDate = `${date}T${hour}:00Z`

        createApointment(completeDate, serviceSelected, employee?.id, token)
        .then(() => {
            navigate('/reservations')
            toast.success('Cita reservada 🤗')
        })
        .catch(() => {
            navigate('/reservations')
            toast.error('Error al reservar la cita 🥺')
        })
    }


    useEffect(() => {
        if (!isLoggedin || user?.role[0] !== 'CLIENT') {
            navigate('/register')
        }


    }, [barberShopId, navigate])

    useEffect(() => {
        if (token && barberShopId) {

            if (selectedDate) {
                getAvailableSchedules(barberShopId, token, selectedDate)
                    .then(data => setAvailableSchedules(data))
            }

            getCompanyServices(barberShopId, token)
                .then((data) => {
                    setServices(data.services)
                    setEmployee(data.employee)
                })
        }
    }, [selectedDate])

    return (
        <div className="pb-24">
            <section className="my-10">
                <h3 className="text-center">Ha seleccionado:</h3>
                <h1 className=" text-center text-purple-200 text-xl">{employee?.company.name}</h1>
            </section>

            <div className="lg:flex justify-around items-start">
                <section className="flex flex-col gap-4 px-5">
                    <p className="flex gap-2 items-center">
                        <TbCircleNumber1Filled className="text-3xl text-purple-200"
                        />
                        Elija la fecha que desea reservar:
                    </p>

                    <div className="flex justify-center">
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={(value) => handleClickSelectDate(value!)}
                            className="rounded-md shadow bg-[#3A3644] flex justify-center"
                        />
                    </div>

                </section>

                <section className="px-5">
                    <p className="flex items-center lg:justify-start mt-10 lg:mt-0 mb-5"><TbCircleNumber2Filled size={30} className="mr-2 text-purple-200" />
                        Seleccione las horas disponibles:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-7">
                        {(availableSchedules.length > 0
                            ? availableSchedules.map((schedule, index) => {
                                return (
                                    <div key={index} className=
                                        {`${scheduleSelected === schedule && 'bg-purple-200 text-purple-900'}
                                                 p-2 border rounded-xl border-purple-200`
                                        }>

                                        <button className="w-full h-full" onClick={() => setScheduleSelected(schedule)}>
                                            {schedule}
                                        </button>

                                    </div>
                                )
                            })
                            : <p className="text-center">Horas agotadas! 🥺</p>)

                        }
                    </div>

                    {
                       /* hour &&*/(
                            <div className="my-10 flex flex-col lg:items-start">
                                <p className="flex items-center lg:justify-start  lg:mt-0 mb-5">
                                    <TbCircleNumber4Filled size={30} className="mr-2 text-purple-200"
                                    />
                                    Elige el servicio deseado:
                                </p>
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            className="bg-pink-100 text-purple-900 hover:bg-[#3A3644]
                                                         hover:text-purple-200 hover:border hover:border-purple-200"
                                            variant={'default'}
                                            role='combobox'
                                            aria-expanded={open}
                                        >
                                            {
                                                serviceSelected
                                                    ? (services?.find(service => service.id === serviceSelected)?.name)
                                                    : ('Seleccionar servicio')
                                            }
                                            <RxCaretSort className="text-2xl ml-2" />

                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <Command className="h-36 ">
                                            <CommandInput placeholder="Buscar Servicio..." />
                                            <CommandList>
                                                <CommandEmpty>No hay concidencias...</CommandEmpty>
                                                <CommandGroup>
                                                    {
                                                        services?.map(({ id, name }) => {
                                                            return (
                                                                <CommandItem>
                                                                    <button key={id} className="w-full"
                                                                        onClick={() => {
                                                                            setServiceSelected(id)
                                                                            setOpen(false)

                                                                        }}>
                                                                        {name}
                                                                    </button>
                                                                </CommandItem>
                                                            )
                                                        })
                                                    }
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>

                                </Popover>

                            </div>
                        )
                    }

                    {
                        (scheduleSelected && serviceSelected) && (
                            <div className="flex flex-col justify-center mt-10 items-center lg:items-start">
                                <p className="flex items-center justify-center lg:justify-start mb-5"><TbCircleNumber3Filled size={30} className="mr-2 text-purple-200" />
                                    ¡Reserva tu cita!</p>
                                <button
                                    onClick={handleClickCreateAppointment}
                                    className=" bg-gradient-to-r from-purple-200 to-indigo-300
                                text-indigo-900 text-xl font-semibold w-[70%] lg:w-64 p-3 rounded-xl">
                                    ¡Reservar Cita!
                                </button>
                            </div>

                        )
                    }
                </section>
            </div>
        </div>

    )
}
