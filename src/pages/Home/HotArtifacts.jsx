import { useEffect, useState } from "react";
import HotArtifactCard from "./HotArtifactCard";
import { Link } from "react-router-dom";

const HotArtifacts = () => {
    const [artifacts, setArtifacts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch('https://historical-artifacts-server.vercel.app/artifacts?limit=6')
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
        <div className="custom-bg-primary py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="w-16 h-1 custom-bg-accent mb-4 mx-auto"></div>
                <h2 className="text-3xl md:text-4xl eb-garamond font-bold text-center custom-text-primary mb-6">
                    Most Popular Artifacts
                </h2>
                <p className="text-center custom-text-secondary outfit mb-12">
                    Discover our collection of revered historical treasures
                </p>
                
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-16 h-16 border-4 border-[var(--text-accent)] border-t-transparent rounded-full animate-spin"></div>
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
                        className="px-8 py-3 bg-gradient-to-r from-[var(--text-accent)] to-amber-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:custom-bg-accent outfit"
                    >
                        Explore All Artifacts
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HotArtifacts;