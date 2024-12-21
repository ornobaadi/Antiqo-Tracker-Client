import { useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../context/AuthContext/AuthContext';
import SocialLogin from '../../shared/SocialLogin';
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
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign Up now!</h1>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSignup} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Signup;