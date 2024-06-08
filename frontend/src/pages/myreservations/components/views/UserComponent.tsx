
import { ReservationSection } from "../ReservationSection"
import {NewReservationDialog } from "../NewReservationDialog"

const reservaciones=[
    {
        barber:"Arroz BarberShop",
        avatar:"https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png",
        servicio:"Hair Cut",
        fecha:"09/06/2024",
        hora:"10:30 AM - 11:45 AM"
    },
    {
        barber:"SIUUU BarberShop",
        avatar:"https://cdn-icons-png.flaticon.com/512/147/147144.png",
        servicio:"Lavado de cabello",
        fecha:"12/06/2024",
        hora:"9:30 PM - 10:30 PM"
    },
    {
        barber:"Messirve BarberShop",
        avatar:"https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp",
        servicio:"Afinamiento de Copete",
        fecha:"15/06/2024",
        hora:"10:30 AM - 11:00 AM"
    }
]



export const UserComponent = () => {
  return (
    <div className="pb-20">
        <h1 className="text-center text-2xl text-purple-300 py-4">Mis reservaciones:</h1>
        {
            reservaciones.map((reservacion)=>{
                return(
                    <div className="py-2" key={`${reservacion.fecha}-${reservacion.hora}`}>
                        <ReservationSection {...reservacion} />
                    </div>
                    
                )
            })
        }
        <NewReservationDialog />
        
    </div>
  )
}
