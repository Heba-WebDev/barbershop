import { BottomNavBar } from '@/components/globals/BottomNavBar'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
    return (
        <div className='p-2 container mx-auto'>
            <Outlet />
            <BottomNavBar />
        </div>
    )
}