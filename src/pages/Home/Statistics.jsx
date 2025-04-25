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
        <section className="py-20 relative overflow-hidden custom-bg-primary">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-600/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--bg-accent)]/5 rounded-full translate-y-1/2 -translate-x-1/3"></div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <span className="custom-text-accent font-medium uppercase tracking-wider text-sm">Preserving History Together</span>
                    <h2 className="text-3xl md:text-4xl eb-garamond font-medium mt-3 mb-4 custom-text-primary">
                        Our Impact in Numbers
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[var(--text-accent)] to-amber-700 mx-auto"></div>
                    <p className="custom-text-secondary mt-6 max-w-2xl mx-auto">
                        See how Antiqo is preserving our shared cultural heritage with the help of historians, researchers, and enthusiasts like you.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="relative group"
                        >
                            {/* Background gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--text-accent)] to-teal-600 rounded-lg transform rotate-1 group-hover:rotate-2 transition-transform duration-300 opacity-20 group-hover:opacity-30"></div>
                            
                            {/* Card */}
                            <div className="p-10 custom-bg-secondary rounded-lg hover:shadow-xl transition-all duration-300 relative border border-slate-200 dark:border-slate-700">
                                <div className="text-center">
                                    {/* Icon container */}
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full custom-bg-accent custom-text-accent mb-6">
                                        {stat.icon}
                                    </div>
                                    
                                    {/* Text elements */}
                                    <span className="block text-4xl font-bold custom-text-accent mb-4 eb-garamond">
                                        {stat.number}
                                    </span>
                                    <span className="block text-lg font-medium custom-text-primary mb-3">
                                        {stat.label}
                                    </span>
                                    <p className="text-sm custom-text-secondary">
                                        {stat.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Decorative accent */}
                <div className="mt-20 flex justify-center">
                    <button className="px-6 py-3 bg-gradient-to-r from-[var(--text-accent)] to-amber-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all hover:custom-bg-accent font-medium outfit">
                        Join Our Community
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Statistics;