import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
    return (
        <div className='p-2 container mx-auto'>
            <Outlet />
        </div>
    )
}