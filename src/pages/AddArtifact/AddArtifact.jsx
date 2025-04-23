import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import { Helmet } from "react-helmet";
import { Clock, MapPin, User, Mail, Archive, Upload, FileText, Image } from "lucide-react";

const AddArtifact = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        artifactName: "",
        artifactImage: "",
        artifactType: "",
        historicalContext: "",
        createdAt: "",
        discoveredAt: "",
        discoveredBy: "",
        presentLocation: "",
        username: user?.name || "",
        userEmail: user?.email || ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAddArtifact = e => {
        e.preventDefault();
        setIsSubmitting(true);

        fetch('https://historical-artifacts-server.vercel.app/artifacts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                setIsSubmitting(false);
                if (data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Artifact has been added",
                        text: "Your contribution to the historical collection is greatly appreciated",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    navigate('/myartifacts');
                }
            })
            .catch(error => {
                console.error("Error adding artifact:", error);
                setIsSubmitting(false);
                Swal.fire({
                    icon: "error",
                    title: "Something went wrong",
                    text: "Please try again later"
                });
            });
    };

    return (
        <>
            <Helmet>
                <title>Add Artifact | Historical Collection</title>
            </Helmet>

            <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
                {/* Decorative top border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-700 via-amber-500 to-teal-600 dark:from-amber-600 dark:via-amber-400 dark:to-teal-500"></div>
                <div className="relative py-16 bg-slate-100 dark:bg-slate-800">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-700 via-amber-500 to-teal-600 dark:from-amber-600 dark:via-amber-400 dark:to-teal-500"></div>
                        <div className="container mx-auto px-5">
                            <div className="w-16 h-1 bg-amber-500 dark:bg-amber-400 mb-4 mx-auto"></div>
                            <h1 className="text-3xl md:text-5xl eb-garamond font-bold text-center text-slate-800 dark:text-amber-50">
                                Contribute to History
                            </h1>
                            <p className="text-base md:text-lg text-slate-600 dark:text-amber-100/80 text-center max-w-3xl mx-auto mt-4 font-light outfit">
                                Share your knowledge about a historical artifact and help preserve our collective heritage
                            </p>
                        </div>
                        {/* Decorative corner elements */}
                        <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-amber-500/40 dark:border-amber-400/30 hidden md:block"></div>
                        <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-amber-500/40 dark:border-amber-400/30 hidden md:block"></div>
                    </div>
                <div className="container mx-auto px-4 py-10 max-w-4xl">

                    {/* Form */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                        {/* Decorative corner elements */}
                        <div className="relative">
                            <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-amber-500/30 dark:border-amber-400/20 hidden md:block"></div>
                            <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-amber-500/30 dark:border-amber-400/20 hidden md:block"></div>
                        </div>

                        <form onSubmit={handleAddArtifact} className="p-6 md:p-10 space-y-8">
                            {/* Basic Information */}
                            <div className="space-y-6">
                                <h2 className="text-xl eb-garamond font-semibold text-slate-800 dark:text-amber-50 flex items-center">
                                    <Archive className="mr-2 text-amber-600 dark:text-amber-400" size={20} />
                                    Basic Information
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Artifact name */}
                                    <div className="form-control">
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 outfit">
                                            Artifact Name
                                        </label>
                                        <input
                                            type="text"
                                            name="artifactName"
                                            value={formData.artifactName}
                                            onChange={handleChange}
                                            placeholder="Enter artifact name"
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 outfit"
                                            required
                                        />
                                    </div>

                                    {/* Artifact Type */}
                                    <div className="form-control">
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 outfit">
                                            Artifact Type
                                        </label>
                                        <select
                                            name="artifactType"
                                            value={formData.artifactType}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 outfit appearance-none"
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
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 outfit flex items-center">
                                        <Image className="mr-1 text-amber-600 dark:text-amber-400" size={16} />
                                        Artifact Image (URL)
                                    </label>
                                    <input
                                        type="url"
                                        name="artifactImage"
                                        value={formData.artifactImage}
                                        onChange={handleChange}
                                        placeholder="Enter valid image URL"
                                        className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 outfit"
                                        required
                                    />
                                </div>

                                {/* Historical context */}
                                <div className="form-control">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 outfit flex items-center">
                                        <FileText className="mr-1 text-amber-600 dark:text-amber-400" size={16} />
                                        Historical Context
                                    </label>
                                    <textarea
                                        name="historicalContext"
                                        value={formData.historicalContext}
                                        onChange={handleChange}
                                        placeholder="Provide historical context and significance of this artifact..."
                                        className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 outfit"
                                        rows="4"
                                        required
                                    ></textarea>
                                </div>
                            </div>

                            {/* Timeline Information */}
                            <div className="space-y-6">
                                <h2 className="text-xl eb-garamond font-semibold text-slate-800 dark:text-amber-50 flex items-center border-t border-slate-200 dark:border-slate-700 pt-6">
                                    <Clock className="mr-2 text-amber-600 dark:text-amber-400" size={20} />
                                    Timeline Information
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 outfit">
                                            Created At
                                        </label>
                                        <input
                                            type="text"
                                            name="createdAt"
                                            value={formData.createdAt}
                                            onChange={handleChange}
                                            placeholder="e.g., 100 BC, 15th Century"
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 outfit"
                                            required
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 outfit">
                                            Discovered At
                                        </label>
                                        <input
                                            type="text"
                                            name="discoveredAt"
                                            value={formData.discoveredAt}
                                            onChange={handleChange}
                                            placeholder="e.g., 1799, Early 20th Century"
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 outfit"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 outfit flex items-center">
                                            <User className="mr-1 text-amber-600 dark:text-amber-400" size={16} />
                                            Discovered By
                                        </label>
                                        <input
                                            type="text"
                                            name="discoveredBy"
                                            value={formData.discoveredBy}
                                            onChange={handleChange}
                                            placeholder="Enter name of discoverer or civilization"
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 outfit"
                                            required
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 outfit flex items-center">
                                            <MapPin className="mr-1 text-amber-600 dark:text-amber-400" size={16} />
                                            Present Location
                                        </label>
                                        <input
                                            type="text"
                                            name="presentLocation"
                                            value={formData.presentLocation}
                                            onChange={handleChange}
                                            placeholder="Museum, collection, or current location"
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 outfit"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Contributor Information */}
                            <div className="space-y-6">
                                <h2 className="text-xl eb-garamond font-semibold text-slate-800 dark:text-amber-50 flex items-center border-t border-slate-200 dark:border-slate-700 pt-6">
                                    <User className="mr-2 text-amber-600 dark:text-amber-400" size={20} />
                                    Contributor Information
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 outfit">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 outfit cursor-not-allowed"
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 outfit flex items-center">
                                            <Mail className="mr-1 text-amber-600 dark:text-amber-400" size={16} />
                                            Your Email
                                        </label>
                                        <input
                                            type="email"
                                            name="userEmail"
                                            value={formData.userEmail}
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 outfit cursor-not-allowed"
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-control mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
                                <button
                                    className={`w-full py-4 bg-gradient-to-r from-amber-700 to-amber-600 dark:from-amber-600 dark:to-amber-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:from-amber-600 hover:to-amber-500 dark:hover:from-amber-500 dark:hover:to-amber-400 outfit uppercase tracking-wide text-sm flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="mr-2" size={18} />
                                            Add Artifact to Collection
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Help text */}
                    <div className="mt-8 text-center text-slate-500 dark:text-slate-400 text-sm outfit">
                        <p>All submissions are reviewed for accuracy and historical significance before publication.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddArtifact;