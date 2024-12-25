import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";

const MyLikedArtifacts = () => {

    const { user } = useAuth();

    const [likes, setLikes] = useState([])

    useEffect(() => {
        fetch(`https://historical-artifacts-server.vercel.app/liked-artifact?email=${user.email}`)
            .then(res => res.json())
            .then(data => setLikes(data))
    }, [user.email])

    return (
        <div className="container mx-auto">
            <Helmet>
                <title>Liked Artifacts | Antiqo</title>
            </Helmet>
            <h2 className="text-4xl font-medium text-center my-10">My Liked Artifact: {likes.length}</h2>

            <div className="overflow-x-auto pb-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Artifact Name</th>
                            <th>Artifact Type</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            likes.map((like, index) => <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{like.artifactName}</td>
                                <td>{like.artifactType}</td>
                                <td>{like.createdAt}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyLikedArtifacts;