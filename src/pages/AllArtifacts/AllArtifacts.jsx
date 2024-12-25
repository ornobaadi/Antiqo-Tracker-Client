import { useEffect, useState } from "react";
import HotArtifactCard from "../Home/HotArtifactCard";

const AllArtifact = () => {

    const [artifacts, setArtifacts] = useState([])

    useEffect(() => {
        fetch('https://historical-artifacts-server.vercel.app/artifacts')
        .then(res => res.json())
        .then(data => {
            setArtifacts(data);
        })
    }, [])

    return (
        <div className="container mx-auto px-5">
            <h2 className="text-4xl font-medium text-center my-10">All Artifacts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-5 ">
                {
                    artifacts.map(artifact => <HotArtifactCard key={artifact._id} artifact={artifact}></HotArtifactCard> )
                }
            </div>
        </div>
    );
};

export default AllArtifact;