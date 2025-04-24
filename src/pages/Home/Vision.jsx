import { Lightbulb, Database, Users, Leaf } from 'lucide-react';

const VisionCard = ({ title, description, icon: Icon }) => (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-2xl hover:transform hover:scale-[1.02]">
        <div className="p-8">
            <div className="w-12 h-12 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center mb-6">
                <Icon className="w-6 h-6 text-amber-600 dark:text-amber-400" strokeWidth={1.5} />
            </div>
            
            <h3 className="text-xl eb-garamond font-bold text-slate-800 dark:text-amber-50 mb-4">{title}</h3>
            
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed outfit">{description}</p>
        </div>
        
        {/* Decorative bottom line */}
        <div className="h-1 bg-gradient-to-r from-amber-500 to-amber-300 dark:from-amber-600 dark:to-amber-400"></div>
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
        <section className="py-16 bg-slate-50 dark:bg-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="w-16 h-1 bg-amber-500 dark:bg-amber-400 mb-4 mx-auto"></div>
                <h2 className="text-3xl md:text-4xl eb-garamond font-bold text-center text-slate-800 dark:text-amber-50 mb-6">
                    Our Vision
                </h2>
                <p className="text-center text-slate-600 dark:text-slate-300 outfit mb-12 max-w-3xl mx-auto">
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
                    <div className="w-24 h-1 bg-gradient-to-r from-amber-700 via-amber-500 to-teal-600 dark:from-amber-600 dark:via-amber-400 dark:to-teal-500 rounded-full"></div>
                </div>
            </div>
        </section>
    );
};

export default Vision;