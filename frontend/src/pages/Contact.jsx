import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { MapPin, Phone, Mail, Star } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../api/client';

const Contact = () => {
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
                toast.success('Thank you for your review! It has been submitted successfully.');
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
                <title>Contact Us - Star and Garter Oamaru</title>
                <meta
                    name="description"
                    content="Contact Star and Garter Oamaru. Visit us at 9 Itchen Street, Oamaru or call us for reservations and inquiries."
                />
            </Helmet>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-16">
                <div className="section-container text-center">
                    <h1 className="text-5xl font-serif font-bold mb-4">Contact Us</h1>
                    <p className="text-xl text-blue-50 max-w-2xl mx-auto">
                        We'd love to hear from you
                    </p>
                </div>
            </section>

            <div className="section-container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-3xl font-serif font-bold mb-8">Get in Touch</h2>

                        <div className="space-y-6 mb-12">
                            <div className="card p-6">
                                <div className="flex items-start space-x-4">
                                    <MapPin className="text-primary-600 flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Address</h3>
                                        <p className="text-gray-600">
                                            Ground Floor/9 Itchen Street<br />
                                            Oamaru 9400, New Zealand
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="card p-6">
                                <div className="flex items-start space-x-4">
                                    <Phone className="text-primary-600 flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Phone</h3>
                                        <p className="text-gray-600">+64 3 434 xxxx</p>
                                        <p className="text-sm text-gray-500 mt-1">Call for reservations</p>
                                    </div>
                                </div>
                            </div>

                            <div className="card p-6">
                                <div className="flex items-start space-x-4">
                                    <Mail className="text-primary-600 flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Email</h3>
                                        <p className="text-gray-600">info@starandgarter.co.nz</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Opening Hours */}
                        <div className="card p-6">
                            <h3 className="text-2xl font-semibold mb-4">Opening Hours</h3>
                            <div className="space-y-2 text-gray-700">
                                <div className="flex justify-between">
                                    <span>Tuesday - Thursday</span>
                                    <span className="font-medium">5:30 PM - 9:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Friday - Saturday</span>
                                    <span className="font-medium">5:30 PM - 10:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Sunday - Monday</span>
                                    <span className="text-red-600">Closed</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Review Form */}
                    <div>
                        <h2 className="text-3xl font-serif font-bold mb-8">Leave a Review</h2>

                        <div className="card p-8">
                            <p className="text-gray-600 mb-6">
                                Share your experience with us! Your feedback helps us serve you better.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Your Name *
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
                                        Email (Optional)
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
                                            <span>Submit Review</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Map */}
                <div className="mt-12">
                    <h2 className="text-3xl font-serif font-bold mb-8 text-center">Find Us</h2>
                    <div className="card overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2935.419!2d170.9703!3d-45.0976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDA1JzUxLjQiUyAxNzDCsDU4JzEzLjEiRQ!5e0!3m2!1sen!2snz!4v1234567890"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Star and Garter Oamaru Location"
                        ></iframe>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
