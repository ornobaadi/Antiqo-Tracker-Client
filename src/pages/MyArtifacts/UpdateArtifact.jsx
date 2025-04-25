import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { Clock, MapPin, User, Archive, FileText, Image, Save } from "lucide-react";

const UpdateArtifact = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();
    const [artifact, setArtifact] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetch(`https://historical-artifacts-server.vercel.app/artifacts/${id}`)
            .then(res => res.json())
            .then(data => {
                setArtifact(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching artifact:", error);
                setLoading(false);
            });
    }, [id]);

    const handleUpdateArtifact = e => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.target);
        const updatedData = Object.fromEntries(formData.entries());
    
        fetch(`https://historical-artifacts-server.vercel.app/artifacts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...updatedData, userEmail: user.email })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                setIsSubmitting(false);
                if (data.success) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Artifact Updated Successfully",
                        text: "Your changes have been saved to the historical collection",
                        showConfirmButton: false,
                        timer: 1500,
                        background: document.documentElement.classList.contains('dark') ? '#1e293b' : '#ffffff',
                        color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#0f172a',
                    });
                    navigate('/myartifacts');
                } else {
                    throw new Error(data.error || 'Failed to update artifact');
                }
            })
            .catch(error => {
                console.error("Update error:", error);
                setIsSubmitting(false);
                Swal.fire({
                    title: "Error!",
                    text: error.message || "Failed to update artifact",
                    icon: "error",
                    background: document.documentElement.classList.contains('dark') ? '#1e293b' : '#ffffff',
                    color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#0f172a',
                });
            });
    }
    
    if (loading) {
        return (
            <div className="min-h-screen custom-bg-primary flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-[var(--text-accent)] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!artifact) {
        return (
            <div className="min-h-screen custom-bg-primary flex items-center justify-center">
                <div className="text-center py-10">
                    <h2 className="text-2xl font-medium custom-text-primary">Artifact not found</h2>
                    <p className="custom-text-secondary mt-2">The artifact you're looking for doesn't exist or has been removed.</p>
                    <button 
                        onClick={() => navigate('/myartifacts')}
                        className="mt-6 px-6 py-2 bg-gradient-to-r from-[var(--text-accent)] to-amber-700 text-white font-medium rounded-lg hover:custom-bg-accent transition-all duration-300 outfit"
                    >
                        Back to My Artifacts
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Update Artifact | Historical Collection</title>
            </Helmet>

            <div className="min-h-screen custom-bg-primary py-16">
                {/* Decorative top border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--text-accent)] via-amber-700 to-teal-600"></div>
                
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="w-16 h-1 custom-bg-accent mb-4 mx-auto"></div>
                        <h1 className="text-3xl md:text-4xl eb-garamond font-bold custom-text-primary mb-3">
                            Update Artifact
                        </h1>
                        <p className="custom-text-secondary outfit max-w-2xl mx-auto">
                            Refine the details of your historical artifact to ensure accuracy and completeness
                        </p>
                    </div>
                    
                    {/* Form */}
                    <div className="custom-bg-secondary rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                        {/* Decorative corner elements */}
                        <div className="relative">
                            <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-[var(--text-accent)]/30 hidden md:block"></div>
                            <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-[var(--text-accent)]/30 hidden md:block"></div>
                        </div>
                        
                        <form onSubmit={handleUpdateArtifact} className="p-6 md:p-10 space-y-8">
                            {/* Basic Information */}
                            <div className="space-y-6">
                                <h2 className="text-xl eb-garamond font-semibold custom-text-primary flex items-center">
                                    <Archive className="mr-2 custom-text-accent" size={20} />
                                    Basic Information
                                </h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Artifact name */}
                                    <div className="form-control">
                                        <label className="block text-sm font-medium custom-text-secondary mb-2 outfit">
                                            Artifact Name
                                        </label>
                                        <input 
                                            type="text" 
                                            name="artifactName" 
                                            defaultValue={artifact.artifactName}
                                            placeholder="Enter artifact name" 
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 custom-bg-secondary custom-text-primary focus:outline-none focus:ring-2 focus:ring-[var(--text-accent)] outfit"
                                            required 
                                        />
                                    </div>
                                    
                                    {/* Artifact Type */}
                                    <div className="form-control">
                                        <label className="block text-sm font-medium custom-text-secondary mb-2 outfit">
                                            Artifact Type
                                        </label>
                                        <select 
                                            name="artifactType" 
                                            defaultValue={artifact.artifactType}
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 custom-bg-secondary custom-text-primary focus:outline-none focus:ring-2 focus:ring-[var(--text-accent)] outfit appearance-none"
                                            required
                                        >
                                            <option value="" disabled>Select a type</option>
                                            <option value="Tools">Tools</option>
                                            <option value="Monument">Monument</option>
                                            <option value="Art">Art</option>
                                            <option value="Sculptures">Sculptures</option>
                                            <option value="Technology">Technology</option>
                                            <option value="Documents">Documents</option>
                                            <option value="Writings">Writings</option>
                                            <option value="Others">Others</option>
                                        </select>
                                    </div>
                                </div>
                                
                                {/* Artifact image */}
                                <div className="form-control">
                                    <label className="block text-sm font-medium custom-text-secondary mb-2 outfit flex items-center">
                                        <Image className="mr-1 custom-text-accent" size={16} />
                                        Artifact Image (URL)
                                    </label>
                                    <input 
                                        type="url" 
                                        name="artifactImage" 
                                        defaultValue={artifact.artifactImage}
                                        placeholder="Enter valid image URL" 
                                        className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 custom-bg-secondary custom-text-primary focus:outline-none focus:ring-2 focus:ring-[var(--text-accent)] outfit"
                                        required 
                                    />
                                </div>
                                
                                {/* Historical context */}
                                <div className="form-control">
                                    <label className="block text-sm font-medium custom-text-secondary mb-2 outfit flex items-center">
                                        <FileText className="mr-1 custom-text-accent" size={16} />
                                        Historical Context
                                    </label>
                                    <textarea 
                                        name="historicalContext"
                                        defaultValue={artifact.historicalContext}
                                        placeholder="Provide historical context and significance of this artifact..."
                                        className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 custom-bg-secondary custom-text-primary focus:outline-none focus:ring-2 focus:ring-[var(--text-accent)] outfit"
                                        rows="4"
                                        required
                                    ></textarea>
                                </div>
                            </div>
                            
                            {/* Timeline Information */}
                            <div className="space-y-6">
                                <h2 className="text-xl eb-garamond font-semibold custom-text-primary flex items-center border-t border-slate-200 dark:border-slate-700 pt-6">
                                    <Clock className="mr-2 custom-text-accent" size={20} />
                                    Timeline Information
                                </h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="block text-sm font-medium custom-text-secondary mb-2 outfit">
                                            Created At
                                        </label>
                                        <input 
                                            type="text" 
                                            name="createdAt" 
                                            defaultValue={artifact.createdAt}
                                            placeholder="e.g., 100 BC, 15th Century" 
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 custom-bg-secondary custom-text-primary focus:outline-none focus:ring-2 focus:ring-[var(--text-accent)] outfit"
                                            required 
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="block text-sm font-medium custom-text-secondary mb-2 outfit">
                                            Discovered At
                                        </label>
                                        <input 
                                            type="text" 
                                            name="discoveredAt" 
                                            defaultValue={artifact.discoveredAt}
                                            placeholder="e.g., 1799, Early 20th Century" 
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 custom-bg-secondary custom-text-primary focus:outline-none focus:ring-2 focus:ring-[var(--text-accent)] outfit"
                                            required 
                                        />
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="block text-sm font-medium custom-text-secondary mb-2 outfit flex items-center">
                                            <User className="mr-1 custom-text-accent" size={16} />
                                            Discovered By
                                        </label>
                                        <input 
                                            type="text" 
                                            name="discoveredBy" 
                                            defaultValue={artifact.discoveredBy}
                                            placeholder="Enter name of discoverer or civilization" 
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 custom-bg-secondary custom-text-primary focus:outline-none focus:ring-2 focus:ring-[var(--text-accent)] outfit"
                                            required 
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="block text-sm font-medium custom-text-secondary mb-2 outfit flex items-center">
                                            <MapPin className="mr-1 custom-text-accent" size={16} />
                                            Present Location
                                        </label>
                                        <input 
                                            type="text" 
                                            name="presentLocation" 
                                            defaultValue={artifact.presentLocation}
                                            placeholder="Museum, collection, or current location" 
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 custom-bg-secondary custom-text-primary focus:outline-none focus:ring-2 focus:ring-[var(--text-accent)] outfit"
                                            required 
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-control mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
                                <button 
                                    className={`w-full py-4 bg-gradient-to-r from-[var(--text-accent)] to-amber-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:custom-bg-accent outfit uppercase tracking-wide text-sm flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            Updating...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2" size={18} />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                    
                    {/* Help text */}
                    <div className="mt-8 text-center custom-text-secondary text-sm outfit">
                        <p>All changes are reviewed for accuracy and historical significance before publication.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateArtifact;