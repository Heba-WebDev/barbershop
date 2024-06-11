import { BottomNavBar } from '@/components/globals/BottomNavBar'
import { Header } from '@/components/layout'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

export const MainLayout = () => {
    const location = useLocation()
    return (
        <div className='p-2 container mx-auto mb-12 md:mb-0'>
            {location.pathname !== '/' && location.pathname !== '/home' && <Header />}
            <Outlet />
            <BottomNavBar />
        </div>
    )
}