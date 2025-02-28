import { useEffect, useState } from "react";
import HotArtifactCard from "../Home/HotArtifactCard";
import { Helmet } from "react-helmet";

const AllArtifact = () => {
    const [artifacts, setArtifacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredArtifacts, setFilteredArtifacts] = useState([]);
    const [sortOrder, setSortOrder] = useState("default");

    useEffect(() => {
        fetch("https://historical-artifacts-server.vercel.app/artifacts")
            .then((res) => res.json())
            .then((data) => {
                const processedData = data.map(artifact => ({
                    ...artifact,
                    likeCount: artifact.likeCount ?? 0 // Default likeCount to 0 if missing
                }));
                setArtifacts(processedData);
                setFilteredArtifacts(processedData);
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
        <div className="container mx-auto px-5">
            <Helmet>
                <title>All Artifacts | Antiqo</title>
            </Helmet>
            <h2 className="text-4xl font-medium text-center my-10">All Artifacts</h2>

            <div className="flex items-center justify-between gap-4 my-5">
                <input
                    type="text"
                    placeholder="Search artifacts..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="input input-bordered w-full max-w-md"
                />
                <select
                    value={sortOrder}
                    onChange={handleSortChange}
                    className="select select-bordered"
                >
                    <option value="default">Sort by</option>
                    <option value="asc">Likes (Ascending)</option>
                    <option value="desc">Likes (Descending)</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-5">
                {filteredArtifacts.map((artifact) => (
                    <HotArtifactCard key={artifact._id} artifact={artifact} />
                ))}
            </div>
        </div>
    );
};

export default AllArtifact;
