import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext/AuthContext";
import { FaGoogle } from "react-icons/fa";
import Swal from 'sweetalert2';

const SocialLogin = () => {
    const { loginWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleGoogleLogin = async () => {
        try {
            const result = await loginWithGoogle();
            console.log(result.user);
            // Show success alert
            Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                text: 'You have successfully logged in.',
            }).then(() => {
                // Redirect after clicking OK
                navigate(from, { replace: true });
            });
        } catch (error) {
            console.error(error.message);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
            });
        }
    }

    return (
        <div className="mt-6">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-300 dark:border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-4 custom-bg-secondary custom-text-secondary outfit">Or continue with</span>
                </div>
            </div>
            
            <div className="mt-6">
                <button 
                    onClick={handleGoogleLogin} 
                    className="w-full flex items-center justify-center px-6 py-3 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 custom-bg-secondary custom-text-primary outfit"
                >
                    <FaGoogle className="mr-2 custom-text-accent" />
                    <span>Sign in with Google</span>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;