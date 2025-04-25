import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext/AuthContext";
import { Sun, Moon, Menu } from "lucide-react";

const DEFAULT_USER_IMAGE = "/api/placeholder/400/400";

const Navbar = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

    const handleLogout = () => {
        logoutUser()
            .then(() => {
                console.log("Successful signout");
            })
            .catch((error) => {
                console.log("Failed", error);
            });
    };

    const handleImageError = (e) => {
        e.target.src = DEFAULT_USER_IMAGE;
    };

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleThemeChange = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    const links = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? "custom-text-accent font-medium"
                            : "custom-text-primary hover:custom-text-accent transition-colors"
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/allartifacts"
                    className={({ isActive }) =>
                        isActive
                            ? "custom-text-accent font-medium"
                            : "custom-text-primary hover:custom-text-accent transition-colors"
                    }
                >
                    All Artifacts
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/addartifacts"
                    className={({ isActive }) =>
                        isActive
                            ? "custom-text-accent font-medium"
                            : "custom-text-primary hover:custom-text-accent transition-colors"
                    }
                >
                    Add Artifacts
                </NavLink>
            </li>
            {user && (
                <>
                    <li>
                        <NavLink
                            to="/myartifacts"
                            className={({ isActive }) =>
                                isActive
                                    ? "custom-text-accent font-medium"
                                    : "custom-text-primary hover:custom-text-accent transition-colors"
                            }
                        >
                            My Artifacts
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/likedartifacts"
                            className={({ isActive }) =>
                                isActive
                                    ? "custom-text-accent font-medium"
                                    : "custom-text-primary hover:custom-text-accent transition-colors"
                            }
                        >
                            Liked Artifacts
                        </NavLink>
                    </li>
                </>
            )}
        </>
    );

    return (
        <div className="navbar custom-bg-primary sticky top-0 z-50 px-4 lg:px-8 xl:px-32 mx-auto backdrop-blur-xl shadow-lg border-b border-slate-200 dark:border-slate-700 transition-all duration-300">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <Menu
                            size={22}
                            className="custom-text-accent"
                            strokeWidth={1.5}
                        />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content custom-bg-secondary rounded-lg z-[1] mt-3 w-52 p-4 shadow-xl border border-slate-200 dark:border-slate-700 outfit"
                    >
                        {links}
                    </ul>
                </div>

                <Link to="/" className="btn btn-ghost text-xl normal-case flex items-center">
                    <div className="w-10 h-10 rounded-lg items-center justify-center mr-2 hidden lg:flex transition-all duration-300">
                        <img className="w-10 h-10" src="/logo.webp" alt="Antiqo Logo" />
                    </div>
                    <span className="eb-garamond text-2xl font-extrabold custom-text-primary transition-colors duration-300">
                        Antiqo
                    </span>
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="flex space-x-8 px-1 outfit">{links}</ul>
            </div>

            <div className="navbar-end gap-3">
                <button onClick={handleThemeChange} className="btn btn-ghost btn-circle">
                    {theme === "light" ? (
                        <Sun size={20} className="custom-text-accent" strokeWidth={1.5} />
                    ) : (
                        <Moon size={20} className="custom-text-accent" strokeWidth={1.5} />
                    )}
                </button>

                {user && (
                    <Link
                        to="/profile"
                        className="btn btn-ghost btn-circle avatar border border-slate-200 dark:border-slate-700 transition-all duration-300"
                    >
                        <div className="w-10 rounded-full ring-1 ring-[var(--text-accent)] transition-all duration-300">
                            <img
                                src={user.photoURL || DEFAULT_USER_IMAGE}
                                alt="User Profile"
                                onError={handleImageError}
                                className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                            />
                        </div>
                    </Link>
                )}

                {user ? (
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-gradient-to-r from-[var(--text-accent)] to-amber-700 text-white rounded-lg transition-all duration-300 hover:custom-bg-accent outfit text-sm"
                    >
                        Logout
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <Link
                            to="/login"
                            className="px-4 py-2 border border-[var(--text-accent)] custom-text-accent rounded-lg hover:custom-bg-accent hover:custom-text-primary transition-all duration-300 outfit text-sm"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="px-4 py-2 bg-gradient-to-r from-[var(--text-accent)] to-amber-700 text-white rounded-lg transition-all duration-300 hover:custom-bg-accent outfit text-sm"
                        >
                            Signup
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;