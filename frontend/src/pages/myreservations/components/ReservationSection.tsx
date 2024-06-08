
interface Props{
    barber:string;
    avatar:string;
    servicio:string;
    fecha:string;
    hora:string;

}


export const ReservationSection = ({avatar,servicio,fecha,hora}:Props) => {
  return (
    <div className="bg-gray-950/30 mx-5 p-5 rounded-xl border border-indigo-300/50">
        <div className="flex items-center border-b pb-3 border-purple-200/60">
            <img src={avatar}
                    className="w-24 rounded-full mr-5"/>
            <div>
                <p className="mb-1">Servicio: </p>
                <h2 className="text-pink-200 text-lg">{servicio}</h2>
            </div>

        </div>
        <div className="pt-3 text-sm">
            <p className="text-purple-200">Fecha de reserva:</p>
            <p className="text-white/90">{fecha}, {hora} </p>
        </div>


    </div>
  )
}
