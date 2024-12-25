import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const MyArtifacts = () => {

    const [artifacts, setArtifacts] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        fetch(`https://historical-artifacts-server.vercel.app/artifacts?email=${user.email}`)
            .then(res => res.json())
            .then(data => setArtifacts(data))
    }, [user.email])
        

    return (
        <div className="container mx-auto px-5 py-10">
            <h2 className="text-4xl text-center font-medium mb-10">My Posted Artifacts: {artifacts.length} </h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Artifact Name</th>
                            <th>Artifact Type</th>
                            <th>Like Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            artifacts.map((artifact, index) => <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{artifact.artifactName}</td>
                                <td>{artifact.artifactType}</td>
                                <td>{artifact.likeCount}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyArtifacts;