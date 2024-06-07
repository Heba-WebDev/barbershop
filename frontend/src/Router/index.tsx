import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RegisterView, ServicesView, HoursView, HomeView, LoginView } from '../pages'
import { MainLayout } from '@/layouts/mainLayout'

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
                path: '/services',
                element: <ServicesView />,
            },
            {
                path: '/hours',
                element: <HoursView day={''} dateHour={''} />,
            },
            {
                path: '/home',
                element: <HomeView />,
            },
        ],
    },
])

export default function Router() {
    return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
}

if (import.meta.hot) {
    import.meta.hot.dispose(() => router.dispose())
}
