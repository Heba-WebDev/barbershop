import { useEffect } from 'react'
import { Service } from './components/service'
import { fakeData } from './data'
import { ServiceHoursNav } from '@/components/globals/ServiceHoursNav'
import { ServiceDialog } from './components/serviceDialog'
import { userState } from '@/state/user'
import { fetchServicsApi } from './api'

export const ServicesView = () => {
    const token = userState((state) => state.token)
    const serviceList = userState((state) => state.service)
    const setService = userState((state) => state.setService)
    const fetch = async() => {
        const res = await fetchServicsApi(token as string)
        setService(res)
        return res
    }
    useEffect(() => {
        if (!serviceList) fetch()
    }, [])
    
    return (
        <main className='p-2 px-4'>
            <ServiceHoursNav />
            <div className='bg-secondary-purple rounded-2xl grid gap-4 py-2 px-4'>
                {serviceList && serviceList?.map((data) => {
                    return (
                        <div key={data.name}>
                            <Service
                                avatar={data.avatar}
                                name={data.name}
                                price={parseFloat(data.price)}
                            />
                            {fakeData[fakeData.length - 1].name !== data.name && <hr className=' opacity-30'/>}
                        </div>
                    )
                })}
                {serviceList?.length === 0 && <>
                    <div className='text-dark-white opacity-30 text-sm h-24 flex items-center justify-center'>
                        <p className=''>No Hay servicios!</p>
                    </div>
                </>}
            </div>
            <ServiceDialog />
        </main>
    )
}