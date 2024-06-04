import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import { HomeView, RegisterView } from "../pages";

interface HomeData{
  message:string;
}

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => ({ message: "Hello Data Router!" }),
    Component() {
      return <App />;
    },
  },
  {
    path: "/register",
    loader: () => ({ message: "Hello Register!" }),
    Component() {
      return <RegisterView />;
    },
  },
  {
    path:"/home",
    loader:():HomeData=>({message:"Hello Home!"}),
    Component(){
      return <HomeView/>
    }
  },
]);

export default function Router() {
    return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
}

if (import.meta.hot) {
    import.meta.hot.dispose(() => router.dispose())
    import.meta.hot.dispose(() => router.dispose())
}
