import { userState } from '@/state/user'
import { AdminComponent, UserComponent } from './components'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


export const MyReservationsView = () => {
    const navigate = useNavigate()
    const user = userState((state) => state.user)
    const isLoggedin = userState((state) => state.is_loggedin)
    useEffect(() => {
        if(!isLoggedin) navigate('/')
    }, [])
    return (
        <>
            {
                user?.role[0] !== 'CLIENT' ?
                    (
                        <AdminComponent />
                    ):
                    (
                        <UserComponent />
                    )
            }

        </>
    )
}
