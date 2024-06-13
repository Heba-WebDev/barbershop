import { useEffect } from 'react'
import { Service } from './components/service'
import { fakeData } from './data'
import { ServiceHoursNav } from '@/components/globals/ServiceHoursNav'
import { ServiceDialog } from './components/serviceDialog'
import { userState } from '@/state/user'
import { fetchServicsApi } from './api'
import { useNavigate } from 'react-router-dom'

export const ServicesView = () => {
    const navigate = useNavigate()
    const isLoggedin = userState((state) => state.is_loggedin)
    const user = userState((state) => state.user)
    const token = userState((state) => state.token)
    const serviceList = userState((state) => state.service)
    const setService = userState((state) => state.setService)
    const fetch = async() => {
        const res = await fetchServicsApi(token as string)
        setService(res)
        return res
    }
    useEffect(() => {
        if (!isLoggedin || user?.role[0] !== 'OWNER') navigate('/')
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
                                id={data.id}
                                avatar={data.avatar}
                                name={data.name}
                                price={parseFloat(data.price)}
                                is_active={data.is_active}
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