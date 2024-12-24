import { useEffect, useState } from "react";
import HotArtifactCard from "./HotArtifactCard";
import { Link } from "react-router-dom";

const HotArtifacts = () => {

    const [artifacts, setArtifacts] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/artifacts')
            .then(res => res.json())
            .then(data => {
                setArtifacts(data);
            })
    }, [])

    return (
        <div className="container mx-auto px-5">
            <h2 className="text-3xl md:text-4xl font-medium text-center my-10 lg:my-20">Most Popular Artifacts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-5 ">
                {
                    artifacts.map(artifact => <HotArtifactCard key={artifact._id} artifact={artifact}></HotArtifactCard>)
                }
            </div>
            <div className="flex justify-center items-center py-10">
                <Link to='/allartifacts' className="btn btn-wide btn-neutral">All Artifacts</Link>
            </div>
        </div>
    );
};

export default HotArtifacts;