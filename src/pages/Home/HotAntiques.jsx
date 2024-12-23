import { useEffect, useState } from "react";
import HotAntiqueCard from "./HotAntiqueCard";
import { Link } from "react-router-dom";

const HotAntiques = () => {

    const [antiques, setAntiques] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/antiques')
            .then(res => res.json())
            .then(data => {
                setAntiques(data);
            })
    }, [])

    return (
        <div className="container mx-auto px-5">
            <h2 className="text-3xl md:text-4xl font-medium text-center my-10 lg:my-20">Most Popular Antiques</h2>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-5 ">
                {
                    antiques.map(antique => <HotAntiqueCard key={antique._id} antique={antique}></HotAntiqueCard>)
                }
            </div>
            <div className="flex justify-center items-center py-10">
                <Link to='/allantiques' className="btn btn-wide btn-neutral">All Antiques</Link>
            </div>
        </div>
    );
};

export default HotAntiques;