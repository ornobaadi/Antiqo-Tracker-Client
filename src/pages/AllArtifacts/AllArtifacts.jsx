import { useEffect, useState } from "react";
import HotArtifactCard from "../Home/HotArtifactCard";
import { Helmet } from "react-helmet";
import { Search, SlidersHorizontal } from "lucide-react";

const AllArtifact = () => {
    const [artifacts, setArtifacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredArtifacts, setFilteredArtifacts] = useState([]);
    const [sortOrder, setSortOrder] = useState("default");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch("https://historical-artifacts-server.vercel.app/artifacts")
            .then((res) => res.json())
            .then((data) => {
                const processedData = data.map(artifact => ({
                    ...artifact,
                    likeCount: artifact.likeCount ?? 0
                }));
                setArtifacts(processedData);
                setFilteredArtifacts(processedData);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching artifacts:", error);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        let updatedArtifacts = [...artifacts];

        if (searchTerm.trim() !== "") {
            updatedArtifacts = updatedArtifacts.filter((artifact) =>
                artifact.artifactName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (sortOrder === "asc") {
            updatedArtifacts.sort((a, b) => (a.likeCount ?? 0) - (b.likeCount ?? 0));
        } else if (sortOrder === "desc") {
            updatedArtifacts.sort((a, b) => (b.likeCount ?? 0) - (a.likeCount ?? 0));
        }

        setFilteredArtifacts(updatedArtifacts);
    }, [searchTerm, sortOrder, artifacts]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-16">
            <Helmet>
                <title>Collection | Historical Artifacts</title>
            </Helmet>
            
            {/* Header section with decorative elements */}
            <div className="relative py-16 bg-slate-100 dark:bg-slate-800">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-700 via-amber-500 to-teal-600 dark:from-amber-600 dark:via-amber-400 dark:to-teal-500"></div>
                <div className="container mx-auto px-5">
                    <div className="w-16 h-1 bg-amber-500 dark:bg-amber-400 mb-4 mx-auto"></div>
                    <h1 className="text-3xl md:text-5xl eb-garamond font-bold text-center text-slate-800 dark:text-amber-50">
                        Artifact Collection
                    </h1>
                    <p className="text-base md:text-lg text-slate-600 dark:text-amber-100/80 text-center max-w-3xl mx-auto mt-4 font-light outfit">
                        Explore our curated collection of historical treasures from across civilizations and eras
                    </p>
                </div>
                {/* Decorative corner elements */}
                <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-amber-500/40 dark:border-amber-400/30 hidden md:block"></div>
                <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-amber-500/40 dark:border-amber-400/30 hidden md:block"></div>
            </div>

            <div className="container mx-auto px-5 mt-8">
                {/* Search and filters */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 my-8">
                    <div className="relative w-full md:max-w-md">
                        <input
                            type="text"
                            placeholder="Search artifacts..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full py-3 pl-4 pr-12 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 outfit"
                        />
                        <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500" size={20} />
                    </div>
                    
                    <div className="relative w-full md:w-auto">
                        <select
                            value={sortOrder}
                            onChange={handleSortChange}
                            className="w-full md:w-48 appearance-none py-3 px-4 pr-10 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 outfit"
                        >
                            <option value="default">Sort by</option>
                            <option value="asc">Likes (Ascending)</option>
                            <option value="desc">Likes (Descending)</option>
                        </select>
                        <SlidersHorizontal className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                    </div>
                </div>

                {/* Results count */}
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 outfit">
                    Displaying {filteredArtifacts.length} artifacts
                </p>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : filteredArtifacts.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-xl text-slate-500 dark:text-slate-400 eb-garamond">No artifacts found matching your search.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-5">
                        {filteredArtifacts.map((artifact) => (
                            <HotArtifactCard key={artifact._id} artifact={artifact} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllArtifact;