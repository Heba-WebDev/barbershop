import { BottomNavBar } from '@/components/globals/BottomNavBar'
import { Header } from '@/components/layout'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
    return (
<<<<<<< HEAD
        <div className='mx-auto'>
            <Header />
=======
        <div className='p-2 container mx-auto mb-12 md:mb-0'>
>>>>>>> bde18a754be9640e4cf62906572dae6a4aff0c31
            <Outlet />
            <BottomNavBar />
        </div>
    )
}