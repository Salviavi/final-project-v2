import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedAfterLogin from "./ProtectedAfterLogin";
import Register from "../pages/Register";
import Landing from "../pages/Landing";
import Dashboard from "../pages/Landing";


export const routeList = [
    {
        path: "/",
        element: <Landing />

    },
    {
        path: "/dashboard",
        element: (
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
        ),

    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: (
            <ProtectedAfterLogin>
                <Login />
            </ProtectedAfterLogin>
        ),
    },

];