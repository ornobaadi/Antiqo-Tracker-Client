
const Statistics = () => {
    const stats = [
        {
            number: "1,230+",
            label: "Artifacts Tracked",
            description: "Artifacts preserved and documented."
        },
        {
            number: "5,000+",
            label: "Active Users",
            description: "Users contributing to history."
        },
        {
            number: "6,850+",
            label: "Total Likes",
            description: "Likes received across artifact entries."
        },
        {
            number: "1,100+",
            label: "Contributions",
            description: "User-submitted artifact entries."
        }
    ];

    return (
        <section className="py-16 ">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-medium mb-4">
                        Our Impact in Numbers
                    </h2>
                    <p className="text-gray-400">
                        See how Antiqo is preserving history with your help.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="p-10 bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors duration-300"
                        >
                            <div className="text-center">
                                <span className="block text-4xl font-bold text-gray-100 mb-2">
                                    {stat.number}
                                </span>
                                <span className="block text-lg font-medium text-gray-300 mb-2">
                                    {stat.label}
                                </span>
                                <p className="text-sm text-gray-400">
                                    {stat.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Statistics;