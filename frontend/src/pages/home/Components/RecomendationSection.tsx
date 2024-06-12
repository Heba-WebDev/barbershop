import { FaStar } from 'react-icons/fa'

const bestBarbers=[
    {
        name:'John Doe',
        barberShop:'Arroz BarberShop',
        rating:4.9,
        avatar: 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',        
    },
    {
        name:'Messi',
        barberShop:'Musck BarberShop',
        rating:4.5,
        avatar: 'https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp',
    },
    {
        name:'El bicho',
        barberShop:'Flow Barbershop',
        rating:4.2,
        avatar:'https://cdn-icons-png.flaticon.com/512/147/147144.png',
    }
]

export const RecomendationSection = () => {
    return (
        <section className=" mt-20 pb-10">
            <h2 className="text-2xl text-gray-300 text-center mb-10">
            Barberos recomendados</h2>
            <div className="flex gap-1 justify-around">
                {bestBarbers.map((barber)=>{
                    return(
                        <div>
                            <img src={barber.avatar}
                                className="w-32 mb-4"/>
                            <h3 className="text-center text-lg text-light-cayn">
                                {barber.name}</h3>
                            <p className="text-center text-sm text-gray-400">{barber.barberShop}</p>
                            <p className="text-indigo-100 flex items-center justify-center"><FaStar className="text-yellow-200 inline-block mr-2" />{barber.rating}</p>
                        </div>
                    )
                })}
            </div>
        
        </section>
    )
}
