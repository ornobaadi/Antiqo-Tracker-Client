import { BrainCircuit, Globe, Pencil, TvMinimal, Lightbulb } from 'lucide-react';

const TimelineEvent = ({ index, title, description, icon: Icon }) => (
    <div className="group relative flex gap-6 items-start mb-12 last:mb-0">
        {/* Icon Container */}
        <div className="relative">
            <div className="w-12 h-12 rounded-xl custom-bg-accent flex items-center justify-center">
                <Icon className="w-6 h-6 custom-text-accent" strokeWidth={1.5} />
            </div>
            {/* Number */}
            <span className="absolute -top-1 -right-1 text-xs custom-text-secondary outfit">
                {index}
            </span>
        </div>

        {/* Content */}
        <div className="flex-1 pt-1.5">
            <h3 className="text-lg font-medium custom-text-primary mb-2 eb-garamond">
                {title}
            </h3>
            <p className="text-sm custom-text-secondary leading-relaxed outfit">
                {description}
            </p>
        </div>
    </div>
);

const Timeline = () => {
    const timelineEvents = [
        {
            title: "Project Inception",
            description: "Initial conceptualization and foundation of our research methodologies and digital frameworks.",
            icon: Pencil
        },
        {
            title: "Digital Transformation",
            description: "Adaptation to remote collaboration and development of innovative virtual research platforms.",
            icon: TvMinimal
        },
        {
            title: "Global Expansion",
            description: "Establishment of international partnerships and deployment of advanced research tools.",
            icon: Globe
        },
        {
            title: "AI Integration",
            description: "Implementation of machine learning algorithms to enhance data analysis and prediction models.",
            icon: BrainCircuit
        },
        {
            title: "Breakthrough Innovations",
            description: "Major developments in our core technologies and methodologies, setting new industry standards.",
            icon: Lightbulb
        }
    ];

    return (
        <section className="py-16 custom-bg-primary">
            <div className="container max-w-3xl mx-auto px-6">
                <div className="space-y-2 mb-16 text-center">
                    <div className="w-16 h-1 custom-bg-accent mb-4 mx-auto"></div>
                    <h2 className="text-3xl md:text-4xl font-medium custom-text-primary eb-garamond">
                        Our Journey
                    </h2>
                    <p className="custom-text-secondary outfit">
                        Timeline of our key milestones and achievements
                    </p>
                </div>

                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute top-0 left-6 w-px h-full bg-[var(--bg-accent)]/50 transform -translate-x-1/2" />
                    
                    {/* Timeline events */}
                    <div className="relative">
                        {timelineEvents.map((event) => (
                            <TimelineEvent
                                key={event.title}
                                {...event}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Timeline;