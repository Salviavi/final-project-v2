import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedAfterLogin from "./ProtectedAfterLogin";
import Register from "../pages/Register";
import Landing from "../pages/Landing";
import Dashboard from "../pages/Dashboard";
import Location from "../pages/Location";
import Activity from "../pages/Activity";
import Promo from "../pages/Promo";
import CreatePromo from "../pages/CreatePromo";
import PromosPages from "../pages/dashboard-pages/Promos";
import ActivitiesPages from "../pages/dashboard-pages/Activities";
import LocationPages from "../pages/dashboard-pages/Locations";
import ProfilePages from "../pages/dashboard-pages/Profile";
import UsersPages from "../pages/dashboard-pages/Users";

export const routeList = [
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/promo",
    element: <Promo />,
  },
  {
    path: "/activity",
    element: <Activity />,
  },
  {
    path: "/location",
    element: <Location />,
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
    element: <Register />,
  },
  {
    path: "/login",
    element: (
      <ProtectedAfterLogin>
        <Login />
      </ProtectedAfterLogin>
    ),
  },
  {
    path: "/locations",
    element: (
      <ProtectedRoute>
        <LocationPages />
      </ProtectedRoute>
    ),
  },

  {
    path: "/promos",
    element: (
      <ProtectedRoute>
        <PromosPages />
      </ProtectedRoute>
    ),
  },
  {
    path: "/activities",
    element: (
      <ProtectedRoute>
        <ActivitiesPages />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <ProfilePages />
      </ProtectedRoute>
    ),
  },
  {
    path: "/users",
    element: (
      <ProtectedRoute>
        <UsersPages />
      </ProtectedRoute>
    ),
  },
];
