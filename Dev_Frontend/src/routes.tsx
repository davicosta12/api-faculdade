import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import Home from "./Components/Home/Home";
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";
import { isAuthenticated, userExist } from "./Services/AuthService/Auth";

const PrivateRoute = ({ children, ...options }: any) => {

    return isAuthenticated() && userExist() ?
        <>
            {children}
        </>
        : <Navigate to="/" />
}
const NavigationRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>}></Route>
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default NavigationRoutes;