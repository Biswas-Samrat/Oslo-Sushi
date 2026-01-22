import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useCart } from '../context/CartContext';
import { Trash2, Minus, Plus, ShoppingBag, MapPin, Truck, Utensils, AlertCircle, Loader } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import { toast } from 'react-toastify';

const OrderOnline = () => {
    const { t } = useLanguage();
    const { cartItems, updateQuantity, removeFromCart, getCartTotal, parsePrice, clearCart } = useCart();
    const navigate = useNavigate();

    // State for checkout flow
    const [step, setStep] = useState(1); // 1: Cart Review, 2: Details
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userDetails, setUserDetails] = useState({
        name: '',
        phone: '',
        street: '',
        number: '',
        floor: '',
        zip: '',
        city: 'Gijón',
        instructions: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleContinue = () => {
        if (cartItems.length === 0) return;
        setStep(2);
        window.scrollTo(0, 0);
    };

    const handleBack = () => {
        setStep(1);
    };

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Prepare payload
            const orderData = {
                customer: {
                    name: userDetails.name,
                    phone: userDetails.phone,
                    address: {
                        street: userDetails.street,
                        number: userDetails.number,
                        floor: userDetails.floor,
                        zip: userDetails.zip,
                        city: userDetails.city
                    }
                },
                items: cartItems.map(item => {
                    const hasDiscount = item.discount && Number(item.discount) > 0;
                    const rawPrice = (hasDiscount && item.discountedPrice) ? item.discountedPrice : item.price;
                    const price = parsePrice(rawPrice);
                    return {
                        name: item.name,
                        qty: parseInt(item.qty) || 1,
                        price: price,
                        total: price * (parseInt(item.qty) || 1)
                    };
                }),
                totalAmount: getCartTotal(),
                instructions: userDetails.instructions
            };

            const response = await api.post('/orders', orderData);

            if (response.data.success) {
                toast.success('Order placed successfully! Check your WhatsApp/SMS for confirmation.');
                clearCart();
                setStep(1); // Or navigate to a success page
                setUserDetails({
                    name: '',
                    phone: '',
                    street: '',
                    number: '',
                    floor: '',
                    zip: '',
                    city: 'Gijón',
                    instructions: ''
                });
                navigate('/'); // Redirect to home
            } else {
                toast.error('Something went wrong. Please try again.');
            }

        } catch (error) {
            console.error('Order submission error:', error);
            toast.error(error.response?.data?.message || 'Failed to place order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Calculate totals
    const subtotal = getCartTotal();
    const deliveryFee = 0; // Free for now
    const total = subtotal + deliveryFee;

    return (
        <>
            <Helmet>
                <title>Checkout - Oslo Sushi</title>
            </Helmet>

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">
                        {step === 1 ? 'Review Your Order' : 'Delivery Details'}
                    </h1>

                    <div key={step} className="flex flex-col lg:flex-row gap-8">
                        {/* LEFT COLUMN (70%) */}
                        <div key={step} className="lg:w-[70%] space-y-6">

                            {step === 1 && (
                                <div key="step-1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                                        <h2 className="text-lg font-semibold flex items-center gap-2">
                                            <ShoppingBag className="text-primary-600" size={20} />
                                            <span>Cart Items ({cartItems.reduce((acc, item) => acc + (parseInt(item.qty) || 0), 0)})</span>
                                        </h2>
                                    </div>

                                    <div className="p-6 space-y-6">
                                        {cartItems.length === 0 ? (
                                            <div className="text-center py-12">
                                                <div className="bg-gray-100 p-4 rounded-full inline-flex mb-4">
                                                    <Utensils className="text-gray-400" size={32} />
                                                </div>
                                                <p className="text-gray-500 mb-6">Your cart is empty.</p>
                                                <button onClick={() => navigate('/menu')} className="btn-primary">
                                                    Browse Menu
                                                </button>
                                            </div>
                                        ) : (
                                            cartItems.map((item) => {
                                                const hasDiscount = item.discount && Number(item.discount) > 0;
                                                const rawPrice = (hasDiscount && item.discountedPrice) ? item.discountedPrice : item.price;
                                                const price = parsePrice(rawPrice);
                                                const itemTotal = price * (parseInt(item.qty) || 1);

                                                return (
                                                    <div key={item._id} className="flex flex-col sm:flex-row gap-4 py-4 border-b last:border-0 border-gray-100">
                                                        {/* Image (Optional if available) */}
                                                        {item.image && (
                                                            <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                            </div>
                                                        )}

                                                        <div className="flex-1">
                                                            <div className="flex justify-between items-start mb-2">
                                                                <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                                                                <span className="font-bold text-gray-900">€{itemTotal.toFixed(2)}</span>
                                                            </div>
                                                            <p className="text-gray-500 text-sm mb-4">€{price.toFixed(2)} each</p>

                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center border border-gray-300 rounded-lg">
                                                                    <button
                                                                        onClick={() => updateQuantity(item._id, item.qty - 1)}
                                                                        className="p-2 hover:bg-gray-100 text-gray-600 rounded-l-lg"
                                                                    >
                                                                        <Minus size={16} />
                                                                    </button>
                                                                    <span className="px-4 font-medium text-gray-900 w-12 text-center">{item.qty}</span>
                                                                    <button
                                                                        onClick={() => updateQuantity(item._id, item.qty + 1)}
                                                                        className="p-2 hover:bg-gray-100 text-gray-600 rounded-r-lg"
                                                                    >
                                                                        <Plus size={16} />
                                                                    </button>
                                                                </div>

                                                                <button
                                                                    onClick={() => removeFromCart(item._id)}
                                                                    className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                                                    title="Remove item"
                                                                >
                                                                    <Trash2 size={20} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div key="step-2" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                                        <h2 className="text-lg font-semibold flex items-center gap-2">
                                            <Truck className="text-primary-600" size={20} />
                                            <span>Delivery Address</span>
                                        </h2>
                                        <button onClick={handleBack} className="text-sm text-primary-600 hover:underline">
                                            Edit Cart
                                        </button>
                                    </div>

                                    <div className="p-8">
                                        <form id="checkout-form" onSubmit={handleSubmitOrder} className="space-y-6">
                                            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3 text-blue-800 text-sm mb-6">
                                                <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                                                <p>
                                                    We currently deliver only within <strong>Gijón</strong>.
                                                    Payment is <strong>Cash on Delivery</strong>.
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="col-span-2 md:col-span-1">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        name="name"
                                                        value={userDetails.name}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow"
                                                        placeholder="Your Name"
                                                    />
                                                </div>
                                                <div className="col-span-2 md:col-span-1">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                                    <input
                                                        required
                                                        type="tel"
                                                        name="phone"
                                                        value={userDetails.phone}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow"
                                                        placeholder="+34 ..."
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <div className="col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        name="street"
                                                        value={userDetails.street}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow"
                                                        placeholder="Street Name"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Number</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        name="number"
                                                        value={userDetails.number}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow"
                                                        placeholder="123"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Floor / Door <span className="text-gray-400 font-normal">(Optional)</span></label>
                                                    <input
                                                        type="text"
                                                        name="floor"
                                                        value={userDetails.floor}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow"
                                                        placeholder="2nd Floor, 4B"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        name="zip"
                                                        value={userDetails.zip}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow"
                                                        placeholder="33202"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                                    <input
                                                        readOnly
                                                        type="text"
                                                        name="city"
                                                        value={userDetails.city}
                                                        className="w-full px-4 py-2 border border-gray-200 bg-gray-50 text-gray-500 rounded-lg cursor-not-allowed"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Instructions <span className="text-gray-400 font-normal">(Optional)</span></label>
                                                <textarea
                                                    name="instructions"
                                                    value={userDetails.instructions}
                                                    onChange={handleInputChange}
                                                    rows="2"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow"
                                                    placeholder="Ring bell, leave at door, etc."
                                                ></textarea>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* RIGHT COLUMN (30%) - ORDER SUMMARY */}
                        <div key={step} className="lg:w-[30%] h-fit sticky top-8">
                            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                                <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">Order Summary</h2>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>€{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Delivery</span>
                                        <span className="text-green-600 font-medium">Free</span>
                                    </div>
                                    <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between items-center">
                                        <span className="font-bold text-lg text-gray-900">Total</span>
                                        <span className="font-bold text-2xl text-primary-600">€{total.toFixed(2)}</span>
                                    </div>
                                    <div className="text-xs text-gray-400 text-right mt-1">
                                        (Incl. TAX)
                                    </div>
                                </div>

                                {step === 1 ? (
                                    <button
                                        onClick={handleContinue}
                                        disabled={cartItems.length === 0}
                                        className="w-full btn-primary py-3 text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                                    >
                                        Continue Order
                                        <Truck size={18} />
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        form="checkout-form"
                                        disabled={isSubmitting}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-none font-bold text-lg shadow-lg hover:shadow-xl transition-all flex justify-center items-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader className="animate-spin" size={20} />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                Confirm & Order
                                                <img
                                                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                                                    alt="WhatsApp"
                                                    className="w-5 h-5"
                                                    style={{ filter: "brightness(0) invert(1)" }}
                                                />
                                            </>
                                        )}
                                    </button>
                                )}

                                <div className="mt-6 bg-gray-50 p-4 rounded-lg text-xs text-gray-500 space-y-2">
                                    <p className="flex items-center gap-2">
                                        <MapPin size={14} className="text-gray-400" />
                                        Restaurant: Gijón, Spain
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <Utensils size={14} className="text-gray-400" />
                                        Payment: Cash on Delivery Only
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderOnline;
