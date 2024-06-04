import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RegisterView, LoginView, HomeView } from "../pages";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => ({ message: "Hello Data Router!" }),
    Component() {
      return <HomeView />;
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
    path: "/login",
    loader: () => ({ message: "Hello Login!" }),
    Component() {
      return <LoginView />;
    }
  }
]);


export default function Router() {
    return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
}

if (import.meta.hot) {
    import.meta.hot.dispose(() => router.dispose())
}
