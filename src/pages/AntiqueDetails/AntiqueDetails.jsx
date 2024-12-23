import { useLoaderData, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AntiqueDetails = () => {
    const {
        artifactName,
        artifactImage,
        artifactType,
        historicalContext,
        createdAt,
        discoveredAt,
        discoveredBy,
        presentLocation,
    } = useLoaderData();

    const { id } = useParams();
    const { user } = useAuth();
    console.log(id, user);

    return (
        <div className="bg-base-100 min-h-[800px] flex items-center justify-center py-10 px-4">
            <div className="bg-white rounded-lg shadow-lg max-w-7xl w-full flex flex-col lg:flex-row">
                {/* Image Section */}
                <div className="w-full lg:w-1/2">
                    <img
                        src={artifactImage}
                        alt={artifactName}
                        className="rounded-l-lg object-cover w-full h-full max-h-[500px]"
                    />
                </div>

                {/* Details Section */}
                <div className="w-full lg:w-1/2 p-8 flex flex-col">
                    <h1 className="text-2xl font-bold text-gray-800">{artifactName}</h1>
                    <p className="text-gray-600 mt-4 leading-relaxed">{historicalContext}</p>

                    <div className="mt-6 space-y-4 text-sm">
                        <p>
                            <span className="font-semibold text-gray-700">Artifact Type:</span> {artifactType}
                        </p>
                        <p>
                            <span className="font-semibold text-gray-700">Created At:</span> {createdAt}
                        </p>
                        <p>
                            <span className="font-semibold text-gray-700">Discovered At:</span> {discoveredAt}
                        </p>
                        <p>
                            <span className="font-semibold text-gray-700">Discovered By:</span> {discoveredBy}
                        </p>
                        <p>
                            <span className="font-semibold text-gray-700">Present Location:</span> {presentLocation}
                        </p>
                    </div>

                    {/* Action Section */}
                    <div className="flex items-center mt-8">
                        <button className="btn btn-outline">Like</button>
                        &nbsp;
                        <button className="btn btn-neutral">Unlike</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AntiqueDetails;
