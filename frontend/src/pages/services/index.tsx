import { Service } from './components/service'
import { fakeData } from './data'
import { ServiceHoursNav } from '@/components/globals/ServiceHoursNav'
import { Button } from '@/components/ui/button'

export const ServicesView = () => {
    return (
        <main className='p-2 px-4'>
            <ServiceHoursNav />
            <div className='bg-secondary-purple rounded-2xl grid gap-4 py-2 px-4'>
                {fakeData.map((data) => {
                    return (
                        <div key={data.id}>
                            <Service
                                id={data.id}
                                name={data.name}
                                company_id={data.company_id}
                                price={data.price}
                                is_active={data.is_active}
                            />
                            {fakeData[fakeData.length - 1].id !== data.id && <hr className=' opacity-30'/>}
                        </div>
                    )
                })}
            </div>
            <Button className=' w-full h-12 bg-secondary-purple text-light-cayn mt-2 text-xl
        hover:bg-[#68CBD9] hover:text-[#2C293A]'>+</Button>
        </main>
    )
}