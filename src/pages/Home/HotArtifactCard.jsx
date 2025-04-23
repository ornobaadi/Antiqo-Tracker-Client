/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const HotArtifactCard = ({ artifact }) => {
    const { _id, artifactName, artifactImage, historicalContext, likeCount = 0 } = artifact;

    // Function to truncate text if it's too long
    const truncateText = (text, maxLength) => {
        if (!text) return "";
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    return (
        <div className="group overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 flex flex-col">
            <div className="relative overflow-hidden">
                <img 
                    src={artifactImage} 
                    alt={artifactName} 
                    className="h-52 w-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
                
                {/* Like counter */}
                <div className="absolute bottom-3 right-3 flex items-center bg-black/30 backdrop-blur-sm rounded-full px-3 py-1 text-white">
                    <Heart size={16} className="text-amber-500 dark:text-amber-400 mr-1" />
                    <span className="text-sm">{likeCount}</span>
                </div>
            </div>
            
            <div className="p-5 flex flex-col flex-1"> {/* Make the content area flex and grow */}
                <h2 className="eb-garamond text-xl font-bold text-slate-800 dark:text-amber-50 mb-2 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                    {artifactName}
                </h2>
                
                <p className="text-sm text-slate-600 dark:text-slate-300 outfit font-light flex-grow">
                    {truncateText(historicalContext, 100)}
                </p>
                
                <div className="card-actions mt-4">
                    <Link 
                        to={`/artifacts/${_id}`} 
                        className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-700 to-amber-600 dark:from-amber-600 dark:to-amber-500 text-white outfit font-medium rounded-lg text-center shadow-sm hover:shadow-md transition-all duration-300 hover:from-amber-600 hover:to-amber-500 dark:hover:from-amber-500 dark:hover:to-amber-400 uppercase tracking-wide text-sm"
                    >
                        View Details
                    </Link>
                </div>
            </div>
            
            {/* Decorative corner elements */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t border-l border-amber-500/30 dark:border-amber-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b border-r border-amber-500/30 dark:border-amber-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
    );
};

export default HotArtifactCard;