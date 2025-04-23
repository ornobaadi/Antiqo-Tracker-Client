import { useLoaderData, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";
import { Heart, Calendar, MapPin, User, Clock, Package, Amphora } from "lucide-react";

const ArtifactDetails = () => {
    const {
        artifactName,
        artifactImage,
        artifactType,
        historicalContext,
        createdAt,
        discoveredAt,
        discoveredBy,
        presentLocation,
        likeCount: initialLikeCount,
    } = useLoaderData();

    const { id } = useParams();
    const { user } = useAuth();
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(initialLikeCount || 0);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch initial liked status
    useEffect(() => {
        if (user?.email) {
            setIsLoading(true);
            fetch(`https://historical-artifacts-server.vercel.app/liked-artifacts/${id}?email=${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.liked) {
                        setIsLiked(true);
                    }
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching liked status:", error);
                    setIsLoading(false);
                });
        }
    }, [id, user?.email]);

    // Handle like
    const handleLike = () => {
        if (!user?.email) return;
        
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);

        const likedArtifact = {
            artifact_id: id,
            applicant_email: user.email,
        };

        fetch('https://historical-artifacts-server.vercel.app/liked-artifacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(likedArtifact),
        })
            .then((res) => {
                if (!res.ok) {
                    // Revert state on failure
                    setIsLiked(false);
                    setLikeCount((prev) => prev - 1);
                }
            })
            .catch((error) => {
                console.error("Error liking artifact:", error);
                setIsLiked(false);
                setLikeCount((prev) => prev - 1);
            });
    };

    // Handle unlike
    const handleUnlike = () => {
        if (!user?.email) return;
        
        setIsLiked(false);
        setLikeCount((prev) => prev - 1);

        fetch(`https://historical-artifacts-server.vercel.app/liked-artifacts/${id}?email=${user.email}`, {
            method: 'DELETE',
        })
            .then((res) => {
                if (!res.ok) {
                    // Revert state on failure
                    setIsLiked(true);
                    setLikeCount((prev) => prev + 1);
                }
            })
            .catch((error) => {
                console.error("Error unliking artifact:", error);
                setIsLiked(true);
                setLikeCount((prev) => prev + 1);
            });
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-12 px-4">
            <Helmet>
                <title>{artifactName} | Historical Artifacts</title>
            </Helmet>
            
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-700 via-amber-500 to-teal-600 dark:from-amber-600 dark:via-amber-400 dark:to-teal-500"></div>
            
            <div className="container mx-auto max-w-7xl">
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                    <div className="flex flex-col lg:flex-row">
                        {/* Image Section with gradient overlay */}
                        <div className="w-full lg:w-1/2 relative">
                            <img
                                src={artifactImage}
                                alt={artifactName}
                                className="object-cover w-full h-full max-h-[600px]"
                            />
                            {/* Decorative elements */}
                            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-white/30 hidden md:block"></div>
                            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-white/30 hidden md:block"></div>
                        </div>

                        {/* Details Section */}
                        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col">
                            {/* Decorative line */}
                            <div className="w-12 h-1 bg-amber-500 dark:bg-amber-400 mb-4"></div>
                            
                            <h1 className="text-3xl md:text-4xl eb-garamond font-bold text-slate-800 dark:text-amber-50">{artifactName}</h1>
                            
                            <div className="flex items-center mt-4 mb-6">
                                <span className="bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-xs px-3 py-1 rounded-full outfit uppercase tracking-wide">{artifactType}</span>
                                <div className="flex items-center ml-4 text-slate-500 dark:text-slate-400">
                                    <Heart size={16} className={isLiked ? "text-red-500 fill-red-500" : ""} />
                                    <span className="ml-1 text-sm outfit">{likeCount}</span>
                                </div>
                            </div>
                            
                            <p className="text-slate-600 dark:text-slate-300 mt-4 leading-relaxed outfit">{historicalContext}</p>

                            <div className="mt-8 space-y-4 text-sm outfit">
                                <div className="flex items-start">
                                    <Calendar size={18} className="mt-0.5 mr-3 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-slate-800 dark:text-amber-50">Created</p>
                                        <p className="text-slate-600 dark:text-slate-300">{createdAt}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <Clock size={18} className="mt-0.5 mr-3 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-slate-800 dark:text-amber-50">Discovered</p>
                                        <p className="text-slate-600 dark:text-slate-300">{discoveredAt}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <User size={18} className="mt-0.5 mr-3 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-slate-800 dark:text-amber-50">Discovered By</p>
                                        <p className="text-slate-600 dark:text-slate-300">{discoveredBy}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <Amphora size={18} className="mt-0.5 mr-3 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-slate-800 dark:text-amber-50">Present Location</p>
                                        <p className="text-slate-600 dark:text-slate-300">{presentLocation}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Section */}
                            <div className="mt-10">
                                {isLoading ? (
                                    <button disabled className="px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 rounded-lg outfit">
                                        Loading...
                                    </button>
                                ) : isLiked ? (
                                    <button 
                                        onClick={handleUnlike} 
                                        className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 outfit flex items-center"
                                    >
                                        <Heart size={18} className="mr-2 fill-white" /> Unlike this Artifact
                                    </button>
                                ) : (
                                    <button 
                                        onClick={handleLike} 
                                        className="px-6 py-3 bg-gradient-to-r from-amber-700 to-amber-600 dark:from-amber-600 dark:to-amber-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:from-amber-600 hover:to-amber-500 dark:hover:from-amber-500 dark:hover:to-amber-400 outfit flex items-center"
                                    >
                                        <Heart size={18} className="mr-2" /> Like this Artifact
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Related artifacts section placeholder - can be implemented if needed */}
                <div className="mt-16">
                    <div className="w-16 h-1 bg-amber-500 dark:bg-amber-400 mb-4 mx-auto"></div>
                    <h2 className="text-2xl md:text-3xl eb-garamond font-bold text-center text-slate-800 dark:text-amber-50 mb-6">
                        Explore Similar Artifacts
                    </h2>
                    <p className="text-center text-slate-500 dark:text-slate-400 outfit">
                        Discover more historical treasures from the same era and region
                    </p>
                    
                    {/* This could be populated with actual related artifacts */}
                    <div className="flex justify-center mt-6">
                        <button className="px-6 py-3 border border-amber-600 dark:border-amber-500 text-amber-700 dark:text-amber-400 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all duration-300 outfit">
                            View More {artifactType} Artifacts
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtifactDetails;