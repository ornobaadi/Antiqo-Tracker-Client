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
        <div className="custom-bg-primary min-h-screen pb-16">
            <Helmet>
                <title>Collection | Historical Artifacts</title>
            </Helmet>
            
            <div className="relative py-16 custom-bg-secondary">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--text-accent)] via-amber-700 to-teal-600"></div>
                <div className="container mx-auto px-5">
                    <div className="w-16 h-1 custom-bg-accent mb-4 mx-auto"></div>
                    <h1 className="text-3xl md:text-5xl eb-garamond font-bold text-center custom-text-primary">
                        Artifact Collection
                    </h1>
                    <p className="text-base md:text-lg custom-text-secondary text-center max-w-3xl mx-auto mt-4 font-light outfit">
                        Explore our curated collection of historical treasures from across civilizations and eras
                    </p>
                </div>
                <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-[var(--text-accent)]/40 hidden md:block"></div>
                <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-[var(--text-accent)]/40 hidden md:block"></div>
            </div>

            <div className="container mx-auto px-5 mt-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 my-8">
                    <div className="relative w-full md:max-w-md">
                        <input
                            type="text"
                            placeholder="Search artifacts..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full py-3 pl-4 pr-12 rounded-lg border border-slate-200 dark:border-slate-700 custom-bg-secondary custom-text-primary focus:outline-none focus:ring-2 focus:ring-[var(--text-accent)] outfit"
                        />
                        <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 custom-text-secondary" size={20} />
                    </div>
                    
                    <div className="relative w-full md:w-auto">
                        <select
                            value={sortOrder}
                            onChange={handleSortChange}
                            className="w-full md:w-48 appearance-none py-3 px-4 pr-10 rounded-lg border border-slate-200 dark:border-slate-700 custom-bg-secondary custom-text-primary focus:outline-none focus:ring-2 focus:ring-[var(--text-accent)] outfit"
                        >
                            <option value="default">Sort by</option>
                            <option value="asc">Likes (Ascending)</option>
                            <option value="desc">Likes (Descending)</option>
                        </select>
                        <SlidersHorizontal className="absolute right-4 top-1/2 transform -translate-y-1/2 custom-text-secondary" size={18} />
                    </div>
                </div>

                <p className="text-sm custom-text-secondary mb-6 outfit">
                    Displaying {filteredArtifacts.length} artifacts
                </p>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-16 h-16 border-4 border-[var(--text-accent)] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : filteredArtifacts.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-xl custom-text-primary eb-garamond">No artifacts found matching your search.</p>
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