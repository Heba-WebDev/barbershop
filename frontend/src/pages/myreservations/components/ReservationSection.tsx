
interface Props  {
    employeeName:string;
    barberShopName: string
    avatar?:string;
    service:string;
    date:string;
    hour:string;
}

export const ReservationSection = ({ avatar, barberShopName, date, employeeName, hour, service }:Props) => {

    const imageUrl = avatar ?? 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png'

    return (
        <div className="bg-gray-950/30 mx-5 p-5 rounded-xl border border-indigo-300/50">
            <div className="flex items-center border-b pb-3 border-purple-200/60">
                <img src={imageUrl} className="w-24 rounded-full mr-5"/>

                <div>
                    <div className="flex gap-4">
                        <p className="text-sm font-bold">Servicio: </p>
                        <h2 className="text-pink-200 text-sm">{service ?? 'sdfsd'}</h2>
                    </div>

                    <div className="flex gap-4">
                        <p className="text-sm font-bold">Barbero: </p>
                        <h2 className="text-pink-200 text-sm">{employeeName ?? 'sdfsd'}</h2>
                    </div>
                </div>
            </div>

            <div className="pt-3 text-sm">
                <p className="text-purple-200">Fecha de reserva:</p>
                <p className="text-white/90">{date}, {hour} </p>
            </div>


        </div>
    )
}
