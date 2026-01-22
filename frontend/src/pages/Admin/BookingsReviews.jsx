import React, { useState, useEffect } from 'react';
import { Calendar, MessageSquare, ShoppingBag, Check, X, Trash2, Star, Clock, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import { toast } from 'react-toastify';

const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

const formatDateTime = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    });
};

const BookingsReviews = () => {
    const [activeTab, setActiveTab] = useState('bookings');
    const [loading, setLoading] = useState(false);

    const [bookings, setBookings] = useState([]);
    const [orders, setOrders] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'bookings') {
                const res = await api.get('/bookings');
                if (res.data.success) setBookings(res.data.data);
            } else if (activeTab === 'orders') {
                const res = await api.get('/orders');
                if (res.data.success) setOrders(res.data.data);
            } else if (activeTab === 'reviews') {
                const res = await api.get('/reviews?approved=true&approved=false'); // Fetch all
                if (res.data.success) setReviews(res.data.data);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            // Don't show toast on 404s if lists are just empty, but here it's likely a real error
        } finally {
            setLoading(false);
        }
    };

    // --- Actions ---

    const handleUpdateBooking = async (id, status) => {
        try {
            await api.put(`/bookings/${id}`, { status });
            toast.success(`Booking marked as ${status}`);
            fetchData();
        } catch (error) {
            toast.error('Failed to update booking');
        }
    };

    const handleDeleteBooking = async (id) => {
        if (!window.confirm('Delete this booking?')) return;
        try {
            await api.delete(`/bookings/${id}`);
            toast.success('Booking deleted');
            fetchData();
        } catch (error) {
            toast.error('Failed to delete booking');
        }
    };

    const toggleFeaturedReview = async (id) => {
        try {
            await api.put(`/reviews/${id}/feature`);
            toast.success('Review status updated');
            fetchData();
        } catch (error) {
            toast.error('Failed to update review');
        }
    };

    const handleDeleteReview = async (id) => {
        if (!window.confirm('Delete this review?')) return;
        try {
            await api.delete(`/reviews/${id}`);
            toast.success('Review deleted');
            fetchData();
        } catch (error) {
            toast.error('Failed to delete review');
        }
    };

    // --- Renderers ---

    const renderBookings = () => (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">Date & Time</th>
                            <th className="p-4 font-semibold text-gray-600">Customer</th>
                            <th className="p-4 font-semibold text-gray-600">Guests</th>
                            <th className="p-4 font-semibold text-gray-600">Status</th>
                            <th className="p-4 font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {bookings.length === 0 ? (
                            <tr><td colSpan="5" className="p-8 text-center text-gray-500">No bookings found</td></tr>
                        ) : bookings.map(booking => (
                            <tr key={booking._id} className="hover:bg-gray-50">
                                <td className="p-4">
                                    <div className="font-medium text-gray-900">
                                        {formatDate(booking.date)}
                                    </div>
                                    <div className="text-sm text-gray-500 flex items-center gap-1">
                                        <Clock size={14} /> {booking.time}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="font-medium text-gray-900">{booking.name}</div>
                                    <div className="text-sm text-gray-500">{booking.phone}</div>
                                </td>
                                <td className="p-4">{booking.partySize} ppl</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                                        ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                            booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                                'bg-yellow-100 text-yellow-700'}`}>
                                        {booking.status.toUpperCase()}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        <button onClick={() => handleUpdateBooking(booking._id, 'confirmed')} className="p-1 text-green-600 hover:bg-green-50 rounded" title="Confirm">
                                            <Check size={18} />
                                        </button>
                                        <button onClick={() => handleUpdateBooking(booking._id, 'cancelled')} className="p-1 text-red-500 hover:bg-red-50 rounded" title="Cancel">
                                            <X size={18} />
                                        </button>
                                        <button onClick={() => handleDeleteBooking(booking._id)} className="p-1 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded" title="Delete">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderOrders = () => (
        <div className="space-y-4">
            {orders.length === 0 ? (
                <div className="bg-white p-8 rounded-xl shadow-sm text-center text-gray-500">No orders found</div>
            ) : orders.map(order => (
                <div key={order._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex flex-col md:flex-row justify-between mb-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-lg">Order #{order._id.slice(-6)}</span>
                                <span className="text-sm text-gray-500">
                                    {formatDateTime(order.createdAt)}
                                </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1"><ShoppingBag size={14} /> {order.items.length} Items</span>
                                <span className="font-bold text-primary-600">€{order.totalAmount.toFixed(2)}</span>
                                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">COD</span>
                            </div>
                        </div>
                        <div className="mt-4 md:mt-0 text-right">
                            {/* Placeholder for order status update if implemented in backend later */}
                            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                New Order
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-100 pt-4">
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                <ShoppingBag size={16} /> Order Details
                            </h4>
                            <ul className="space-y-1 text-sm text-gray-600">
                                {order.items.map((item, idx) => (
                                    <li key={idx} className="flex justify-between">
                                        <span>{item.qty}x {item.name}</span>
                                        <span>€{(item.price * item.qty).toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                <MapPin size={16} /> Delivery Info
                            </h4>
                            <div className="text-sm text-gray-600">
                                <p className="font-medium text-gray-900">{order.customer.name}</p>
                                <p className="flex items-center gap-1"><Phone size={12} /> {order.customer.phone}</p>
                                <p className="mt-1">
                                    {order.customer.address.street} {order.customer.address.number}, {order.customer.address.floor}
                                </p>
                                <p>{order.customer.address.zip} {order.customer.address.city}</p>
                                {order.instructions && (
                                    <p className="mt-2 text-orange-600 bg-orange-50 p-2 rounded text-xs">
                                        "{order.instructions}"
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderReviews = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.length === 0 ? (
                <div className="col-span-2 bg-white p-8 rounded-xl shadow-sm text-center text-gray-500">No reviews found</div>
            ) : reviews.map(review => (
                <div key={review._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative group">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex gap-1 text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} />
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => toggleFeaturedReview(review._id)}
                                className={`text-xs px-2 py-1 rounded-full border transition-colors ${review.featured
                                        ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                                        : 'bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100'
                                    }`}
                            >
                                {review.featured ? 'Featured' : 'Feature'}
                            </button>
                            <button
                                onClick={() => handleDeleteReview(review._id)}
                                className="text-gray-300 hover:text-red-500 transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                    <p className="text-gray-700 mb-4 italic">"{review.comment}"</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                        <span className="font-medium text-gray-900">- {review.name}</span>
                        <span>{formatDate(review.createdAt)}</span>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-gray-900">Activity Manager</h1>
                        <p className="text-gray-600">Manage bookings, orders, and reviews</p>
                    </div>
                    <Link to="/admin" className="btn-outline">Back to Dashboard</Link>
                </div>

                {/* Tabs */}
                <div className="flex space-x-4 mb-6 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('bookings')}
                        className={`pb-3 px-4 font-medium transition-colors relative ${activeTab === 'bookings' ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <span className="flex items-center gap-2"><Calendar size={18} /> Bookings</span>
                        {activeTab === 'bookings' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600"></div>}
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`pb-3 px-4 font-medium transition-colors relative ${activeTab === 'orders' ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <span className="flex items-center gap-2"><ShoppingBag size={18} /> Online Orders</span>
                        {activeTab === 'orders' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600"></div>}
                    </button>
                    <button
                        onClick={() => setActiveTab('reviews')}
                        className={`pb-3 px-4 font-medium transition-colors relative ${activeTab === 'reviews' ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <span className="flex items-center gap-2"><MessageSquare size={18} /> Reviews</span>
                        {activeTab === 'reviews' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600"></div>}
                    </button>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
                    </div>
                ) : (
                    <>
                        {activeTab === 'bookings' && renderBookings()}
                        {activeTab === 'orders' && renderOrders()}
                        {activeTab === 'reviews' && renderReviews()}
                    </>
                )}
            </div>
        </div>
    );
};

export default BookingsReviews;
