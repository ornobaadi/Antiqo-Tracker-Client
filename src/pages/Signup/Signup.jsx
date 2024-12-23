import { useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../context/AuthContext/AuthContext';
import SocialLogin from '../../shared/SocialLogin';
import { Link } from 'react-router-dom';
const Signup = () => {

    const { createUser } = useContext(AuthContext);

    const handleSignup = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        // password validation 
        if (!/[A-Z]/.test(password)) {
            toast.error("Password must include at least one uppercase letter.");
            return;
        }
        if (!/[a-z]/.test(password)) {
            toast.error("Password must include at least one lowercase letter.");
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }

        // Proceed if validation passes
        toast.success("Signup successful!");

        createUser(email, password)
            .then(result => {
                console.log(result.user);
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center">
            <div className="max-w-md w-full bg-base-100 shadow-xl rounded-lg p-8">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold">Sign Up</h1>
                    <p className="text-sm text-gray-500 mt-2">Create your account to get started!</p>
                </div>
                <form onSubmit={handleSignup} className="space-y-4">
                    <div className="form-control">
                        <label className="label mb-2 text-sm font-medium text-gray-600">
                            <span>Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label mb-2 text-sm font-medium text-gray-600">
                            <span>Password</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="input input-bordered w-full"
                            required
                        />
                        <div className="text-right mt-2">
                            <a href="#" className="text-xs text-primary hover:underline">
                                Forgot password?
                            </a>
                        </div>
                    </div>
                    <div className="form-control">
                        <button className="btn btn-primary w-full">Sign Up</button>
                    </div>
                    <h2 className="text-center py-5">Already have an Account? &nbsp;
                        <Link to='/login' className="font-semibold">Login</Link>
                    </h2>
                </form>
                <SocialLogin />
            </div>
            <ToastContainer />
        </div>

    );
};

export default Signup;