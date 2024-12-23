import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const MyLikedAntiques = () => {

    const { user } = useAuth();

    const [likes, setLikes] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3000/liked-antique?email=${user.email}`)
            .then(res => res.json())
            .then(data => setLikes(data))
    }, [user.email])

    return (
        <div>
            <h2 className="text-4xl font-medium text-center my-10">My Liked Antiques: {likes.length}</h2>

            <div className="overflow-x-auto pb-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Antique Name</th>
                            <th>Antique Type</th>
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

export default MyLikedAntiques;