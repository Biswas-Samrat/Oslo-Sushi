import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Calendar, Clock, Users, MessageSquare, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../api/client';

const Booking = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        partySize: 2,
        specialRequests: ''
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post('/bookings', formData);

            if (response.data.success) {
                toast.success('Booking request received! We will contact you soon to confirm.');
                setSubmitted(true);
                // Reset form
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    date: '',
                    time: '',
                    partySize: 2,
                    specialRequests: ''
                });

                // Reset submitted state after 5 seconds
                setTimeout(() => setSubmitted(false), 5000);
            }
        } catch (error) {
            console.error('Booking error:', error);
            toast.error(error.response?.data?.message || 'Failed to submit booking. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Get today's date for min attribute
    const today = new Date().toISOString().split('T')[0];

    return (
        <>
            <Helmet>
                <title>Book a Table - Star and Garter Oamaru</title>
                <meta
                    name="description"
                    content="Reserve your table at Star and Garter Oamaru. Book online for fine dining experience in Oamaru, New Zealand."
                />
            </Helmet>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-green-600 to-green-500 text-white py-16">
                <div className="section-container text-center">
                    <div className="flex justify-center mb-4">
                        <Calendar size={48} />
                    </div>
                    <h1 className="text-5xl font-serif font-bold mb-4">Book a Table</h1>
                    <p className="text-xl text-green-50 max-w-2xl mx-auto">
                        Reserve your spot for an unforgettable dining experience
                    </p>
                </div>
            </section>

            {/* Booking Form */}
            <section className="section-container">
                <div className="max-w-3xl mx-auto">
                    {submitted ? (
                        <div className="card p-12 text-center animate-fade-in">
                            <CheckCircle className="mx-auto mb-6 text-green-500" size={64} />
                            <h2 className="text-3xl font-serif font-bold mb-4 text-gray-900">
                                Thank You!
                            </h2>
                            <p className="text-gray-600 text-lg mb-6">
                                Your booking request has been received. We'll contact you shortly to confirm your reservation.
                            </p>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="btn-primary"
                            >
                                Make Another Booking
                            </button>
                        </div>
                    ) : (
                        <div className="card p-8">
                            <h2 className="text-3xl font-serif font-bold mb-6 text-center">
                                Reserve Your Table
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                        placeholder="John Doe"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                        placeholder="+64 21 123 4567"
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
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="input-field"
                                        placeholder="john.doe@example.com"
                                    />
                                </div>

                                {/* Date & Time */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                            <Calendar size={18} />
                                            Date *
                                        </label>
                                        <input
                                            type="date"
                                            id="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            required
                                            min={today}
                                            className="input-field"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                            <Clock size={18} />
                                            Time *
                                        </label>
                                        <select
                                            id="time"
                                            name="time"
                                            value={formData.time}
                                            onChange={handleChange}
                                            required
                                            className="input-field"
                                        >
                                            <option value="">Select time</option>
                                            <option value="17:00">5:00 PM</option>
                                            <option value="17:30">5:30 PM</option>
                                            <option value="18:00">6:00 PM</option>
                                            <option value="18:30">6:30 PM</option>
                                            <option value="19:00">7:00 PM</option>
                                            <option value="19:30">7:30 PM</option>
                                            <option value="20:00">8:00 PM</option>
                                            <option value="20:30">8:30 PM</option>
                                            <option value="21:00">9:00 PM</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Party Size */}
                                <div>
                                    <label htmlFor="partySize" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                        <Users size={18} />
                                        Number of Guests *
                                    </label>
                                    <select
                                        id="partySize"
                                        name="partySize"
                                        value={formData.partySize}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                    >
                                        {[...Array(20)].map((_, i) => {
                                            const num = i + 1;
                                            return (
                                                <option key={num} value={num}>
                                                    {num} {num === 1 ? 'Guest' : 'Guests'}
                                                </option>
                                            );
                                        })}
                                        <option value="20+">20+ Guests</option>
                                    </select>
                                </div>

                                {/* Special Requests */}
                                <div>
                                    <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                        <MessageSquare size={18} />
                                        Special Requests (Optional)
                                    </label>
                                    <textarea
                                        id="specialRequests"
                                        name="specialRequests"
                                        value={formData.specialRequests}
                                        onChange={handleChange}
                                        rows="4"
                                        className="input-field resize-none"
                                        placeholder="Any dietary requirements, special occasions, or other requests..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full btn-primary flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            <span>Submitting...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Calendar size={20} />
                                            <span>Reserve Table</span>
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Additional Info */}
                            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                                <h3 className="font-semibold text-blue-900 mb-2">📞 Prefer to call?</h3>
                                <p className="text-blue-800 text-sm">
                                    Contact us directly at <strong>+64 3 434 xxxx</strong> for immediate assistance.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Opening Hours */}
                    <div className="mt-12 card p-8">
                        <h3 className="text-2xl font-serif font-bold mb-4 text-center">Opening Hours</h3>
                        <div className="space-y-2 text-center text-gray-700">
                            <p><strong>Tuesday - Thursday:</strong> 5:30 PM - 9:00 PM</p>
                            <p><strong>Friday - Saturday:</strong> 5:30 PM - 10:00 PM</p>
                            <p><strong>Sunday - Monday:</strong> <span className="text-red-600">Closed</span></p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Booking;
