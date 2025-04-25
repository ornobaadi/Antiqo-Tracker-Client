import React from 'react';
import { Award, BookOpen, UserCheck } from 'lucide-react';

const ContributorCard = ({ name, expertise, contributions, discovery, image }) => (
    <div className="custom-bg-secondary rounded-lg shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-2xl hover:transform hover:scale-[1.02] flex flex-col">
        {/* Image Container with decorative corners */}
        <div className="aspect-square relative overflow-hidden">
            <img
                src={image}
                alt={name}
                className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
            />
            {/* Decorative elements */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/30 hidden md:block"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/30 hidden md:block"></div>
            
            {/* Gradient overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent h-1/3"></div>
            
            {/* Name overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-xl eb-garamond font-bold text-white">{name}</h3>
                <span className="text-xs custom-text-accent uppercase tracking-wide outfit">{expertise}</span>
            </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <Award size={18} className="custom-text-accent mr-2" />
                    <span className="text-sm font-medium custom-text-primary outfit">Contributions</span>
                </div>
                <span className="text-lg font-bold custom-text-accent eb-garamond">{contributions}</span>
            </div>

            {/* Recent Discovery */}
            <div>
                <div className="flex items-center mb-3">
                    <BookOpen size={18} className="custom-text-accent mr-2" />
                    <span className="text-sm font-medium custom-text-primary outfit">Recent Discovery</span>
                </div>
                <p className="text-sm custom-text-secondary leading-relaxed outfit">{discovery}</p>
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
        <section className="py-16 custom-bg-primary">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="w-16 h-1 custom-bg-accent mb-4 mx-auto"></div>
                <h2 className="text-3xl md:text-4xl eb-garamond font-bold text-center custom-text-primary mb-6">
                    Top Contributors
                </h2>
                <p className="text-center custom-text-secondary outfit mb-6">
                    Last Updated: February 2025
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    {contributors.map((contributor, index) => (
                        <ContributorCard key={index} {...contributor} />
                    ))}
                </div>
                
                <div className="flex justify-center items-center mt-12">
                    <button 
                        className="px-6 py-3 border border-[var(--text-accent)] custom-text-accent rounded-lg hover:custom-bg-accent hover:text-white transition-all duration-300 outfit flex items-center"
                    >
                        <UserCheck size={18} className="mr-2" />
                        View All Contributors
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TopContributors;