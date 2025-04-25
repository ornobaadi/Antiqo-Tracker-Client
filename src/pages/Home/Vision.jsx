import { Lightbulb, Database, Users, Leaf } from 'lucide-react';

const VisionCard = ({ title, description, icon: Icon }) => (
    <div className="custom-bg-secondary rounded-lg shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-2xl hover:transform hover:scale-[1.02]">
        <div className="p-8">
            <div className="w-12 h-12 rounded-lg custom-bg-accent flex items-center justify-center mb-6">
                <Icon className="w-6 h-6 custom-text-accent" strokeWidth={1.5} />
            </div>
            
            <h3 className="text-xl eb-garamond font-bold custom-text-primary mb-4">{title}</h3>
            
            <p className="text-sm custom-text-secondary leading-relaxed outfit">{description}</p>
        </div>
        
        {/* Decorative bottom line */}
        <div className="h-1 bg-gradient-to-r from-[var(--text-accent)] to-amber-700"></div>
    </div>
);

const Vision = () => {
    const visionGoals = [
        {
            title: "Advanced Research Methods",
            description: "Developing cutting-edge methodologies that combine traditional research approaches with modern technological capabilities to uncover and preserve artifacts with unprecedented precision and care.",
            icon: Lightbulb
        },
        {
            title: "Data-Driven Insights",
            description: "Leveraging big data analytics and machine learning to extract meaningful patterns and predictions from complex datasets, allowing us to better understand the context and significance of historical discoveries.",
            icon: Database
        },
        {
            title: "Collaborative Innovation",
            description: "Building a global network of researchers and institutions to facilitate knowledge sharing and breakthrough discoveries, ensuring that diverse perspectives contribute to our understanding of historical artifacts.",
            icon: Users
        },
        {
            title: "Sustainable Impact",
            description: "Creating lasting positive change through responsible research practices and environmentally conscious methodologies that protect both the artifacts we study and the world in which we live.",
            icon: Leaf
        }
    ];

    return (
        <section className="py-16 custom-bg-primary">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="w-16 h-1 custom-bg-accent mb-4 mx-auto"></div>
                <h2 className="text-3xl md:text-4xl eb-garamond font-bold text-center custom-text-primary mb-6">
                    Our Vision
                </h2>
                <p className="text-center custom-text-secondary outfit mb-12 max-w-3xl mx-auto">
                    We are dedicated to preserving history through innovation and research excellence,
                    bringing the past to life while protecting it for future generations.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {visionGoals.map((goal, index) => (
                        <VisionCard key={index} {...goal} />
                    ))}
                </div>
                
                {/* Decorative bottom element */}
                <div className="flex justify-center mt-16">
                    <div className="w-24 h-1 bg-gradient-to-r from-[var(--text-accent)] via-amber-700 to-teal-600 rounded-full"></div>
                </div>
            </div>
        </section>
    );
};

export default Vision;