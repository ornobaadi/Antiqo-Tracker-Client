import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext/AuthContext";

const DEFAULT_USER_IMAGE = "/api/placeholder/400/400";

const Navbar = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

    const handleLogout = () => {
        logoutUser()
            .then(() => {
                console.log('Successful signout');
            })
            .catch(error => {
                console.log("Failed", error);
            });
    };

    const handleImageError = (e) => {
        e.target.src = DEFAULT_USER_IMAGE;
    };

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleThemeChange = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    const links = <>
        <li><NavLink to='/' className={({isActive}) => isActive ? "text-amber-700 font-medium" : "text-slate-700 hover:text-amber-600 transition-colors"}>Home</NavLink></li>
        <li><NavLink to='/allartifacts' className={({isActive}) => isActive ? "text-amber-700 font-medium" : "text-slate-700 hover:text-amber-600 transition-colors"}>All Artifacts</NavLink></li>
        <li><NavLink to='/addartifacts' className={({isActive}) => isActive ? "text-amber-700 font-medium" : "text-slate-700 hover:text-amber-600 transition-colors"}>Add Artifacts</NavLink></li>
        {
            user && <>
                <li><NavLink to='/myartifacts' className={({isActive}) => isActive ? "text-amber-700 font-medium" : "text-slate-700 hover:text-amber-600 transition-colors"}>My Artifacts</NavLink></li>
                <li><NavLink to='/likedartifacts' className={({isActive}) => isActive ? "text-amber-700 font-medium" : "text-slate-700 hover:text-amber-600 transition-colors"}>Liked Artifacts</NavLink></li>
            </>
        }
    </>;

    return (
        <div className="navbar bg-amber-50/80 sticky top-0 z-50 px-2 lg:px-48 mx-auto backdrop-blur-xl shadow-sm border-b border-amber-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-slate-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-amber-50 rounded-lg z-[1] mt-3 w-52 p-4 shadow-lg border border-amber-100">
                        {links}
                    </ul>
                </div>

                <Link to='/' className="btn btn-ghost text-xl normal-case">
                    <img className="w-10 h-10 mr-2 hidden lg:flex" src="/logo.webp" alt="" />
                    <span className="eb-garamond text-2xl font-extrabold text-amber-800">Antiqo</span>
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="flex space-x-8 px-1">
                    {links}
                </ul>
            </div>

            <div className="navbar-end gap-3">
                <label className="swap swap-rotate">
                    <input
                        type="checkbox"
                        checked={theme === "dark"}
                        onChange={handleThemeChange}
                    />
                    <svg
                        className="swap-off h-6 w-6 fill-amber-700"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                    </svg>
                    <svg
                        className="swap-on h-6 w-6 fill-teal-600"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                    </svg>
                </label>

                {user && (
                    <Link to="/profile" className="btn btn-ghost btn-circle avatar border border-amber-200">
                        <div className="w-10 rounded-full ring-1 ring-amber-200">
                            <img
                                src={user.photoURL || DEFAULT_USER_IMAGE}
                                alt="User"
                                onError={handleImageError}
                            />
                        </div>
                    </Link>
                )}

                {user ? (
                    <button 
                        onClick={handleLogout} 
                        className="btn bg-slate-700 hover:bg-slate-800 text-white border-none px-4 rounded-lg"
                    >
                        Logout
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <Link to='/login' className="btn btn-outline border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white">Login</Link>
                        <Link to='/signup' className="btn bg-teal-600 hover:bg-teal-700 text-white border-none">Signup</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;