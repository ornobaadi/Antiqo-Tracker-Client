import {
    createBrowserRouter
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import AntiqueDetails from "../pages/AntiqueDetails/AntiqueDetails";
import PrivateRoute from "./PrivateRoute";
import Error from "../pages/Error/Error";
import AllAntiques from "../pages/AllAntiques/AllAntiques";
import MyLikedAntiques from "../pages/MyLikedAntiques/MyLikedAntiques";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <Error></Error>,
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
                path: '/likedantiques',
                element: <PrivateRoute>
                    <MyLikedAntiques></MyLikedAntiques>
                    </PrivateRoute>
            },
            {
                path: '/signup',
                element: <Signup></Signup>,
            },
            {
                path: '/allantiques',
                element: <AllAntiques></AllAntiques>,
            },
            {
                path: '/login',
                element: <Login></Login>,
            },
        ]
    },
]);

export default router;