import React from 'react';

const ContributorCard = ({ name, expertise, contributions, discovery, image }) => (
    <div className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors duration-300 flex flex-col">
        {/* Image Container */}
        <div className="aspect-square relative overflow-hidden bg-gray-800">
            <img
                src={image}
                alt={name}
                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent h-1/3" />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-medium text-gray-200 mb-2">{name}</h3>
            <p className="text-sm text-gray-400 mb-4">{expertise}</p>

            {/* Stats */}
            <div className="mt-auto space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Total Contributions</span>
                    <span className="text-lg font-medium text-gray-300">{contributions}</span>
                </div>

                {/* Recent Discovery */}
                <div>
                    <span className="text-sm text-gray-500 block mb-2">Recent Discovery</span>
                    <p className="text-sm text-gray-400">{discovery}</p>
                </div>
            </div>
        </div>
    </div>
);

const TopContributors = () => {
    const contributors = [
        {
            name: "Prof. Micheal D. Gordin",
            expertise: "Classical Architecture & Urban Planning",
            contributions: 247,
            discovery: "Uncovered evidence of advanced Roman heating systems in newly excavated villa complexes",
            image: "https://history.princeton.edu/sites/g/files/toruqf5351/files/styles/3x4_750w_1000h/public/2024-12/michaelgordin_102824_0009-small.jpeg?h=649c19cf&itok=e3qMSXzO"
        },
        {
            name: "Dr. Julian Richards",
            expertise: "Archaeological Conservation & Dating",
            contributions: 183,
            discovery: "Developed new dating technique for preserved organic materials in volcanic contexts",
            image: "https://archaeology.co.uk/wp-content/uploads/2024/11/Julian-Richards-edited.jpg"
        },
        {
            name: "Elizabeth Helen Blackburn",
            expertise: "Ancient Roman Technology & Engineering",
            contributions: 165,
            discovery: "Identified previously unknown water management systems in suburban Roman settlements",
            image: "https://www.bestmastersdegrees.com/wp-content/uploads/2016/01/Elizabeth-Helen-Blackburn-Most-Innovative-Women-Professors.jpg"
        }
    ];

    return (
        <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center my-10 lg:my-20 gap-5">
                    <h2 className="text-3xl md:text-4xl font-medium text-center ">Top Contributors</h2><span className="text-sm text-gray-400">Last Updated: February 2025</span>
                    
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {contributors.map((contributor, index) => (
                        <ContributorCard key={index} {...contributor} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopContributors;