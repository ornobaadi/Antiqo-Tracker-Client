import { useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import SocialLogin from "../../shared/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    console.log('In login page', location);
    const from = location.state || '/';

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        loginUser(email, password)
            .then(result => {
                console.log('login', result.user);
                navigate(from)
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center">
            <div className="max-w-md w-full bg-base-100 shadow-xl rounded-lg p-8">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold">Login</h1>
                    <p className="text-sm text-gray-500 mt-2">Welcome back! Please login to continue.</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
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
                        <button className="btn btn-primary w-full">Login</button>
                    </div>
                    <h2 className="text-center py-5">Don&apos;t have an Account? &nbsp;
                        <Link to='/signup' className="font-semibold">Signup</Link>
                    </h2>
                </form>
                <SocialLogin />
            </div>
        </div>

    );
};

export default Login;