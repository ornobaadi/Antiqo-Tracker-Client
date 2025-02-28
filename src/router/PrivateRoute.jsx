/* eslint-disable react/prop-types */
import { useContext } from 'react';
import AuthContext from '../context/AuthContext/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const { user, loading } = useContext(AuthContext);

    const location = useLocation();
    console.log(location);

    if(loading){
        return <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
    </div>
    }

    if(user) {
        return children;
    }

    return <Navigate to='/login' state={{ from: location }}></Navigate>
};

export default PrivateRoute;