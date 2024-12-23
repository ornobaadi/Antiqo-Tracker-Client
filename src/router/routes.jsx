import {
    createBrowserRouter
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import AntiqueDetails from "../pages/AntiqueDetails/AntiqueDetails";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <h2>Route not found</h2>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/antiques/:id',
                element: <PrivateRoute>
                    <AntiqueDetails></AntiqueDetails>
                </PrivateRoute>,
                loader: ({params}) => fetch(`http://localhost:3000/antiques/${params.id}`)
            },
            {
                path: '/signup',
                element: <Signup></Signup>,
            },
            {
                path: '/login',
                element: <Login></Login>,
            },
        ]
    },
]);

export default router;