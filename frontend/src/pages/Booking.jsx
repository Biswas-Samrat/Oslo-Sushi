import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Calendar, Clock, Users, MessageSquare, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../api/client';
import { useLanguage } from '../context/LanguageContext';

const Booking = () => {
    const { t } = useLanguage();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        partySize: 1, // Default to 1 person
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
                    partySize: 1,
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
                <title>{t('bookTableTitle')} - Oslo Sushi Gijón</title>
                <meta
                    name="description"
                    content="Reserve your table at Star and Garter Oamaru. Book online for fine dining experience in Oamaru, New Zealand."
                />
            </Helmet>

            {/* Booking Container */}
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="lg:grid lg:grid-cols-2 gap-12 items-start">

                        {/* Left Column: Restaurant Content */}
                        <div className="mb-12 lg:mb-0 space-y-8">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                                    Restaurante Japonés Oslo Sushi
                                </h1>
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="flex text-yellow-400">
                                        {[...Array(4)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                            <defs>
                                                <linearGradient id="halfStar">
                                                    <stop offset="50%" stopColor="currentColor" />
                                                    <stop offset="50%" stopColor="#e5e7eb" />
                                                </linearGradient>
                                            </defs>
                                            <path fill="url(#halfStar)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </div>
                                    <span className="font-semibold text-gray-700">4.5</span>
                                    <span className="text-gray-500">(500 reviews)</span>
                                </div>
                                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                    {t('bookTableSubtitle')}
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary-50 p-3 rounded-full text-primary-600">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{t('location')}</h3>
                                        <p className="text-gray-600">C. Evaristo Valle, 4, Gijon-Este, 33202 Gijón, Asturias, Spain</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-green-50 p-3 rounded-full text-green-600">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                                        <p className="text-gray-600">+34 672 599 663</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Booking Form */}
                        <div className="max-w-md mx-auto w-full bg-white rounded-xl shadow-lg overflow-hidden">

                            {/* Top Navigation Bar */}
                            <div className="bg-gray-100 px-4 py-3 flex items-center justify-between border-b border-gray-200 text-sm font-medium">
                                {/* Date Step Indicator */}
                                <div className={`flex items-center gap-1 px-2 py-1 rounded-full transition-colors ${step === 1 ? 'bg-primary-600 text-white shadow-sm' : formData.date ? 'bg-green-100 text-green-700' : 'text-gray-400'}`}>
                                    {formData.date ? new Date(formData.date).toLocaleDateString('en-US', { day: 'numeric', month: 'numeric' }) : 'Date'}
                                </div>
                                <span className="text-gray-300">›</span>

                                {/* Time Step Indicator */}
                                <div className={`flex items-center gap-1 px-2 py-1 rounded-full transition-colors ${step === 2 ? 'bg-primary-600 text-white shadow-sm' : formData.time ? 'bg-green-100 text-green-700' : 'text-gray-400'}`}>
                                    {formData.time ? formData.time : 'Time'}
                                </div>
                                <span className="text-gray-300">›</span>

                                {/* People Step Indicator */}
                                <div className={`flex items-center gap-1 px-2 py-1 rounded-full transition-colors ${step === 3 ? 'bg-primary-600 text-white shadow-sm' : formData.partySize ? 'bg-green-100 text-green-700' : 'text-gray-400'}`}>
                                    {formData.partySize ? `${formData.partySize} People` : 'People'}
                                </div>
                                <span className="text-gray-300">›</span>

                                {/* Confirmation Step Indicator */}
                                <div className={`flex items-center gap-1 px-2 py-1 rounded-full transition-colors ${step === 4 ? 'bg-primary-600 text-white shadow-sm' : 'text-gray-400'}`}>
                                    Confirmation
                                </div>
                            </div>

                            {/* Step Content */}
                            <div className="p-4 sm:p-5">
                                {submitted ? (
                                    <div className="text-center py-10 animate-fade-in">
                                        <CheckCircle className="mx-auto mb-4 text-green-500" size={64} />
                                        <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
                                        <p className="text-gray-600 mb-6">We'll see you on {new Date(formData.date).toLocaleDateString()} at {formData.time}.</p>
                                        <button
                                            onClick={() => {
                                                setSubmitted(false);
                                                setStep(1);
                                                setFormData({
                                                    name: '', phone: '', email: '', date: '', time: '', partySize: 1, specialRequests: ''
                                                });
                                            }}
                                            className="btn-primary w-full"
                                        >
                                            Book Another Table
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        {/* Step 1: Date Selection */}
                                        {step === 1 && (
                                            <div className="animate-fade-in flex flex-col h-full">
                                                <h2 className="text-xl font-bold text-center mb-4">Select Date</h2>
                                                <div className="bg-white rounded-lg flex-grow">
                                                    {/* Simplified Custom Calendar Implementation */}
                                                    <div className="mb-4 flex justify-between items-center px-4">
                                                        <button className="p-1 hover:bg-gray-100 rounded"><span className="text-gray-500">‹</span></button>
                                                        <span className="font-semibold text-lg">January 2026</span>
                                                        <button className="p-1 hover:bg-gray-100 rounded"><span className="text-gray-500">›</span></button>
                                                    </div>
                                                    <div className="grid grid-cols-7 text-center text-xs text-gray-400 mb-2">
                                                        <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                                                    </div>
                                                    <div className="grid grid-cols-7 gap-2 text-center">
                                                        {[...Array(31)].map((_, i) => {
                                                            const day = i + 1;
                                                            const dateStr = `2026-01-${day.toString().padStart(2, '0')}`;
                                                            const isSelected = formData.date === dateStr;
                                                            const isPast = new Date(dateStr) < new Date(today);

                                                            // Determine button styles
                                                            let buttonClass = "w-10 h-10 rounded-full flex items-center justify-center text-sm transition-colors ";

                                                            if (isSelected) {
                                                                buttonClass += "bg-primary-600 text-white shadow-md transform scale-105 font-bold";
                                                            } else if (isPast) {
                                                                buttonClass += "bg-red-50 text-red-300 cursor-not-allowed";
                                                            } else {
                                                                buttonClass += "bg-blue-50 hover:bg-primary-100 text-gray-700 hover:text-primary-700 font-medium";
                                                            }

                                                            return (
                                                                <button
                                                                    key={day}
                                                                    disabled={isPast}
                                                                    onClick={() => setFormData({ ...formData, date: dateStr })}
                                                                    className={buttonClass}
                                                                >
                                                                    {day}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                                <div className="mt-5 flex justify-end">
                                                    <button
                                                        onClick={() => setStep(2)}
                                                        disabled={!formData.date}
                                                        className={`px-6 py-2 rounded-lg font-semibold transition-colors ${formData.date ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                                                    >
                                                        Next
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 2: Time Selection */}
                                        {step === 2 && (
                                            <div className="animate-fade-in flex flex-col h-full">
                                                <h2 className="text-xl font-bold text-center mb-4">Dinner</h2>
                                                <div className="grid grid-cols-3 gap-3 flex-grow content-start">
                                                    {[
                                                        '17:00', '17:15', '17:30', '17:45',
                                                        '18:00', '18:15', '18:30', '18:45',
                                                        '19:00', '19:15', '19:30', '19:45',
                                                        '20:00', '20:15', '20:30', '20:45',
                                                        '21:00'
                                                    ].map((time) => (
                                                        <button
                                                            key={time}
                                                            onClick={() => setFormData({ ...formData, time })}
                                                            className={`py-2 rounded-full border text-sm font-medium transition-all
                                                        ${formData.time === time
                                                                    ? 'bg-primary-600 text-white border-primary-600 shadow-md transform scale-105'
                                                                    : 'bg-white border-gray-200 text-gray-700 hover:border-primary-600 hover:text-primary-600 hover:bg-primary-50'
                                                                }`}
                                                        >
                                                            {time}
                                                        </button>
                                                    ))}
                                                </div>
                                                <div className="mt-5 flex justify-between">
                                                    <button
                                                        onClick={() => setStep(1)}
                                                        className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                                                    >
                                                        Back
                                                    </button>
                                                    <button
                                                        onClick={() => setStep(3)}
                                                        disabled={!formData.time}
                                                        className={`px-6 py-2 rounded-lg font-semibold transition-colors ${formData.time ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                                                    >
                                                        Next
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 3: Party Size Selection */}
                                        {step === 3 && (
                                            <div className="animate-fade-in flex flex-col h-full">
                                                <h2 className="text-xl font-bold text-center mb-4">Number of People</h2>
                                                <div className="grid grid-cols-4 gap-3 mb-3 flex-grow content-start">
                                                    {[...Array(12)].map((_, i) => {
                                                        const num = i + 1;
                                                        return (
                                                            <button
                                                                key={num}
                                                                onClick={() => setFormData({ ...formData, partySize: num })}
                                                                className={`aspect-square rounded-2xl border flex items-center justify-center text-lg font-semibold transition-all
                                                            ${formData.partySize === num
                                                                        ? 'bg-primary-600 text-white border-primary-600 shadow-md transform scale-105'
                                                                        : 'bg-white border-gray-200 text-gray-700 hover:border-primary-600 hover:text-primary-600 hover:bg-primary-50'
                                                                    }`}
                                                            >
                                                                {num}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                                <p className="text-center text-xs text-gray-400 mb-4">
                                                    Offers are based on time, date, and number of guests.
                                                </p>
                                                <div className="flex justify-between">
                                                    <button
                                                        onClick={() => setStep(2)}
                                                        className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                                                    >
                                                        Back
                                                    </button>
                                                    <button
                                                        onClick={() => setStep(4)}
                                                        disabled={!formData.partySize}
                                                        className={`px-6 py-2 rounded-lg font-semibold transition-colors ${formData.partySize ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                                                    >
                                                        Next
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 4: Contact Details (Confirmation) */}
                                        {step === 4 && (
                                            <div className="animate-fade-in">
                                                <h2 className="text-xl font-bold text-center mb-4">Complete Reservation</h2>
                                                <form onSubmit={handleSubmit} className="space-y-3">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('yourName')}</label>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            value={formData.name}
                                                            onChange={handleChange}
                                                            required
                                                            className="input-field py-2"
                                                            placeholder="John Doe"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('phone')}</label>
                                                        <input
                                                            type="tel"
                                                            name="phone"
                                                            value={formData.phone}
                                                            onChange={handleChange}
                                                            required
                                                            className="input-field py-2"
                                                            placeholder="+64 21 123 4567"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('email')} (Optional)</label>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            className="input-field py-2"
                                                            placeholder="john@example.com"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                                                        <textarea
                                                            name="specialRequests"
                                                            value={formData.specialRequests}
                                                            onChange={handleChange}
                                                            rows="2"
                                                            className="input-field resize-none py-2"
                                                            placeholder="Allergies, high chair, etc."
                                                        />
                                                    </div>

                                                    <div className="pt-2 flex justify-between gap-4">
                                                        <button
                                                            type="button"
                                                            onClick={() => setStep(3)}
                                                            className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold"
                                                        >
                                                            Back
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            disabled={loading}
                                                            className="flex-grow btn-primary py-3 rounded-xl font-semibold text-lg shadow-lg"
                                                        >
                                                            {loading ? 'Confirming...' : 'Confirm Reservation'}
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Booking;
