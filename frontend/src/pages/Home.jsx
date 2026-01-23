import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Calendar, Clock, Star, Users, Heart, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/client';
import { useLanguage } from '../context/LanguageContext';
import FeaturedProducts from '../components/FeaturedProducts';


const CUSTOMER_REVIEWS = [
    { name: "Lucia d'Aubarede", rating: 5, text: "The menu deals were very good value but the algae salad was a bit tough." },
    { name: "dkl", rating: 5, text: "This is a warm and quiet place with good veganized sushi and very nice music." },
    { name: "Miguel Farias", rating: 5, text: "High quality sushi and one of the few places in Gijón with great vegan options." },
    { name: "Sabores escondidos", rating: 5, text: "Unfortunately the dishes did not live up to expectations despite the restaurant's very good reputation." },
    { name: "miguel cotrina", rating: 5, text: "This place deserves a review because the delicious sushi uses the highest quality fresh ingredients." },
    { name: "Isabel Aramburu Valle", rating: 5, text: "This is my favorite sushi in Gijón because every exquisite bite tastes just like butter." },
    { name: "Yeraldinne", rating: 5, text: "The portions are just right and the food presentation is truly incredible and photo worthy." },
    { name: "Laura", rating: 5, text: "The atmosphere is comfortable and the waitress was very helpful while offering her lovely recommendations." },
    { name: "tanya san millan", rating: 5, text: "The butterfish tartar is delicious and the salmon geishas are highly recommended for every visitor." },
    { name: "Señorita Valle", rating: 5, text: "The restaurant is small but there is plenty of space between the well placed tables." },
    { name: "Piti Melchor", rating: 5, text: "Every dish has a special unique touch at the best sushi restaurant I have tried." },
    { name: "Zareth Rivera", rating: 5, text: "Excellent quality food and delicious desserts make this a highly recommended place for varied sushi." },
    { name: "Mónica C. Suárez", rating: 5, text: "They have a generous daily menu and the staff adapted our sushi for food allergies." },
    { name: "Nuria", rating: 5, text: "We found this cozy place by chance and it was our best Japanese food experience." },
    { name: "Masa Fritadepollo", rating: 5, text: "The price was fair for the quality and I especially recommend trying the bao buns." },
    { name: "Nagore", rating: 5, text: "We were absolutely blown away by the original high quality sushi and the exquisite tartare." },
    { name: "Juan Pablo Cifuentes", rating: 5, text: "The staff was very friendly and the service was impeccable for our group of four." },
    { name: "ivan machado", rating: 5, text: "I did not expect such high quality food and the carrot cake had delicious cinnamon." },
    { name: "Lorelai Seaborn", rating: 5, text: "This cozy place has very friendly staff and offers great value for the tasty food." },
    { name: "Ene RJ", rating: 5, text: "The service from the ladies was unbeatable and the breaded salmon sushi was excellent quality." },
    { name: "Raquel B.A", rating: 5, text: "They prepared a successful sushi table for our wedding guests with such great professional care." },
    { name: "Ana Seitz González", rating: 5, text: "We liked the butterfish tartar and the premium combo although some dishes took long preparation." },
    { name: "Zenaida Tasis", rating: 5, text: "The dishes have spectacular presentation and the quality price ratio is truly incredible for everyone." },
    { name: "Rocío Álvarez Prieto", rating: 5, text: "Three of us left very full after eating the delicious and unique butterfish tartar dish." },
    { name: "Hugo Huerta", rating: 5, text: "This is rightfully one of the top three sushi restaurants in the entire Asturias region." },
    { name: "Belén Collado", rating: 5, text: "Everything was delicious and the excellent service makes this a wonderful place to eat sushi." }
];

const Home = () => {
    const { t } = useLanguage();
    const [specials, setSpecials] = useState([]);
    const [currentSpecialIndex, setCurrentSpecialIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

    // Auto-rotate reviews
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentReviewIndex((prev) => (prev + 1) % CUSTOMER_REVIEWS.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const nextReview = () => {
        setCurrentReviewIndex((prev) => (prev + 1) % CUSTOMER_REVIEWS.length);
    };

    const prevReview = () => {
        setCurrentReviewIndex((prev) => (prev - 1 + CUSTOMER_REVIEWS.length) % CUSTOMER_REVIEWS.length);
    };

    const getVisibleReviews = () => {
        const reviews = [];
        for (let i = 0; i < 4; i++) {
            const index = (currentReviewIndex + i) % CUSTOMER_REVIEWS.length;
            reviews.push({ ...CUSTOMER_REVIEWS[index], id: index });
        }
        return reviews;
    };

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
                <title>Oslo Sushi - Authentic Japanese Restaurant in Gijón</title>
                <meta
                    name="description"
                    content="Experience exceptional Japanese dining at Oslo Sushi Gijón. Authentic sushi, fresh ingredients, and a warm atmosphere. Order online or book a table."
                />
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
                        {t('heroTitle')}
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90 animate-slide-up drop-shadow-md">
                        {t('heroSubtitle')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
                        <Link to="/booking" className="btn-primary bg-white text-primary-600 hover:bg-gray-100 shadow-lg">
                            {t('booking')}
                        </Link>
                        <Link to="/order-online" className="btn-primary bg-primary-600 text-white border-none hover:bg-primary-700 shadow-lg">
                            {t('orderOnline')}
                        </Link>
                        <Link to="/menu" className="btn-outline border-white text-white hover:bg-white/10 shadow-lg">
                            {t('viewMenu')}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <FeaturedProducts />

            {/* Customer Reviews Section */}
            <section className="section-container overflow-hidden">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-serif font-bold mb-4">{t('whatOurCustomersSay')}</h2>
                    <p className="text-gray-600 text-lg">{t('customerReviewsSubtitle')}</p>
                </div>

                <div className="max-w-7xl mx-auto">
                    <div className="relative min-h-[280px] md:h-[280px]">
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={currentReviewIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                            >
                                {getVisibleReviews().map((review, index) => (
                                    <div
                                        key={review.id}
                                        className={`card p-6 flex flex-col bg-white shadow-md hover:shadow-lg transition-shadow ${index > 0 ? 'hidden md:flex' : ''
                                            } ${index > 1 ? 'lg:flex' : ''}`}
                                    >
                                        <div className="flex items-center mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={18} className="text-yellow-400" fill="currentColor" />
                                            ))}
                                        </div>
                                        <p className="text-gray-700 mb-4 italic text-sm flex-grow line-clamp-4">
                                            "{review.text}"
                                        </p>
                                        <div>
                                            <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
                                            <p className="text-xs text-gray-500">{t('verifiedCustomer')}</p>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex flex-col items-center gap-6 mt-8">
                        <div className="flex gap-4">
                            <button
                                onClick={prevReview}
                                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shadow-sm"
                                aria-label="Previous reviews"
                            >
                                <ChevronLeft size={24} className="text-gray-700" />
                            </button>
                            <button
                                onClick={nextReview}
                                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shadow-sm"
                                aria-label="Next reviews"
                            >
                                <ChevronRight size={24} className="text-gray-700" />
                            </button>
                        </div>
                        <Link to="/contact" className="btn-outline inline-block">
                            {t('leaveReview')}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Daily Special Section */}
            {!loading && specials.length > 0 && (
                <section className="section-container">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-serif font-bold mb-4">{t('todaysSpecial')}</h2>
                        <p className="text-gray-600 text-lg">{t('todaysSpecialSubtitle')}</p>
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
            <section className="bg-gray-100 py-4">
                <div className="section-container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="text-primary-600" size={32} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{t('lgbtqFriendly')}</h3>
                            <p className="text-gray-600">{t('inclusive')}</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Star className="text-primary-600" size={32} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{t('topRated')}</h3>
                            <p className="text-gray-600">{t('topRatedSubtitle')}</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="text-primary-600" size={32} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{t('easyBooking')}</h3>
                            <p className="text-gray-600">{t('easyBookingSubtitle')}</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ShoppingBag className="text-primary-600" size={32} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{t('orderOnline')}</h3>
                            <p className="text-gray-600">{t('orderOnlineSubtitle')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Us Section */}
            <section className="section-container py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <img
                            src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1470&auto=format&fit=crop"
                            alt="Fresh Sushi Platter"
                            className="rounded-lg shadow-xl w-full h-[500px] object-cover hover:scale-[1.02] transition-transform duration-300"
                        />
                    </div>
                    <div className="order-1 md:order-2">
                        <h2 className="text-4xl font-serif font-bold mb-6 text-gray-900">{t('whyUs')}</h2>
                        <h3 className="text-2xl text-primary-600 font-semibold mb-6">{t('sushiArtExperience')}</h3>

                        <div className="space-y-6 text-gray-600 text-lg">
                            <p>
                                {t('whyUsP1')}
                            </p>
                            <p>
                                {t('whyUsP2')}
                            </p>
                            <p>
                                {t('whyUsP3')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-container text-center">
                <h2 className="text-4xl font-serif font-bold mb-6">{t('readyToDine')}</h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    {t('bookTableToday')}
                </p>
                <Link to="/booking" className="btn-primary inline-block">
                    {t('reserveYourTable')}
                </Link>
            </section>
        </>
    );
};

export default Home;
