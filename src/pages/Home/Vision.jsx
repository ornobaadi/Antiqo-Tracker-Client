
const VisionCard = ({ title, description }) => (
    <div className="p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
        <h3 className="text-lg font-medium  mb-3">{title}</h3>
        <p className="text-sm  leading-relaxed">{description}</p>
    </div>
);

const Vision = () => {
    const visionGoals = [
        {
            title: "Advanced Research Methods",
            description: "Developing cutting-edge methodologies that combine traditional research approaches with modern technological capabilities."
        },
        {
            title: "Data-Driven Insights",
            description: "Leveraging big data analytics and machine learning to extract meaningful patterns and predictions from complex datasets."
        },
        {
            title: "Collaborative Innovation",
            description: "Building a global network of researchers and institutions to facilitate knowledge sharing and breakthrough discoveries."
        },
        {
            title: "Sustainable Impact",
            description: "Creating lasting positive change through responsible research practices and environmentally conscious methodologies."
        }
    ];

    return (
        <section className="">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-medium text-center my-10 lg:my-20">Our Vision</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {visionGoals.map((goal, index) => (
                        <VisionCard key={index} {...goal} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Vision;