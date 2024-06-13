/* eslint-disable indent */
/* eslint-disable quotes */
import * as React from "react"
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

const servicios=[
    {
        id:1,
        //servicio: 'Corte de cabello',
        barberShop:"Siuu Barbershop",
    },
    {
        id:2,
        //servicio: 'Desgrafilado',
        barberShop:"Insano Barbershop",
    },
    {
        id:3,
        //servicio: 'Corte escolar',
        barberShop:"El bicho Barbershop",
    },
    {
        id:4,
        //servicio: 'Corte de Barba',
        barberShop:"Messirve Barbershop",
    },{
        id:5,
        // servicio: 'Corte Pelao',
        barberShop:"Calvo Barbershop",
    }
]
const horarios=[
    {rango:"09:00 - 10:00"},
    {rango:"10:00 - 11:30"},
    {rango:"11:30 - 13:00"},
    {rango:"14:00 - 14:30"},
    {rango:"14:30 - 16:00"},
    {rango:"16:30 - 18:30"},
]

const products=[
    {
        id:1,
        servicio: 'Corte de cabello',
        
    },
    {
        id:2,
        servicio: 'Desgrafilado',
        
    },
    {
        id:3,
        servicio: 'Corte escolar',
       
    },
    {
        id:4,
        servicio: 'Corte de Barba',
        
    },{
        id:5,
        servicio: 'Corte Pelao',
        
    }
]



export const NewReservationView = () => {
    const isLoggedin = userState((state) => state.is_loggedin)
    const user = userState((state) => state.user)
    const [searchParams]=useSearchParams()
    const navigate = useNavigate()

    const barbershop=searchParams.get('barbershop')

    const [date, setDate] = React.useState<Date | undefined>()

    const [hour, setHour]=useState<string>()
    const [servicioID,setServicioID]=useState<number>()
    const [open, setOpen] = React.useState(false)

    const serviceObj=servicios.find((item)=>{
        return item.id.toString()===barbershop
    })

    useEffect(() => {
        if (!isLoggedin || user?.role[0] !== 'CLIENT') {
             navigate('/register')
        }
      }, [barbershop, navigate])

  return (
    <div className="pb-24">      
        <section className="my-10">
            <h3 className="text-center">Ha seleccionado:</h3>
            <h1 className=" text-center text-purple-200 text-3xl">{serviceObj?.barberShop}</h1>
        </section>
        <div className="lg:flex justify-around items-start">
        <section>
            <div className="flex justify-around px-5 items-center lg:flex-col">
                <p className="text-center mr-5 lg:mr-0 lg:mb-5 flex flex-col lg:flex-row items-center text-2xl lg:text-base">
                    
                <TbCircleNumber1Filled className="text-5xl lg:text-3xl text-purple-200 lg:mr-2 inline mb-2 lg:mb-0"/>
                Elija la fecha que desea reservar:</p> 

                <div className="flex justify-center">
                    <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md shadow bg-[#3A3644] flex justify-center"
                    
                    />
                </div>
            </div>
            
        </section>
        
           
        {/*date && */(
                    <section className="px-5">
                        <p className="flex items-center justify-center lg:justify-start mt-10 lg:mt-0 mb-5"><TbCircleNumber2Filled size={30} className="mr-2 text-purple-200" />
                                Seleccione las horas disponibles:</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-7">
                                {
                                    horarios.map((horario)=>{
                                        return(
                                            <div key={horario.rango} className=
                                            {`${horario.rango===hour && 'bg-purple-200 text-purple-900'}
                                             p-2 border rounded-xl border-purple-200`}>
                                                <button className="w-full h-full" onClick={()=>{setHour(horario.rango)}}>
                                                    {horario.rango}
                                                </button>
                                                    
                                            </div>
                                        )
                                    })
                                }
                        </div>

                    {
                       /* hour &&*/(
                            <div className="my-10 flex flex-col items-center lg:items-start">
                                <p className="flex items-center justify-center lg:justify-start  lg:mt-0 mb-5">
                                    <TbCircleNumber4Filled size={30} className="mr-2 text-purple-200"/>
                                Elige el servicio deseado:</p>
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
                                            servicioID ? products.find(product=>product.id ===servicioID)?.servicio
                                             : "Seleccionar servicio"
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
                                                        products.map((product)=>{
                                                            return(
                                                                // <CommandItem
                                                                //     className=" cursor-pointer"
                                                            
                                                                //     value={product.id.toString()}
                                                                //     key={product.id}
                                                                //     onSelect={(currentValue)=>{
                                                                //         setServicioID(currentValue===servicioID?.toString()? 0: Number(currentValue))
                                                                //         setOpen(false);
                                                                //         console.log(servicioID);
                                                                //     }}
                                                                // >
                                                                //     {product.servicio}
                                                                // </CommandItem>
                                                                   
                                                                    <CommandItem>
                                                                        <button key={product.id} className="w-full"
                                                                         onClick={()=>{
                                                                            setServicioID(product.id)
                                                                            setOpen(false)
                                                                            
                                                                        }}>
                                                                            {product.servicio}
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
                        hour && (
                            <div className="flex flex-col justify-center mt-10 items-center lg:items-start">
                                <p className="flex items-center justify-center lg:justify-start mb-5"><TbCircleNumber3Filled size={30} className="mr-2 text-purple-200"/>
                                    ¡Reserva tu cita!</p>
                                <button className=" bg-gradient-to-r from-purple-200 to-indigo-300
                                text-indigo-900 text-xl font-semibold w-[70%] lg:w-64 p-3 rounded-xl">  
                                    ¡Reservar Cita!
                                </button>
                            </div>
                            
                        )
                    }
                    


                    </section>
            )}

        
            </div>
        
            
        
        
        
        
    </div>
    
  )
}
    