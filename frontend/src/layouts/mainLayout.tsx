import { BottomNavBar } from '@/components/globals/BottomNavBar'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
    return (
        <div className=''>
            <Outlet />
            <BottomNavBar />
        </div>
    )
}