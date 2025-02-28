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
            className="relative w-full h-[50vh] md:h-[80vh] overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Slides */}
            <div className="relative h-full">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-700 transform
                            ${index === currentSlide ? "opacity-100 translate-x-0" : 
                            index < currentSlide ? "opacity-0 -translate-x-full" : 
                            "opacity-0 translate-x-full"}`}
                    >
                        {/* Background Image with Gradient Overlay */}
                        <div 
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${slide.image})`,
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
                        </div>

                        {/* Content */}
                        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 md:px-8 max-w-6xl mx-auto">
                            <h1 className="text-2xl md:text-5xl font-bold mb-3 md:mb-4 text-white">
                                {slide.title}
                            </h1>
                            <p className="text-sm md:text-xl text-gray-200 mb-6 md:mb-8 max-w-2xl">
                                {slide.subtitle}
                            </p>
                            <Link
                                to="/allartifacts"
                                className="btn btn-neutral"
                            >
                                Explore More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 
                            ${currentSlide === index ? 
                            'bg-white w-6' : 
                            'bg-white/50 hover:bg-white/75'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Navigation Arrows - Hidden on Mobile */}
            <div className="hidden md:block">
                <button
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all focus:outline-none"
                    onClick={prevSlide}
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all focus:outline-none"
                    onClick={nextSlide}
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default Banner;