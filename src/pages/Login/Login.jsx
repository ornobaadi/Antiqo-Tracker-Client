import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import SocialLogin from "../../shared/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { Helmet } from "react-helmet";
import axios from "axios";
import { User, Key } from "lucide-react";

const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const from = location.state?.from?.pathname || "/";

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            const result = await loginUser(email, password);
            console.log('login', result.user.email)
            const user = { email: email }
            
            await axios.post('https://historical-artifacts-server.vercel.app/jwt', user, { withCredentials: true })
                .then(res => {
                    console.log(res.data);
                });
                
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
            setError(error.message);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="custom-bg-primary min-h-screen py-12 px-4 flex items-center justify-center">
            <Helmet>
                <title>Login | Antiqo</title>
            </Helmet>
            
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--text-accent)] via-amber-700 to-teal-600"></div>
            
            <div className="container mx-auto max-w-lg">
                <div className="custom-bg-secondary rounded-lg shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                    <div className="p-8">
                        <div className="w-12 h-1 custom-bg-accent mb-6 mx-auto"></div>
                        
                        <h1 className="text-3xl eb-garamond font-bold custom-text-primary text-center">Welcome Back</h1>
                        <p className="text-sm custom-text-secondary mt-2 text-center outfit">Sign in to continue your journey through history</p>
                        
                        {error && (
                            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm outfit">
                                {error}
                            </div>
                        )}
                        
                        <form onSubmit={handleLogin} className="mt-8 space-y-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium custom-text-primary outfit">
                                    Email
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User size={18} className="custom-text-accent" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        className="pl-10 w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[var(--text-accent)] custom-bg-secondary custom-text-primary outfit"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <label className="block text-sm font-medium custom-text-primary outfit">
                                        Password
                                    </label>
                                    <a href="#" className="text-xs custom-text-accent hover:underline outfit">
                                        Forgot password?
                                    </a>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Key size={18} className="custom-text-accent" />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        className="pl-10 w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[var(--text-accent)] custom-bg-secondary custom-text-primary outfit"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <button 
                                    type="submit" 
                                    className="w-full px-6 py-3 bg-gradient-to-r from-[var(--text-accent)] to-amber-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 outfit flex items-center justify-center"
                                    disabled={loading}
                                >
                                    {loading ? "Signing in..." : "Sign in"}
                                </button>
                            </div>
                        </form>
                        
                        <SocialLogin />
                        
                        <div className="mt-6 text-center">
                            <p className="text-sm custom-text-secondary outfit">
                                Don't have an account?{" "}
                                <Link to="/signup" className="custom-text-accent font-medium hover:underline">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="mt-8 text-center">
                    <div className="w-16 h-1 custom-bg-accent mb-4 mx-auto"></div>
                    <p className="text-sm custom-text-secondary outfit">
                        Discover the world's most fascinating historical artifacts
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;