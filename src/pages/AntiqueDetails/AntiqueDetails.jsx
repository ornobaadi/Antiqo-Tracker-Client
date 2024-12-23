import { useLoaderData } from "react-router-dom";

const AntiqueDetails = () => {

    const {artifactName, } = useLoaderData();
    

    return (
        <div>
            <h2>Antique Details of : {artifactName}</h2>
            <button className="btn">Like</button>
        </div>
    );
};

export default AntiqueDetails;