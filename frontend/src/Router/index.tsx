import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '../App'
import { RegisterView, ServicesView, HoursView, HomeView } from '../pages'
import { MainLayout } from '@/layouts/mainLayout'

const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <App />,
            },
            {
                path: '/register',
                element: <RegisterView />,
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
        ],
    },
])

export default function Router() {
    return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
}

if (import.meta.hot) {
    import.meta.hot.dispose(() => router.dispose())
}
