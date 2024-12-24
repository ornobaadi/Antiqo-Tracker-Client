import {
    createBrowserRouter
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import ArtifactDetails from "../pages/ArtifactDetails/ArtifactDetails";
import PrivateRoute from "./PrivateRoute";
import Error from "../pages/Error/Error";
import AllArtifacts from "../pages/AllArtifacts/AllArtifacts";
import MyLikedArtifacts from "../pages/MyLikedArtifacts/MyLikedArtifacts";
import AddArtifact from "../pages/AddArtifact/AddArtifact";

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
                path: '/artifacts/:id',
                element: <PrivateRoute>
                    <ArtifactDetails></ArtifactDetails>
                </PrivateRoute>,
                loader: ({params}) => fetch(`http://localhost:3000/artifacts/${params.id}`)
            },
            {
                path: '/likedartifacts',
                element: <PrivateRoute>
                    <MyLikedArtifacts></MyLikedArtifacts>
                    </PrivateRoute>
            },
            {
                path: '/addartifacts',
                element: <PrivateRoute>
                    <AddArtifact></AddArtifact>
                    </PrivateRoute>
            },
            {
                path: '/signup',
                element: <Signup></Signup>,
            },
            {
                path: '/allartifacts',
                element: <AllArtifacts></AllArtifacts>,
            },
            {
                path: '/login',
                element: <Login></Login>,
            },
        ]
    },
]);

export default router;