import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Calendar, Clock, Star, Users } from 'lucide-react';
import api from '../api/client';

const Home = () => {
    const [specials, setSpecials] = useState([]);
    const [currentSpecialIndex, setCurrentSpecialIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchActiveSpecials();
    }, []);

    // Auto-rotate specials every 5 seconds
    useEffect(() => {
        if (specials.length > 1) {
            const interval = setInterval(() => {
                setCurrentSpecialIndex((prev) => (prev + 1) % specials.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [specials]);

    const fetchActiveSpecials = async () => {
        try {
            const response = await api.get('/specials/active');
            setSpecials(response.data.data || []);
        } catch (error) {
            console.error('Error fetching specials:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Star and Garter Oamaru - Fine Dining Restaurant in Oamaru, NZ</title>
                <meta
                    name="description"
                    content="Experience exceptional fine dining at Star and Garter Oamaru. Explore our seasonal menu, daily specials, and book your table today."
                />
                <meta property="og:title" content="Star and Garter Oamaru - Fine Dining Restaurant" />
                <meta
                    property="og:description"
                    content="Experience exceptional fine dining in Oamaru, New Zealand."
                />
                <meta property="og:type" content="restaurant" />
            </Helmet>

            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center justify-center text-white py-20 md:py-32 overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/hero.png"
                        alt="Star & Garter Restaurant"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>

                <div className="section-container relative z-10 text-center">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 animate-fade-in drop-shadow-lg">
                        Welcome to Star & Garter
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90 animate-slide-up drop-shadow-md">
                        Fine dining in the heart of Oamaru, New Zealand
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
                        <Link to="/booking" className="btn-primary bg-white text-primary-600 hover:bg-gray-100 shadow-lg">
                            Book a Table
                        </Link>
                        <Link to="/menu" className="btn-outline border-white text-white hover:bg-white/10 shadow-lg">
                            View Menu
                        </Link>
                    </div>
                </div>
            </section>

            {/* Customer Reviews Section */}
            <section className="section-container">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-serif font-bold mb-4">What Our Customers Say</h2>
                    <p className="text-gray-600 text-lg">Hear from those who've experienced our hospitality</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Review 1 */}
                    <div className="card p-6">
                        <div className="flex items-center mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={18} className="text-yellow-400" fill="currentColor" />
                            ))}
                        </div>
                        <p className="text-gray-700 mb-4 italic text-sm">
                            "Absolutely amazing experience! The Blue Cod was perfectly cooked and the service was impeccable."
                        </p>
                        <p className="font-semibold text-gray-900 text-sm">Sarah Mitchell</p>
                        <p className="text-xs text-gray-500">December 2025</p>
                    </div>

                    {/* Review 2 */}
                    <div className="card p-6">
                        <div className="flex items-center mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={18} className="text-yellow-400" fill="currentColor" />
                            ))}
                        </div>
                        <p className="text-gray-700 mb-4 italic text-sm">
                            "The Ribeye Steak was cooked to perfection! Beautiful atmosphere and wonderful staff."
                        </p>
                        <p className="font-semibold text-gray-900 text-sm">James Peterson</p>
                        <p className="text-xs text-gray-500">December 2025</p>
                    </div>

                    {/* Review 3 */}
                    <div className="card p-6">
                        <div className="flex items-center mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={18} className="text-yellow-400" fill="currentColor" />
                            ))}
                        </div>
                        <p className="text-gray-700 mb-4 italic text-sm">
                            "Our family had a lovely evening here. The kids menu is great and the adults menu is phenomenal!"
                        </p>
                        <p className="font-semibold text-gray-900 text-sm">Emma Thompson</p>
                        <p className="text-xs text-gray-500">November 2025</p>
                    </div>

                    {/* Review 4 */}
                    <div className="card p-6">
                        <div className="flex items-center mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={18} className="text-yellow-400" fill="currentColor" />
                            ))}
                        </div>
                        <p className="text-gray-700 mb-4 italic text-sm">
                            "The Lamb Shank was incredible! Tender, flavorful, and beautifully presented."
                        </p>
                        <p className="font-semibold text-gray-900 text-sm">Michael Chen</p>
                        <p className="text-xs text-gray-500">November 2025</p>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <Link to="/contact" className="btn-outline inline-block">
                        Leave a Review
                    </Link>
                </div>
            </section>

            {/* Daily Special Section */}
            {!loading && specials.length > 0 && (
                <section className="section-container">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-serif font-bold mb-4">Today's Special</h2>
                        <p className="text-gray-600 text-lg">Fresh seasonal dishes crafted daily</p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="card p-8 animate-fade-in">
                            {specials[currentSpecialIndex]?.imageUrl && (
                                <img
                                    src={specials[currentSpecialIndex].imageUrl}
                                    alt={specials[currentSpecialIndex].title}
                                    className="w-full h-64 object-cover rounded-lg mb-6"
                                />
                            )}
                            <h3 className="text-3xl font-serif font-bold mb-4">
                                {specials[currentSpecialIndex]?.title}
                            </h3>
                            <p className="text-gray-700 mb-6">{specials[currentSpecialIndex]?.description}</p>

                            {specials.length > 1 && (
                                <div className="flex justify-center space-x-2 mt-6">
                                    {specials.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentSpecialIndex(index)}
                                            className={`w-3 h-3 rounded-full transition-colors ${index === currentSpecialIndex ? 'bg-primary-600' : 'bg-gray-300'
                                                }`}
                                            aria-label={`View special ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Features Section */}
            <section className="bg-gray-100 py-16">
                <div className="section-container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Calendar className="text-primary-600" size={32} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Daily Specials</h3>
                            <p className="text-gray-600">Fresh seasonal dishes every day</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Star className="text-primary-600" size={32} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Local Favorites</h3>
                            <p className="text-gray-600">Featuring Oamaru's best dishes</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="text-primary-600" size={32} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
                            <p className="text-gray-600">Reserve your table online</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock className="text-primary-600" size={32} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Flexible Hours</h3>
                            <p className="text-gray-600">Open Tue-Sat evenings</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-container text-center">
                <h2 className="text-4xl font-serif font-bold mb-6">Ready to Dine With Us?</h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Book your table today and experience the finest dining in Oamaru
                </p>
                <Link to="/booking" className="btn-primary inline-block">
                    Reserve Your Table
                </Link>
            </section>
        </>
    );
};

export default Home;
