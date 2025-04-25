import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";
import { Helmet } from "react-helmet";
import { User, Mail, Edit } from "lucide-react";

const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="custom-bg-primary min-h-screen py-12 px-4">
            <Helmet>
                <title>My Profile | Historical Artifacts</title>
            </Helmet>
            
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--text-accent)] via-amber-700 to-teal-600"></div>
            
            <div className="container mx-auto max-w-lg">
                <div className="custom-bg-secondary rounded-lg shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                    {/* Profile Header */}
                    <div className="flex flex-col items-center p-8 space-y-4 border-b border-slate-200 dark:border-slate-700">
                        {/* Decorative line */}
                        <div className="w-12 h-1 custom-bg-accent mb-2"></div>
                        
                        {user?.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt="User"
                                className="w-28 h-28 rounded-full object-cover border-4 border-[var(--bg-accent)] shadow-lg"
                            />
                        ) : (
                            <div className="w-28 h-28 rounded-full custom-bg-primary flex items-center justify-center border-4 border-[var(--bg-accent)] shadow-lg">
                                <User size={48} className="custom-text-secondary" />
                            </div>
                        )}
                        <h1 className="text-3xl eb-garamond font-bold custom-text-primary">
                            Welcome, {user?.name || "Guest"}!
                        </h1>
                        <p className="text-sm outfit custom-text-secondary">{user?.email || "Email not available"}</p>
                    </div>
                    
                    {/* Profile Details */}
                    <div className="px-8 py-6 space-y-4">
                        <h3 className="text-lg font-semibold outfit custom-text-primary">Your Profile Information</h3>
                        
                        <div className="space-y-4 outfit custom-text-secondary">
                            <div className="flex items-center">
                                <User size={18} className="mr-3 custom-text-accent flex-shrink-0" />
                                <div>
                                    <p className="font-semibold custom-text-primary">Name</p>
                                    <p>{user?.name || "Not provided"}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center">
                                <Mail size={18} className="mr-3 custom-text-accent flex-shrink-0" />
                                <div>
                                    <p className="font-semibold custom-text-primary">Email</p>
                                    <p>{user?.email || "Not provided"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Update Button */}
                    <div className="px-8 py-6 text-center">
                        <Link
                            to="/update-profile"
                            className="px-6 py-3 bg-gradient-to-r from-[var(--text-accent)] to-amber-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:custom-bg-accent outfit flex items-center justify-center"
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