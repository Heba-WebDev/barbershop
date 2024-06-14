import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RegisterView, ServicesView, HoursView, HomeView, LoginView, ProfileView, CompanyView, EmailConfirmationView, RecoverPassView, NewPassView } from '../pages'
import { MainLayout } from '@/layouts/mainLayout'
import { MyReservationsView } from '@/pages/myreservations/MyReservations'
import { NewReservationView } from '@/pages/newReservation/newReservationView'

const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <HomeView />,
            },
            {
                path: '/register',
                element: <RegisterView />,
            },
            {
                path: '/login',
                element: <LoginView />,
            },
            {
                path: '/confirm_email/:token',
                element: <EmailConfirmationView />,
            },
            {
                path: '/services',
                element: <ServicesView />,
            },
            {
                path: '/hours',
                element: <HoursView />,
            },
            {
                path: '/home',
                element: <HomeView />,
            },
            {
                path: '/profile',
                element: <ProfileView />,
            },
            {
                path: '/company',
                element: <CompanyView />,
            },
            {
                path:'/reservations',
                element: <MyReservationsView />
            },
            {
                path:'/new-reservation',
                element: <NewReservationView />
            },
            {
                path:'/recover-password',
                element: <RecoverPassView />
            },
            {
                path:'/new-password',
                element: <NewPassView />
            }
        ],
    },
])

export default function Router() {
    return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
}

if (import.meta.hot) {
    import.meta.hot.dispose(() => router.dispose())
}
