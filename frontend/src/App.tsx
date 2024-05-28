import { Route, Routes } from "react-router-dom";
import "./App.css";
import { HomeView, LoginView, RegisterView } from "./pages";

function App() {
  return (
    <>
        <Routes>
          <Route path={"/"}         element={<HomeView/>} />
          <Route path={"/login"}    element={<LoginView />} />
          <Route path={"/register"} element={<RegisterView/>} />
        </Routes>


    </>
  );
}

export default App;
