import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Sparkles, ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react';
import api from '../api/client';
import { formatNZD, formatDate } from '../utils/helpers';

const Specials = () => {
    const [specials, setSpecials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetchActiveSpecials();
    }, []);

    // Auto-rotate specials every 6 seconds
    useEffect(() => {
        if (specials.length > 1) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % specials.length);
            }, 6000);
            return () => clearInterval(interval);
        }
    }, [specials]);

    const fetchActiveSpecials = async () => {
        try {
            const response = await api.get('/specials/active');
            if (response.data.success && response.data.data.length > 0) {
                setSpecials(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching specials:', error);
        } finally {
            setLoading(false);
        }
    };

    const nextSpecial = () => {
        setCurrentIndex((prev) => (prev + 1) % specials.length);
    };

    const prevSpecial = () => {
        setCurrentIndex((prev) => (prev - 1 + specials.length) % specials.length);
    };

    return (
        <>
            <Helmet>
                <title>Daily Specials - Star and Garter Oamaru</title>
                <meta
                    name="description"
                    content="Check out our daily specials featuring seasonal dishes and chef's recommendations  at Star and Garter Oamaru."
                />
            </Helmet>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-purple-600 to-purple-500 text-white py-16">
                <div className="section-container text-center">
                    <div className="flex justify-center mb-4">
                        <Sparkles size={48} />
                    </div>
                    <h1 className="text-5xl font-serif font-bold mb-4">Daily Specials</h1>
                    <p className="text-xl text-purple-50 max-w-2xl mx-auto">
                        Fresh seasonal dishes crafted daily by our chefs
                    </p>
                </div>
            </section>

            {/* Specials Carousel */}
            <section className="section-container">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
                    </div>
                ) : specials.length === 0 ? (
                    // Default message when no specials
                    <div className="max-w-3xl mx-auto">
                        <div className="card p-12 text-center">
                            <Sparkles className="mx-auto mb-6 text-gray-300" size={64} />
                            <h2 className="text-3xl font-serif font-bold mb-4 text-gray-700">
                                No Daily Specials Today
                            </h2>
                            <p className="text-gray-600 text-lg mb-6">
                                We don't have any special dishes available at the moment.
                                Please check back soon or explore our regular menu for delicious options!
                            </p>
                            <a
                                href="/menu"
                                className="btn-primary inline-block"
                            >
                                View Our Menu
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto">
                        {/* Navigation Arrows */}
                        {specials.length > 1 && (
                            <div className="flex justify-between items-center mb-4">
                                <button
                                    onClick={prevSpecial}
                                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                    aria-label="Previous special"
                                >
                                    <ChevronLeft size={32} className="text-gray-600" />
                                </button>
                                <p className="text-gray-600 font-medium">
                                    {currentIndex + 1} of {specials.length}
                                </p>
                                <button
                                    onClick={nextSpecial}
                                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                    aria-label="Next special"
                                >
                                    <ChevronRight size={32} className="text-gray-600" />
                                </button>
                            </div>
                        )}

                        {/* Current Special */}
                        <div className="card overflow-hidden animate-fade-in" key={currentIndex}>
                            {specials[currentIndex]?.imageUrl && (
                                <img
                                    src={specials[currentIndex].imageUrl}
                                    alt={specials[currentIndex].title}
                                    className="w-full h-96 object-cover"
                                />
                            )}

                            <div className="p-8">
                                <h2 className="text-4xl font-serif font-bold mb-4 text-gray-900">
                                    {specials[currentIndex]?.title}
                                </h2>

                                {specials[currentIndex]?.description && (
                                    <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                                        {specials[currentIndex].description}
                                    </p>
                                )}

                                {/* Price */}
                                {specials[currentIndex]?.price && (
                                    <div className="mb-6">
                                        {specials[currentIndex].discount > 0 ? (
                                            <div className="flex items-center gap-3">
                                                <span className="text-gray-400 line-through text-xl">
                                                    {formatNZD(specials[currentIndex].price)}
                                                </span>
                                                <span className="text-4xl font-bold text-primary-600">
                                                    {formatNZD(specials[currentIndex].discountedPrice)}
                                                </span>
                                                <span className="badge badge-discount">
                                                    {specials[currentIndex].discount}% OFF
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-4xl font-bold text-primary-600">
                                                {formatNZD(specials[currentIndex].price)}
                                            </span>
                                        )}
                                    </div>
                                )}

                                {/* Schedule Info */}
                                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={18} />
                                        <span>
                                            Active until {formatDate(specials[currentIndex]?.endDate)}
                                        </span>
                                    </div>
                                    {specials[currentIndex]?.startTime && (
                                        <div className="flex items-center gap-2">
                                            <Clock size={18} />
                                            <span>From {specials[currentIndex].startTime}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Tags */}
                                {specials[currentIndex]?.tags && specials[currentIndex].tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {specials[currentIndex].tags.map((tag, idx) => (
                                            <span key={idx} className="badge bg-purple-100 text-purple-800">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Dots Indicator */}
                        {specials.length > 1 && (
                            <div className="flex justify-center gap-2 mt-6">
                                {specials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                                ? 'bg-primary-600 w-8'
                                                : 'bg-gray-300 hover:bg-gray-400'
                                            }`}
                                        aria-label={`View special ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </section>
        </>
    );
};

export default Specials;
