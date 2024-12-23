import { useEffect, useState } from "react";
import HotAntiqueCard from "./HotAntiqueCard";

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
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
                {
                    antiques.map(antique => <HotAntiqueCard key={antique._id} antique={antique}></HotAntiqueCard> )
                }
            </div>
        </div>
    );
};

export default HotAntiques;