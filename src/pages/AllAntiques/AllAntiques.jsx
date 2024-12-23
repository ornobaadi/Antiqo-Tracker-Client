import { useEffect, useState } from "react";
import HotAntiqueCard from "../Home/HotAntiqueCard";

const AllAntiques = () => {

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
            <h2 className="text-4xl font-medium text-center my-10">All Antiques</h2>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-5 ">
                {
                    antiques.map(antique => <HotAntiqueCard key={antique._id} antique={antique}></HotAntiqueCard> )
                }
            </div>
        </div>
    );
};

export default AllAntiques;