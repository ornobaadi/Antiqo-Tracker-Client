/* eslint-disable react/prop-types */
import { useContext } from 'react';
import AuthContext from '../context/AuthContext/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const { user, loading } = useContext(AuthContext);

    const location = useLocation();
    console.log(location);

    if(loading){
        return <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }

    if(user) {
        return children;
    }

    return <Navigate to='/login' state={{ from: location }}></Navigate>
};

export default PrivateRoute;