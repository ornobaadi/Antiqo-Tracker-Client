import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";
import { Helmet } from "react-helmet";
import { User, Mail, Edit } from "lucide-react";

const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-12 px-4">
            <Helmet>
                <title>My Profile | Historical Artifacts</title>
            </Helmet>
            
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-700 via-amber-500 to-teal-600 dark:from-amber-600 dark:via-amber-400 dark:to-teal-500"></div>
            
            <div className="container mx-auto max-w-lg">
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                    {/* Profile Header */}
                    <div className="flex flex-col items-center p-8 space-y-4 border-b border-slate-200 dark:border-slate-700">
                        {/* Decorative line */}
                        <div className="w-12 h-1 bg-amber-500 dark:bg-amber-400 mb-2"></div>
                        
                        {user?.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt="User"
                                className="w-28 h-28 rounded-full object-cover border-4 border-amber-200 dark:border-amber-700 shadow-lg"
                            />
                        ) : (
                            <div className="w-28 h-28 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center border-4 border-amber-200 dark:border-amber-700 shadow-lg">
                                <User size={48} className="text-slate-400 dark:text-slate-500" />
                            </div>
                        )}
                        <h1 className="text-3xl eb-garamond font-bold text-slate-800 dark:text-amber-50">
                            Welcome, {user?.name || "Guest"}!
                        </h1>
                        <p className="text-sm outfit text-slate-600 dark:text-slate-300">{user?.email || "Email not available"}</p>
                    </div>
                    
                    {/* Profile Details */}
                    <div className="px-8 py-6 space-y-4">
                        <h3 className="text-lg font-semibold outfit text-slate-800 dark:text-amber-50">Your Profile Information</h3>
                        
                        <div className="space-y-4 outfit text-slate-600 dark:text-slate-300">
                            <div className="flex items-center">
                                <User size={18} className="mr-3 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-slate-800 dark:text-amber-50">Name</p>
                                    <p>{user?.name || "Not provided"}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center">
                                <Mail size={18} className="mr-3 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-slate-800 dark:text-amber-50">Email</p>
                                    <p>{user?.email || "Not provided"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Update Button */}
                    <div className="px-8 py-6 text-center">
                        <Link
                            to="/update-profile"
                            className="px-6 py-3 bg-gradient-to-r from-amber-700 to-amber-600 dark:from-amber-600 dark:to-amber-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:from-amber-600 hover:to-amber-500 dark:hover:from-amber-500 dark:hover:to-amber-400 outfit flex items-center justify-center"
                        >
                            <Edit size={18} className="mr-2" /> Update Profile
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;