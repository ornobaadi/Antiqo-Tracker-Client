import { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import AuthContext from '../../context/AuthContext/AuthContext';
import SocialLogin from '../../shared/SocialLogin';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { User, Mail, Lock, Image } from 'lucide-react';

const Signup = () => {
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); // Clear previous errors

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const userName = form.userName.value;
        const photoUrl = form.photoUrl.value;

        try {
            // Username validation
            if (userName.length < 5) {
                throw {
                    code: 'validation/username',
                    message: 'Username must be at least 5 characters long.'
                };
            }

            // Password validation
            const passwordErrors = [];
            if (!/[A-Z]/.test(password)) {
                passwordErrors.push('Password must include at least one uppercase letter');
            }
            if (!/[a-z]/.test(password)) {
                passwordErrors.push('Password must include at least one lowercase letter');
            }
            if (!/[0-9]/.test(password)) {
                passwordErrors.push('Password must include at least one number');
            }
            if (password.length < 6) {
                passwordErrors.push('Password must be at least 6 characters long');
            }

            if (passwordErrors.length > 0) {
                throw {
                    code: 'validation/password',
                    message: passwordErrors.join(', ')
                };
            }

            // If all validations pass, create user
            const result = await createUser(email, password, userName, photoUrl);
            console.log(result);
            
            // Show success alert and redirect only if user creation was successful
            await Swal.fire({
                icon: 'success',
                title: 'Welcome!',
                text: 'Your account has been created successfully.',
            });
            
            // Clear form and redirect only after successful signup
            form.reset();
            navigate('/', { replace: true });

        } catch (error) {
            console.error('Signup error:', error);
            
            // Handle different types of errors
            if (error.code === 'auth/email-already-in-use') {
                setError('This email is already registered. Please try logging in instead.');
            } else if (error.code === 'auth/invalid-email') {
                setError('Please enter a valid email address.');
            } else {
                setError(error.message || 'An error occurred during signup. Please try again.');
            }

            // Show SweetAlert for the error
            await Swal.fire({
                icon: 'error',
                title: 'Signup Failed',
                text: error.message || error.code
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="custom-bg-primary min-h-screen py-12 px-4 flex items-center justify-center">
            <Helmet>
                <title>Signup | Antiqo</title>
            </Helmet>
            
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--text-accent)] via-amber-700 to-teal-600"></div>
            
            <div className="container mx-auto max-w-lg">
                <div className="custom-bg-secondary rounded-lg shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                    <div className="p-8">
                        <div className="w-12 h-1 custom-bg-accent mb-6 mx-auto"></div>
                        
                        <h1 className="text-3xl eb-garamond font-bold custom-text-primary text-center">Join Antiqo</h1>
                        <p className="text-sm custom-text-secondary mt-2 text-center outfit">Begin your exploration of history's treasures</p>
                        
                        {error && (
                            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm outfit">
                                {error}
                            </div>
                        )}
                        
                        <form onSubmit={handleSignup} className="mt-8 space-y-5">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium custom-text-primary outfit">
                                    Username
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User size={18} className="custom-text-accent" />
                                    </div>
                                    <input
                                        type="text"
                                        name="userName"
                                        placeholder="Choose a username (min 5 characters)"
                                        className="pl-10 w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[var(--text-accent)] custom-bg-secondary custom-text-primary outfit"
                                        required
                                        minLength={5}
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="block text-sm font-medium custom-text-primary outfit">
                                    Profile Photo URL
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Image size={18} className="custom-text-accent" />
                                    </div>
                                    <input
                                        type="text"
                                        name="photoUrl"
                                        placeholder="Enter your photo URL"
                                        className="pl-10 w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[var(--text-accent)] custom-bg-secondary custom-text-primary outfit"
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="block text-sm font-medium custom-text-primary outfit">
                                    Email
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail size={18} className="custom-text-accent" />
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
                                <label className="block text-sm font-medium custom-text-primary outfit">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock size={18} className="custom-text-accent" />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Create a strong password"
                                        className="pl-10 w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[var(--text-accent)] custom-bg-secondary custom-text-primary outfit"
                                        required
                                        minLength={6}
                                    />
                                </div>
                                <p className="mt-1 text-xs custom-text-secondary outfit">
                                    Must be at least 6 characters with uppercase, lowercase, and numbers
                                </p>
                            </div>
                            
                            <div>
                                <button 
                                    type="submit" 
                                    className="w-full px-6 py-3 bg-gradient-to-r from-[var(--text-accent)] to-amber-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 outfit flex items-center justify-center"
                                    disabled={loading}
                                >
                                    {loading ? "Creating Account..." : "Create Account"}
                                </button>
                            </div>
                        </form>
                        
                        <SocialLogin />
                        
                        <div className="mt-6 text-center">
                            <p className="text-sm custom-text-secondary outfit">
                                Already have an account?{" "}
                                <Link to="/login" className="custom-text-accent font-medium hover:underline">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="mt-8 text-center">
                    <div className="w-16 h-1 custom-bg-accent mb-4 mx-auto"></div>
                    <p className="text-sm custom-text-secondary outfit">
                        Join thousands of history enthusiasts exploring artifacts around the world
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;