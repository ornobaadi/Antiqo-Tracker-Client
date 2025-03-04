import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";
import { Helmet } from "react-helmet";


const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="flex flex-col items-center py-12">
            <Helmet>
                <title>My Profile | Antiqo</title>
            </Helmet>
            <div className="w-full max-w-lg rounded-xl shadow-lg  overflow-hidden">
                {/* Profile Header */}
                <div className="flex flex-col items-center p-8 space-y-4">
                    {user?.photoURL ? (
                        <img
                            src={user.photoURL}
                            alt="User"
                            className="w-28 h-28 rounded-full object-cover border-4 border-emerald-300 shadow-lg"
                        />
                    ) : (
                        <div className="w-28 h-28 rounded-full bg-slate-200 border-4 border-emerald-300 shadow-lg"></div>
                    )}
                    <h1 className="text-3xl font-semibold ">
                        Welcome, {user?.name || "Guest"}!
                    </h1>
                    <p className="text-sm ">{user?.email || "Email not available"}</p>
                </div>
                {/* Profile Details */}
                <div className="px-8 py-6 space-y-4">
                    <h3 className="text-lg font-medium ">Your Profile Information</h3>
                    <ul className="space-y-2">
                        <li className="flex justify-between">
                            <span className="">Name:</span>
                            <span className="">{user?.name || "Not provided"}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="">Email:</span>
                            <span className="">{user?.email || "Not provided"}</span>
                        </li>
                    </ul>
                </div>
                {/* Update Button */}
                <div className="px-8 py-6 text-center">
                    <Link
                        to="/update-profile"
                        className="btn btn-success text-stone-50"
                    >
                        Update Profile
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;