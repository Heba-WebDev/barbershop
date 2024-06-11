import Autoplay from 'embla-carousel-autoplay'

const carrouselItems=[
    {
        name: 'BarberHub',
        img:'https://c1.wallpaperflare.com/preview/365/903/636/barber-chair-salon-hairdresser.jpg',
    
    },
    {
        name: 'BarberHub',
        img: 'https://c1.wallpaperflare.com/preview/906/56/866/barbershop-barber-salon-haircut.jpg',
    },
    {
        name: 'BarberHub',
        img:'https://c0.wallpaperflare.com/preview/987/555/718/adults-barber-barbershop-city.jpg',
    }
]


import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel'


export const HeroSlider = () => {
    return (
        <Carousel
            plugins={[
                Autoplay({
                    delay: 3000,
                }),
            ]}
    
    
        >
            <CarouselContent>
                {
                    carrouselItems.map((item,index)=>{
                        return(
                            <CarouselItem key={`${item.name}-${index}`} className="relative">
                                <div className="absolute z-10 top-24 left-10">
                                    <h2 className="text-purple-200
                                                text-4xl bg-gray-900 top-24 left-8
                                                px-5 py-3 rounded-t-xl rounded-r-xl border border-cyan-400
                                                mb-1">
                                        {item.name}</h2>
                                    <a className=" bg-gradient-to-r from-blue-300 to-cyan-600
                                    px-7 py-1.5 rounded-b-xl top-44 left-8 text-purple-100 text-lg" href="#">
                                    ¡Ir a barbería!</a>
                                </div>
                            
                                <img src={item.img} className=" opacity-40 rounded-xl md:w-[1400px] md:h-[600px] object-cover"/>
                            
                            </CarouselItem>
                        )
                    })
                }
            </CarouselContent>
            {/* <CarouselPrevious />
        <CarouselNext /> */}
        </Carousel>
    )
}
