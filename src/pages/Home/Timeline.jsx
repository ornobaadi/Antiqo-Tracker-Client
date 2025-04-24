import { BrainCircuit, Globe, Pencil, TvMinimal, Lightbulb } from 'lucide-react';

const TimelineEvent = ({ index, title, description, icon: Icon }) => (
    <div className="group relative flex gap-6 items-start mb-12 last:mb-0">
        {/* Icon Container */}
        <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
                <Icon className="w-6 h-6 text-amber-600 dark:text-amber-400" strokeWidth={1.5} />
            </div>
            {/* Number */}
            <span className="absolute -top-1 -right-1 text-xs text-slate-500 dark:text-slate-400 outfit">
                {index}
            </span>
        </div>

        {/* Content */}
        <div className="flex-1 pt-1.5">
            <h3 className="text-lg font-medium text-slate-800 dark:text-amber-50 mb-2 eb-garamond">
                {title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed outfit">
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
        <section className="py-16 bg-slate-50 dark:bg-slate-900">
            <div className="container max-w-3xl mx-auto px-6">
                <div className="space-y-2 mb-16 text-center">
                    <div className="w-16 h-1 bg-amber-500 dark:bg-amber-400 mb-4 mx-auto"></div>
                    <h2 className="text-3xl md:text-4xl font-medium text-slate-800 dark:text-amber-50 eb-garamond">
                        Our Journey
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 outfit">
                        Timeline of our key milestones and achievements
                    </p>
                </div>

                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute top-0 left-6 w-px h-full bg-amber-200 dark:bg-amber-800/50 transform -translate-x-1/2" />
                    
                    {/* Timeline events */}
                    <div className="relative">
                        {timelineEvents.map((event, index) => (
                            <TimelineEvent
                                key={event.title}
                                index={index + 1}
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