import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyArtifacts = () => {
    const [artifacts, setArtifacts] = useState([]);
    const { user } = useAuth();

    const fetchArtifacts = () => {
        fetch(`https://historical-artifacts-server.vercel.app/artifacts?email=${user.email}`)
            .then(res => res.json())
            .then(data => setArtifacts(data))
    }

    useEffect(() => {
        fetchArtifacts();
    }, [user.email])

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://historical-artifacts-server.vercel.app/artifacts/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userEmail: user.email })
                })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error(`HTTP error! status: ${res.status}`);
                        }
                        return res.json();
                    })
                    .then(data => {
                        if (data.success) {
                            Swal.fire({
                                title: "Deleted!",
                                text: data.message,
                                icon: "success"
                            });
                            setArtifacts(artifacts.filter(artifact => artifact._id !== id));
                        } else {
                            throw new Error(data.error || 'Failed to delete artifact');
                        }
                    })
                    .catch((error) => {
                        console.error("Delete error:", error);
                        Swal.fire({
                            title: "Error!",
                            text: error.message || "Failed to delete artifact",
                            icon: "error"
                        });
                    });
            }
        });
    };

    return (
        <div className="container mx-auto px-5 py-10">
            <Helmet>
                <title>My Artifacts | Antiqo</title>
            </Helmet>
            <h2 className="text-4xl text-center font-medium mb-10">My Posted Artifacts: {artifacts.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Artifact Name</th>
                            <th>Artifact Type</th>
                            <th>Like Count</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {artifacts.map((artifact, index) => (
                            <tr key={artifact._id}>
                                <th>{index + 1}</th>
                                <td>{artifact.artifactName}</td>
                                <td>{artifact.artifactType}</td>
                                <td>{artifact.likeCount || 0}</td>
                                <td>
                                    <div className="flex gap-3">
                                        <Link 
                                            to={`/update-artifact/${artifact._id}`} 
                                            className="btn btn-sm btn-primary"
                                        >
                                            Update
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(artifact._id)} 
                                            className="btn btn-sm btn-error"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyArtifacts;