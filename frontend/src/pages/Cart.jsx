import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    const { t } = useLanguage();

    const [userDetails, setUserDetails] = useState({
        name: '',
        tableNumber: '',
        phone: '',
        address: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleWhatsAppOrder = () => {
        if (!userDetails.name || !userDetails.phone) {
            alert('Please enter your name and phone number.');
            return;
        }

        const phoneNumber = "+8801882746498";

        // Format items list
        const itemsList = cartItems.map(item =>
            `* ${item.name} (x${item.qty}) - €${(item.discount > 0 ? item.discountedPrice : item.price).toFixed(2)}`
        ).join('%0A');

        const total = getCartTotal().toFixed(2);

        const message = `*New Order!*%0A` +
            `-----------------%0A` +
            `*Customer:* ${userDetails.name}%0A` +
            `*Phone:* ${userDetails.phone}%0A` +
            (userDetails.tableNumber ? `*Table:* ${userDetails.tableNumber}%0A` : '') +
            (userDetails.address ? `*Address:* ${userDetails.address}%0A` : '') +
            `-----------------%0A` +
            `*Items:*%0A${itemsList}%0A` +
            `-----------------%0A` +
            `*Total Amount:* €${total}`;

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');

        // Optionally confirm clear
        if (window.confirm("Did you send the message? Clear cart?")) {
            clearCart();
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
                <Helmet>
                    <title>Cart - Oslo Sushi</title>
                </Helmet>
                <div className="bg-gray-100 p-6 rounded-full">
                    <ShoppingCart size={48} className="text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
                <p className="text-gray-500">Looks like you haven't added anything yet.</p>
                <Link to="/menu" className="btn-primary mt-4">
                    Browse Menu
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <Helmet>
                <title>Cart - Oslo Sushi</title>
            </Helmet>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Your Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => {
                            const price = item.discount > 0 ? item.discountedPrice : item.price;
                            return (
                                <div key={item._id} className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
                                    {/* Image placeholder if available */}
                                    {/* <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0"></div> */}

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                            <span className="font-bold text-primary-600">€{(price * item.qty).toFixed(2)}</span>
                                        </div>
                                        <p className="text-gray-500 text-sm mb-2">€{price.toFixed(2)} each</p>

                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center border border-gray-300 rounded-lg">
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.qty - 1)}
                                                    className="p-2 hover:bg-gray-100 rounded-l-lg transition-colors"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="px-3 font-medium text-sm">{item.qty}</span>
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.qty + 1)}
                                                    className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item._id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors p-2"
                                                title="Remove item"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
                            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="space-y-3">
                                    <label className="block text-sm font-medium text-gray-700">Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={userDetails.name}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="Your full name"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="block text-sm font-medium text-gray-700">Phone *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={userDetails.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="Your phone number"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="block text-sm font-medium text-gray-700">Table No. (Dine-in) or Address</label>
                                    <input
                                        type="text"
                                        name="tableNumber"
                                        value={userDetails.tableNumber}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="e.g. Table 5 OR 123 Main St"
                                    />
                                    {/* Separating address if complex, but single field is easier for quick whatsapp */}
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-4 mb-6">
                                <div className="flex justify-between items-center text-lg font-bold">
                                    <span>Total</span>
                                    <span>€{getCartTotal().toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleWhatsAppOrder}
                                className="w-full btn-primary py-3 flex items-center justify-center gap-2 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                            >
                                <span>Order via WhatsApp</span>
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
