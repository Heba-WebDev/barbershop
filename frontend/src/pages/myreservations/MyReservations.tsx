import { AdminComponent, UserComponent } from "./components";


const isadmin=false;

export const MyReservationsView = () => {
  return (
    <>
        {
            isadmin ?
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
