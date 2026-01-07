import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { MapPin, Phone, Mail, Star } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../api/client';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
    const { t } = useLanguage();
    const [reviewForm, setReviewForm] = useState({
        name: '',
        email: '',
        rating: 5,
        comment: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [hoveredStar, setHoveredStar] = useState(0);

    const handleChange = (e) => {
        setReviewForm({
            ...reviewForm,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await api.post('/reviews', reviewForm);

            if (response.data.success) {
                toast.success('Thank you for your review! It has been submitted successfully.'); // Toast messages can be added to translations later if needed
                // Reset form
                setReviewForm({
                    name: '',
                    email: '',
                    rating: 5,
                    comment: ''
                });
            }
        } catch (error) {
            console.error('Review submission error:', error);
            toast.error(error.response?.data?.message || 'Failed to submit review. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>{t('contactUs')} - Oslo Sushi Gijón</title>
                <meta
                    name="description"
                    content="Contact Restaurante Japonés Oslo Sushi. Visit us at C. Evaristo Valle, 4, Gijón or call us for reservations and inquiries."
                />
            </Helmet>

            <div className="section-container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-3xl font-serif font-bold mb-8">{t('getInTouch')}</h2>

                        <div className="space-y-6 mb-12">
                            <div className="card p-6">
                                <div className="flex items-start space-x-4">
                                    <MapPin className="text-primary-600 flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">{t('address')}</h3>
                                        <p className="text-gray-600">
                                            C. Evaristo Valle, 4<br />
                                            33202 Gijón, Asturias, Spain
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="card p-6">
                                <div className="flex items-start space-x-4">
                                    <Phone className="text-primary-600 flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">{t('phone')}</h3>
                                        <p className="text-gray-600">+34 672 59 96 63</p>
                                        <p className="text-sm text-gray-500 mt-1">Call for reservations</p>
                                    </div>
                                </div>
                            </div>

                            <div className="card p-6">
                                <div className="flex items-start space-x-4">
                                    <Mail className="text-primary-600 flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">{t('email')}</h3>
                                        <p className="text-gray-600">info@esrest.es</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Opening Hours */}
                        <div className="card p-6">
                            <h3 className="text-2xl font-semibold mb-4">{t('openingHours')}</h3>
                            <div className="space-y-2 text-gray-700">
                                <div className="flex justify-between">
                                    <span>{t('mondaySunday')}</span>
                                    <span className="font-medium">{t('opensAt')} - Close</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-500 italic">Epiphany might affect these hours</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Review Form */}
                    <div>
                        <h2 className="text-3xl font-serif font-bold mb-8">{t('leaveReview')}</h2>

                        <div className="card p-8">
                            <p className="text-gray-600 mb-6">
                                Share your experience with us! Your feedback helps us serve you better.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('yourName')} *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={reviewForm.name}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                        placeholder="John Doe"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('yourEmail')} (Optional)
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={reviewForm.email}
                                        onChange={handleChange}
                                        className="input-field"
                                        placeholder="john.doe@example.com"
                                    />
                                </div>

                                {/* Rating */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Your Rating *
                                    </label>
                                    <div className="flex items-center space-x-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                                                onMouseEnter={() => setHoveredStar(star)}
                                                onMouseLeave={() => setHoveredStar(0)}
                                                className="focus:outline-none transition-transform hover:scale-110"
                                            >
                                                <Star
                                                    size={32}
                                                    className={
                                                        star <= (hoveredStar || reviewForm.rating)
                                                            ? 'text-yellow-400'
                                                            : 'text-gray-300'
                                                    }
                                                    fill={
                                                        star <= (hoveredStar || reviewForm.rating)
                                                            ? 'currentColor'
                                                            : 'none'
                                                    }
                                                />
                                            </button>
                                        ))}
                                        <span className="ml-2 text-gray-600 font-medium">
                                            {reviewForm.rating} star{reviewForm.rating !== 1 ? 's' : ''}
                                        </span>
                                    </div>
                                </div>

                                {/* Comment */}
                                <div>
                                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                                        Your Review
                                    </label>
                                    <textarea
                                        id="comment"
                                        name="comment"
                                        value={reviewForm.comment}
                                        onChange={handleChange}
                                        rows="5"
                                        className="input-field resize-none"
                                        placeholder="Tell us about your experience..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full btn-primary flex items-center justify-center gap-2"
                                >
                                    {submitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            <span>Submitting...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Star size={20} />
                                            <span>{t('submit')}</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Map */}
                <div className="mt-12">
                    <h2 className="text-3xl font-serif font-bold mb-8 text-center">{t('location')}</h2>
                    <div className="card overflow-hidden">
                        <iframe
                            src="https://maps.google.com/maps?q=C.+Evaristo+Valle,+4,+33202+Gijón&z=15&output=embed"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Oslo Sushi Location"
                        ></iframe>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
