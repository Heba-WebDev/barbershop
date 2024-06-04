import { Route, Routes } from "react-router-dom";
import "./App.css";
import { HomeView, LoginView, RecoverPassView, RegisterView } from "./pages";

function App() {
  return (
    <>
        <Routes>
          <Route path={"/"}         element={<HomeView/>} />
          <Route path={"/login"}    element={<LoginView />} />
          <Route path={"/register"} element={<RegisterView/>} />
          <Route path={"recoverPass"} element={<RecoverPassView />} />
        </Routes>
        


    </>
  );
}

export default App;