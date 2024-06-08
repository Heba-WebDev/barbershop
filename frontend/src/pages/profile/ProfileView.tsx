import { useEffect } from 'react'
import { userState } from '@/state/user'
import { Link, useNavigate } from 'react-router-dom'
import { ProfileAvatar } from '@/lib/profileAvatar'
import { FaEdit, FaSignOutAlt, FaBusinessTime } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'

export const ProfileView = () => {
    const token = userState((store) => store.token)
    const user = userState((state) => state.user)
    const logout = userState((state) => state.logout)

    const navigate = useNavigate()
    const handleLogOut = () => {
        logout()
        toast.success('La sesión ha sido cerrada')
        navigate('/')
    }
    useEffect(() => {
        if(!token) {
            navigate('/')
        }
    }, [navigate, token])
    return (
        <section className='h-screen py-4'>
            <h2 className='text-lg px-4'>Profile</h2>
            <div className='relative rounded-lg bg-secondary-purple h-[70%] w-[95%] mx-auto mt-10 flex gap-1 flex-col py-4 items-center'>
                <Button className='absolute w-6 h-2 opacity-40 right-4 z-40 bg-transparent hover:bg-transparent'></Button>
                <FaEdit className=' absolute w-6 opacity-40 right-4' />
                {user && <ProfileAvatar name={user?.name as string} />}
                <p className=' text-lg mt-1'>{user?.name}</p>
                <p className=' text-sm opacity-25 -mt-1'>{user?.email}</p>
            </div>
            <div className=' mt-[10%]'>
                {user?.role === 'CLIENT' && <>
                    <div className='p-1 rounded-lg flex w-42 items-center'>
                        <span className=' bg-secondary-purple w-10 flex justify-center py-1 rounded-lg items-center'><FaBusinessTime className='opacity-50'/></span>
                        <Button className=' bg-transparent hover:bg-transparent'><Link to='/company' className='underline'>Ser propietario</Link></Button>
                    </div>
                </>}
                {user?.role !== 'CLIENT' && <>
                    <div className='p-1 rounded-lg flex w-42 items-center'>
                        <span className=' bg-secondary-purple w-10 flex justify-center py-1 rounded-lg items-center'><FaBusinessTime className='opacity-50'/></span>
                        <Button className=' bg-transparent hover:bg-transparent'><Link to='/services' className='underline'>Servicios</Link></Button>
                    </div>
                </>}
                <div className='p-1 rounded-lg flex w-42 items-center'>
                    <span className=' bg-secondary-purple w-10 flex justify-center py-1 rounded-lg items-center'><FaSignOutAlt className='opacity-50'/></span>
                    <Button onClick={handleLogOut} className=' bg-transparent hover:bg-transparent'>Cerrar sesión</Button>
                </div>
            </div>
        </section>
    )
}