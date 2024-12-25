import { useContext } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2
import 'sweetalert2/dist/sweetalert2.min.css'; // Import SweetAlert2 styles
import AuthContext from '../../context/AuthContext/AuthContext';
import SocialLogin from '../../shared/SocialLogin';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignup = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const userName = form.userName.value;
        const photoUrl = form.photoUrl.value;

        // Password validation
        if (!/[A-Z]/.test(password)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password must include at least one uppercase letter.',
            });
            return;
        }
        if (!/[a-z]/.test(password)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password must include at least one lowercase letter.',
            });
            return;
        }
        if (password.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password must be at least 6 characters long.',
            });
            return;
        }

        // Proceed if validation passes
        createUser(email, password, userName, photoUrl)
            .then(result => {
                console.log(result.user);
                // Show success alert
                Swal.fire({
                    icon: 'success',
                    title: 'Signup successful!',
                    text: 'You have successfully signed up.',
                }).then(() => {
                    // Redirect to homepage after clicking "OK"
                    navigate('/', { replace: true });
                });
            })
            .catch(error => {
                console.log(error.message);
            });
    };

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
                            <span>User Name</span>
                        </label>
                        <input
                            type="text"
                            name="userName"
                            placeholder="Enter your username"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label mb-2 text-sm font-medium text-gray-600">
                            <span>Profile Photo URL</span>
                        </label>
                        <input
                            type="text"
                            name="photoUrl"
                            placeholder="Enter your photo URL"
                            className="input input-bordered w-full"
                        />
                    </div>
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
                    </div>

                    <div className="form-control">
                        <button className="mt-4 btn btn-primary w-full">Sign Up</button>
                    </div>
                    <h2 className="text-center py-5">Already have an Account? &nbsp;
                        <Link to='/login' className="font-semibold">Login</Link>
                    </h2>
                </form>
                <SocialLogin />
            </div>
        </div>
    );
};

export default Signup;
