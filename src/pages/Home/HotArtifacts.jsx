import { useEffect, useState } from "react";
import HotArtifactCard from "./HotArtifactCard";
import { Link } from "react-router-dom";

const HotArtifacts = () => {
    const [artifacts, setArtifacts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch('https://historical-artifacts-server.vercel.app/artifacts?limit=6') // Fetch top 6
            .then(res => res.json())
            .then(data => {
                setArtifacts(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching artifacts:", error);
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="bg-slate-50 dark:bg-slate-900 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="w-16 h-1 bg-amber-500 dark:bg-amber-400 mb-4 mx-auto"></div>
                <h2 className="text-3xl md:text-4xl eb-garamond font-bold text-center text-slate-800 dark:text-amber-50 mb-6">
                    Most Popular Artifacts
                </h2>
                <p className="text-center text-slate-500 dark:text-slate-400 outfit mb-12">
                    Discover our collection of revered historical treasures
                </p>
                
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {artifacts.map((artifact) => (
                            <HotArtifactCard key={artifact._id} artifact={artifact} />
                        ))}
                    </div>
                )}
                
                <div className="flex justify-center items-center mt-12">
                    <Link 
                        to="/allartifacts" 
                        className="px-8 py-3 bg-gradient-to-r from-amber-700 to-amber-600 dark:from-amber-600 dark:to-amber-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:from-amber-600 hover:to-amber-500 dark:hover:from-amber-500 dark:hover:to-amber-400 outfit"
                    >
                        Explore All Artifacts
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HotArtifacts;