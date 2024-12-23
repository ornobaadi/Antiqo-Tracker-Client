/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const HotAntiqueCard = ({ antique }) => {

    const { _id, artifactName, artifactImage, artifactType, historicalContext, createdAt, discoveredAt, discoveredBy, presentLocation } = antique;

    return (
        <div className="card bg-base-100 shadow-xl">
            <figure>
                <img src={antique.artifactImage} alt={antique.artifactName} className="h-48 w-full object-cover" />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-lg font-bold">{antique.artifactName}</h2>
                <p className="text-sm text-gray-500">{antique.historicalContext}</p>
                <div className="text-sm mt-2">
                    <p>
                        <span className="font-semibold">Like Count: </span> {}
                    </p>
                </div>
                <div className="card-actions justify-end mt-4">
                    <Link
                        to={`/antiques/${_id}`}
                        className="btn btn-primary"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HotAntiqueCard; 