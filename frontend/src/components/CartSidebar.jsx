import React from 'react';
import { X, Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartSidebar = () => {
    const {
        isCartOpen,
        toggleCart,
        cartItems,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        clearCart,
        parsePrice
    } = useCart();

    const navigate = useNavigate();

    if (!isCartOpen) return null;

    const handleCheckout = () => {
        toggleCart();
        navigate('/order-online');
    };

    return (
        <div className="fixed inset-0 z-[60] overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={toggleCart}
            />

            {/* Sidebar */}
            <div className="absolute inset-y-0 right-0 max-w-full flex">
                <div className="w-screen max-w-md bg-white shadow-xl flex flex-col h-full transform transition-transform duration-300 ease-in-out">

                    {/* Header */}
                    <div className="px-4 py-6 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <ShoppingCart size={24} />
                            Your Cart
                        </h2>
                        <button
                            onClick={toggleCart}
                            className="text-gray-400 hover:text-gray-500 transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {cartItems.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                <div className="bg-gray-100 p-4 rounded-full">
                                    <ShoppingCart size={40} className="text-gray-400" />
                                </div>
                                <p className="text-gray-500 text-lg">Your cart is empty</p>
                                <button
                                    onClick={() => {
                                        toggleCart();
                                        navigate('/menu');
                                    }}
                                    className="text-primary-600 font-medium hover:underline"
                                >
                                    Start Ordering
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {cartItems.map((item) => {
                                    // Determine effective price using context helper
                                    const hasDiscount = item.discount && Number(item.discount) > 0;
                                    const rawPrice = (hasDiscount && item.discountedPrice) ? item.discountedPrice : item.price;
                                    const price = parsePrice(rawPrice);
                                    const qty = parseInt(item.qty, 10) || 1;
                                    const itemTotal = price * qty;

                                    return (
                                        <div key={item._id} className="flex gap-4 bg-white p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                                            {/* Item Details */}
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h3 className="font-medium text-gray-900 line-clamp-2">{item.name}</h3>
                                                    <span className="font-semibold text-primary-600">€{itemTotal.toFixed(2)}</span>
                                                </div>
                                                <p className="text-xs text-gray-500 mb-2">€{price.toFixed(2)} each</p>

                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center border border-gray-200 rounded-md">
                                                        <button
                                                            onClick={() => updateQuantity(item._id, item.qty - 1)}
                                                            className="p-1 hover:bg-gray-50 rounded-l-md transition-colors text-gray-600"
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="px-2 text-sm font-medium w-8 text-center">{item.qty}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item._id, item.qty + 1)}
                                                            className="p-1 hover:bg-gray-50 rounded-r-md transition-colors text-gray-600"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>

                                                    <button
                                                        onClick={() => removeFromCart(item._id)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {cartItems.length > 0 && (
                        <div className="border-t border-gray-200 p-4 bg-gray-50 space-y-4">
                            <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                                <span>Total</span>
                                <span>€{getCartTotal().toFixed(2)}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={clearCart}
                                    className="btn-secondary w-full py-2 text-sm"
                                >
                                    Clear Cart
                                </button>
                                <button
                                    onClick={handleCheckout}
                                    className="btn-primary w-full py-2 text-sm"
                                >
                                    Checkout Now
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartSidebar;
