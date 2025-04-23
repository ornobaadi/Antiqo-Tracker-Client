import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Banner = () => {
    const slides = [
        {
            image: "/slide1.jpg",
            title: "Unlock the Secrets of the Past",
            subtitle: "Discover the fascinating stories behind humanity's greatest historical treasures.",
        },
        {
            image: "/slide2.jpg",
            title: "Your Gateway to Ancient Wonders",
            subtitle: "Explore artifacts like the Rosetta Stone and Antikythera Mechanism—masterpieces of history.",
        },
        {
            image: "/slide3.jpg",
            title: "Contribute to History",
            subtitle: "Add your discoveries, share insights, and become part of preserving human heritage.",
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);
    const minimumSwipeDistance = 50;

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;

        const swipeDistance = touchEndX.current - touchStartX.current;

        if (Math.abs(swipeDistance) > minimumSwipeDistance) {
            if (swipeDistance > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }

        // Reset values
        touchStartX.current = null;
        touchEndX.current = null;
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div 
            className="relative w-full h-[60vh] md:h-[85vh] overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Decorative border - changes color based on theme */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-700 via-amber-500 to-teal-600 dark:from-amber-600 dark:via-amber-400 dark:to-teal-500 z-10"></div>
            
            {/* Slides */}
            <div className="relative h-full">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-1000 ease-in-out transform
                            ${index === currentSlide ? "opacity-100 translate-x-0" : 
                            index < currentSlide ? "opacity-0 -translate-x-full" : 
                            "opacity-0 translate-x-full"}`}
                    >
                        {/* Background Image with Gradient Overlay - overlay changes based on theme */}
                        <div 
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${slide.image})`,
                            }}
                        >
                            {/* Light mode overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/70 to-slate-900/90 dark:from-black/70 dark:via-black/80 dark:to-black/95" />
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute inset-0 bg-[url('/pattern-overlay.png')] opacity-10"></div>
                        
                        {/* Content */}
                        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 md:px-8 max-w-6xl mx-auto">
                            <div className="flex flex-col items-center space-y-6">
                                <div className="w-16 h-1 bg-amber-500 dark:bg-amber-400 mb-2 md:mb-0"></div>
                                <h1 className="text-3xl md:text-6xl eb-garamond font-bold mb-3 md:mb-6 text-amber-50 leading-tight">
                                    {slide.title}
                                </h1>
                                <p className="text-base md:text-xl text-amber-100/90 dark:text-amber-50/90 mb-8 md:mb-10 max-w-2xl font-light">
                                    {slide.subtitle}
                                </p>
                                <Link
                                    to="/allartifacts"
                                    className="px-8 py-3 bg-gradient-to-r from-amber-700 to-amber-600 dark:from-amber-600 dark:to-amber-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:from-amber-600 hover:to-amber-500 dark:hover:from-amber-500 dark:hover:to-amber-400 uppercase tracking-wide text-sm"
                                >
                                    Explore Collection
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                            currentSlide === index 
                                ? 'bg-amber-500 dark:bg-amber-400 w-10' 
                                : 'bg-white/30 w-2 hover:bg-white/60'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Navigation Arrows - Hidden on Mobile */}
            <div className="hidden md:block">
                <button
                    className="absolute top-1/2 left-6 transform -translate-y-1/2 p-3 rounded-full bg-black/20 hover:bg-amber-800/60 dark:hover:bg-amber-700/70 text-white transition-all duration-300 focus:outline-none border border-white/10 backdrop-blur-sm"
                    onClick={prevSlide}
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                    className="absolute top-1/2 right-6 transform -translate-y-1/2 p-3 rounded-full bg-black/20 hover:bg-amber-800/60 dark:hover:bg-amber-700/70 text-white transition-all duration-300 focus:outline-none border border-white/10 backdrop-blur-sm"
                    onClick={nextSlide}
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
            
            {/* Decorative corner elements */}
            <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-amber-500/40 dark:border-amber-400/30 hidden md:block"></div>
            <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-amber-500/40 dark:border-amber-400/30 hidden md:block"></div>
        </div>
    );
};

export default Banner;