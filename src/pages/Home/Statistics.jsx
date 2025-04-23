import React from 'react';

const Statistics = () => {
    const stats = [
        {
            number: "1,230+",
            label: "Artifacts Tracked",
            description: "Artifacts preserved and documented.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            )
        },
        {
            number: "5,000+",
            label: "Active Users",
            description: "Users contributing to history.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )
        },
        {
            number: "6,850+",
            label: "Total Likes",
            description: "Likes received across artifact entries.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            )
        },
        {
            number: "1,100+",
            label: "Contributions",
            description: "User-submitted artifact entries.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
            )
        }
    ];

    return (
        <section className="py-20 relative overflow-hidden bg-amber-50 dark:bg-slate-900">
            {/* Decorative elements - visible in both themes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-600/5 dark:bg-teal-400/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-700/5 dark:bg-amber-500/5 rounded-full translate-y-1/2 -translate-x-1/3"></div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-amber-700 dark:text-amber-400 font-medium uppercase tracking-wider text-sm">Preserving History Together</span>
                    <h2 className="text-3xl md:text-4xl eb-garamond font-medium mt-3 mb-4 text-slate-800 dark:text-amber-50">
                        Our Impact in Numbers
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-700 dark:from-amber-400 dark:to-amber-500 mx-auto"></div>
                    <p className="text-slate-600 dark:text-slate-300 mt-6 max-w-2xl mx-auto">
                        See how Antiqo is preserving our shared cultural heritage with the help of historians, researchers, and enthusiasts like you.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="relative group"
                        >
                            {/* Background gradient - different for light/dark modes */}
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-700 to-teal-700 dark:from-amber-500 dark:to-teal-600 rounded-lg transform rotate-1 group-hover:rotate-2 transition-transform duration-300 opacity-20 group-hover:opacity-30"></div>
                            
                            {/* Card - changes colors based on theme */}
                            <div className="p-10 bg-white dark:bg-slate-800 rounded-lg hover:shadow-xl transition-all duration-300 relative border border-amber-200 dark:border-amber-900/50">
                                <div className="text-center">
                                    {/* Icon container - changes colors based on theme */}
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 mb-6">
                                        {stat.icon}
                                    </div>
                                    
                                    {/* Text elements - change colors based on theme */}
                                    <span className="block text-4xl font-bold text-amber-800 dark:text-amber-300 mb-4 eb-garamond">
                                        {stat.number}
                                    </span>
                                    <span className="block text-lg font-medium text-slate-700 dark:text-slate-200 mb-3">
                                        {stat.label}
                                    </span>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        {stat.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Decorative accent - adapts to theme */}
                <div className="mt-20 flex justify-center">
                    <button className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 dark:from-amber-500 dark:to-amber-600 text-amber-50 rounded-lg shadow-md hover:shadow-lg transition-all hover:translate-y-1 font-medium">
                        Join Our Community
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Statistics;