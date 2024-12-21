import {
    createBrowserRouter
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";

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