import { FaCheck, FaPlusCircle } from "react-icons/fa"
import { IoGlasses } from "react-icons/io5";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,  

} from "@/components/ui/dialog"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    // CommandSeparator,
    // CommandShortcut,
  } from "@/components/ui/command"
import { useState } from "react";



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



 export const NewReservationDialog = () => {

    const [servicioElection,setServicioElection]=useState<number>();

   return (

    <Dialog>
      <DialogTrigger asChild>
        <div className="flex justify-center mt-5 text-purple-200">
            <button>
                <FaPlusCircle size={50} />
            </button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[420px] rounded-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center"><IoGlasses size={30} className="mr-2"/>Seleccione el BarberShop:</DialogTitle>
          <DialogDescription>
            Se mostrarán los BerberShop's disponibles, seleccione a continuación uno.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center">
            {/* <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" /> */}

            <Command className=" overflow-hidden h-44">
                <CommandInput placeholder="Busqueda..." />
                <CommandList>
                    <CommandEmpty>No hay coincidencias...</CommandEmpty>
                    <CommandGroup>
                    {
                        servicios.map((item,index)=>{
                            return(
                                <CommandItem key={index}>
                                    <button onClick={()=>{setServicioElection(item.id)}}
                                        className="flex items-center justify-between w-full">
                                        <span>{item.barberShop}</span>
                                        <FaCheck className={`${item.id!==servicioElection && 'hidden'} text-purple-900`} />

                                        </button>
                                </CommandItem>
                            )
                        })
                    }
                    </CommandGroup>
                    
                    
                </CommandList>
            </Command>
          </div>
        </div>
        
        <DialogFooter>
          <Button className={`
            ${!servicioElection && 'pointer-events-none shadow opacity-60  '}`}>
                <a href={`./new-reservation?barbershop=${servicioElection}`} className="w-full">¡Elegir!</a></Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    
   )
 }

