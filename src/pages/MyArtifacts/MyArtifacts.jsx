import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import axios from "axios";
import { Archive, Pencil, Trash2, Heart, History } from "lucide-react";

const EmptyState = ({ title, message, icon }) => (
    <div className="flex flex-col items-center justify-center py-16 px-4 custom-bg-secondary rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
        <div className="w-16 h-16 flex items-center justify-center rounded-full custom-bg-accent mb-6">
            {icon}
        </div>
        <h3 className="text-2xl font-semibold custom-text-primary mb-3 eb-garamond">{title}</h3>
        <p className="custom-text-secondary text-center max-w-md outfit">{message}</p>
        <Link to="/addartifacts" className="mt-6 px-6 py-3 bg-gradient-to-r from-[var(--text-accent)] to-amber-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:custom-bg-accent outfit flex items-center">
            <Archive size={18} className="mr-2" />
            Add Your First Artifact
        </Link>
    </div>
);

const MyArtifacts = () => {
    const [artifacts, setArtifacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        setLoading(true);
        axios.get(`https://historical-artifacts-server.vercel.app/artifacts?email=${user.email}`, { withCredentials: true })
            .then(res => {
                setArtifacts(res.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Fetch error:", error);
                setLoading(false);
            });
    }, [user.email]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to recover this artifact!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#b45309",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            background: document.documentElement.classList.contains('dark') ? '#1e293b' : '#ffffff',
            color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#0f172a',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://historical-artifacts-server.vercel.app/artifacts/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userEmail: user.email })
                })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error(`HTTP error! status: ${res.status}`);
                        }
                        return res.json();
                    })
                    .then(data => {
                        if (data.success) {
                            Swal.fire({
                                title: "Deleted!",
                                text: data.message,
                                icon: "success",
                                background: document.documentElement.classList.contains('dark') ? '#1e293b' : '#ffffff',
                                color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#0f172a',
                            });
                            setArtifacts(artifacts.filter(artifact => artifact._id !== id));
                        } else {
                            throw new Error(data.error || 'Failed to delete artifact');
                        }
                    })
                    .catch((error) => {
                        console.error("Delete error:", error);
                        Swal.fire({
                            title: "Error!",
                            text: error.message || "Failed to delete artifact",
                            icon: "error",
                            background: document.documentElement.classList.contains('dark') ? '#1e293b' : '#ffffff',
                            color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#0f172a',
                        });
                    });
            }
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen custom-bg-primary flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-[var(--text-accent)] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen custom-bg-primary">
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--text-accent)] via-amber-700 to-teal-600"></div>

            <Helmet>
                <title>My Artifacts | Historical Collection</title>
            </Helmet>

            <div className="relative py-16 custom-bg-secondary">
                <div className="container mx-auto px-5">
                    <div className="w-16 h-1 custom-bg-accent mb-4 mx-auto"></div>
                    <h1 className="text-3xl md:text-5xl eb-garamond font-bold text-center custom-text-primary">
                        My Artifacts Collection
                    </h1>
                    <p className="text-base md:text-lg custom-text-secondary text-center max-w-3xl mx-auto mt-4 font-light outfit">
                        Manage your contributions to the historical collection
                        {artifacts.length > 0 && (
                            <span className="font-semibold">
                                {" "}
                                · {artifacts.length} artifact{artifacts.length !== 1 ? "s" : ""}
                            </span>
                        )}
                    </p>
                </div>
                {/* Decorative corner elements */}
                <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-[var(--text-accent)]/40 hidden md:block"></div>
                <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-[var(--text-accent)]/40 hidden md:block"></div>
            </div>

            <div className="container mx-auto px-4 py-10">
                {artifacts.length === 0 ? (
                    <EmptyState
                        title="No artifacts posted yet"
                        message="Start sharing your historical artifacts with the community by posting your first artifact."
                        icon={<Archive size={32} className="custom-text-accent" />}
                    />
                ) : (
                    <div className="custom-bg-secondary rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="custom-bg-primary">
                                        <th className="text-left py-4 px-6 text-sm custom-text-secondary font-semibold outfit">#</th>
                                        <th className="text-left py-4 px-6 text-sm custom-text-secondary font-semibold outfit">Image</th>
                                        <th className="text-left py-4 px-6 text-sm custom-text-secondary font-semibold outfit">Artifact Name</th>
                                        <th className="text-left py-4 px-6 text-sm custom-text-secondary font-semibold outfit">Type</th>
                                        <th className="text-left py-4 px-6 text-sm custom-text-secondary font-semibold outfit">
                                            <span className="flex items-center">
                                                <Heart size={14} className="mr-1 custom-text-accent" />
                                                Likes
                                            </span>
                                        </th>
                                        <th className="text-left py-4 px-6 text-sm custom-text-secondary font-semibold outfit">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {artifacts.map((artifact, index) => (
                                        <tr key={artifact._id} className="border-t border-slate-200 dark:border-slate-700 hover:custom-bg-primary transition-colors">
                                            <td className="py-4 px-6 custom-text-primary outfit">{index + 1}</td>
                                            <td className="py-4 px-6">
                                                <div className="h-16 w-20 rounded-md overflow-hidden">
                                                    <img
                                                        src={artifact.artifactImage}
                                                        alt={artifact.artifactName}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 custom-text-primary outfit font-medium">{artifact.artifactName}</td>
                                            <td className="py-4 px-6">
                                                <span className="px-3 py-1 rounded-full text-xs font-medium custom-bg-accent custom-text-accent outfit">
                                                    {artifact.artifactType}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 custom-text-primary outfit font-medium">
                                                <span className="flex items-center">
                                                    <Heart size={14} className="mr-1 text-rose-500" fill="#f43f5e" />
                                                    {artifact.likeCount || 0}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex gap-3">
                                                    <Link
                                                        to={`/update-artifact/${artifact._id}`}
                                                        className="px-3 py-2 rounded-lg font-medium text-xs bg-gradient-to-r from-[var(--text-accent)] to-amber-700 text-white hover:custom-bg-accent transition-colors outfit flex items-center"
                                                    >
                                                        <Pencil size={14} className="mr-1" />
                                                        Update
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(artifact._id)}
                                                        className="px-3 py-2 rounded-lg font-medium text-xs bg-rose-600 hover:bg-rose-500 text-white dark:bg-rose-500 dark:hover:bg-rose-400 transition-colors outfit flex items-center"
                                                    >
                                                        <Trash2 size={14} className="mr-1" />
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Add New Artifact Button */}
                {artifacts.length > 0 && (
                    <div className="mt-8 flex justify-center">
                        <Link to="/addartifacts" className="px-6 py-3 bg-gradient-to-r from-[var(--text-accent)] to-amber-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:custom-bg-accent outfit flex items-center">
                            <Archive size={18} className="mr-2" />
                            Add New Artifact
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyArtifacts;