import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Register from "./components/Register";
import HomePage from "./components/HomePage";
import NewCar from './pages/NewCar';
import RequiredAuthentication from "./components/RequiredAuthentication";
import Admin from "./components/Admin";
import NotFound from "./pages/NotFound";
import Protected from "./pages/Protected";



const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />


                <Route element={<RequiredAuthentication />} >
                    <Route path="protected" element={<Protected />} />
                    <Route path="admin" element={<Admin />} />
                    <Route path="/new" element={<NewCar />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default App;
