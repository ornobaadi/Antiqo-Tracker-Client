import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import AuthContext from "../../context/AuthContext/AuthContext";
import { Helmet } from "react-helmet";
import { User, Image, Save, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const UpdateProfile = () => {
    const { user } = useContext(AuthContext);
    const auth = getAuth();
    const navigate = useNavigate();

    const [name, setName] = useState(user?.name || "");
    const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photoURL,
            });
            navigate("/profile");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-12 px-4">
            <Helmet>
                <title>Update Profile | Historical Artifacts</title>
            </Helmet>
            
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-700 via-amber-500 to-teal-600 dark:from-amber-600 dark:via-amber-400 dark:to-teal-500"></div>
            
            <div className="container mx-auto max-w-lg">
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                    <div className="px-8 py-6">
                        {/* Back button */}
                        <Link to="/profile" className="flex items-center text-amber-600 dark:text-amber-400 mb-6 outfit hover:underline">
                            <ArrowLeft size={16} className="mr-1" /> Back to Profile
                        </Link>
                        
                        {/* Decorative line */}
                        <div className="w-12 h-1 bg-amber-500 dark:bg-amber-400 mb-4 mx-auto"></div>
                        
                        <h2 className="text-2xl eb-garamond font-bold text-center mb-6 text-slate-800 dark:text-amber-50">
                            Update Profile Information
                        </h2>
                        
                        <form onSubmit={handleUpdate} className="space-y-6 outfit">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                    <div className="flex items-center">
                                        <User size={16} className="mr-2 text-amber-600 dark:text-amber-400" />
                                        Name
                                    </div>
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                    <div className="flex items-center">
                                        <Image size={16} className="mr-2 text-amber-600 dark:text-amber-400" />
                                        Photo URL
                                    </div>
                                </label>
                                <input
                                    type="text"
                                    value={photoURL}
                                    onChange={(e) => setPhotoURL(e.target.value)}
                                    placeholder="Enter photo URL"
                                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                                />
                            </div>
                            
                            {/* Preview */}
                            {photoURL && (
                                <div className="flex flex-col items-center p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900">
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Preview:</p>
                                    <img
                                        src={photoURL}
                                        alt="Preview"
                                        className="w-20 h-20 rounded-full object-cover border-2 border-amber-200 dark:border-amber-700"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = ""; // Placeholder URL if needed
                                            e.target.classList.add("bg-slate-200", "dark:bg-slate-700");
                                        }}
                                    />
                                </div>
                            )}
                            
                            <button
                                type="submit"
                                className={`w-full py-3 rounded-lg shadow-md text-white bg-gradient-to-r from-amber-700 to-amber-600 dark:from-amber-600 dark:to-amber-500 hover:from-amber-600 hover:to-amber-500 dark:hover:from-amber-500 dark:hover:to-amber-400 transition-all duration-300 outfit flex items-center justify-center ${
                                    loading ? "cursor-not-allowed opacity-70" : ""
                                }`}
                                disabled={loading}
                            >
                                <Save size={18} className="mr-2" />
                                {loading ? "Updating..." : "Save Changes"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;