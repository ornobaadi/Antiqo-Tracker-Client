/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const HotArtifactCard = ({ artifact }) => {
    const { _id, artifactName, artifactImage, historicalContext, likeCount = 0 } = artifact;

    return (
        <div className="card rounded-lg bg-base-100 shadow-xl">
            <figure>
                <img src={artifactImage} alt={artifactName} className="h-48 w-full object-cover" />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-lg font-bold">{artifactName}</h2>
                <p className="text-sm text-gray-500">{historicalContext}</p>
                <div className="text-sm mt-2">
                    <p className="text-xl font-semibold">Like Count: {likeCount}</p>
                </div>
                <div className="card-actions justify-end mt-4">
                    <Link to={`/artifacts/${_id}`} className="btn btn-outline">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HotArtifactCard;
