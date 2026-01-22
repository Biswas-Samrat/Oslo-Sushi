import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

// Robust helper to parse price strings or numbers
const parsePrice = (value) => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
        // Remove currency symbols and other non-numeric chars (except dot and minus)
        // This handles "€11.90", "$11.90", "11,90" (converting comma to dot if needed, tough here we assume dot)
        const clean = value.replace(/[^0-9.-]/g, '');
        return parseFloat(clean) || 0;
    }
    return 0;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const storedCart = localStorage.getItem('cart');
            const items = storedCart ? JSON.parse(storedCart) : [];
            // Sanitize storage data on load to ensure valid numbers
            return Array.isArray(items) ? items.map(item => ({
                ...item,
                qty: Math.max(1, parseInt(item.qty, 10) || 1),
                // We don't forcefully overwrite price here as it might be complex object, 
                // but we rely on parsePrice during calculation.
            })) : [];
        } catch (error) {
            console.error('Failed to load cart from localStorage', error);
            return [];
        }
    });

    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        } catch (error) {
            console.error('Failed to save cart to localStorage', error);
        }
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item._id === product._id);
            if (existingItem) {
                return prevItems.map(item =>
                    item._id === product._id
                        ? { ...item, qty: (parseInt(item.qty, 10) || 0) + 1 }
                        : item
                );
            } else {
                return [...prevItems, { ...product, qty: 1 }];
            }
        });
        // Note: We do NOT auto-open cart here as per user request
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
    };

    const updateQuantity = (productId, qty) => {
        const newQty = parseInt(qty, 10);
        if (newQty < 1) {
            removeFromCart(productId);
            return;
        }
        setCartItems(prevItems =>
            prevItems.map(item =>
                item._id === productId
                    ? { ...item, qty: newQty }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => {
            // Determine price: check strict boolean/number for discount to avoid string "0" issues
            const hasDiscount = item.discount && Number(item.discount) > 0;
            const rawPrice = (hasDiscount && item.discountedPrice) ? item.discountedPrice : item.price;
            const price = parsePrice(rawPrice);
            const qty = parseInt(item.qty, 10) || 1;
            return total + (price * qty);
        }, 0);
    };

    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + (parseInt(item.qty, 10) || 0), 0);
    };

    const toggleCart = () => {
        setIsCartOpen(prev => !prev);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getCartTotal,
            getCartCount,
            isCartOpen,
            setIsCartOpen,
            toggleCart,
            parsePrice // Expose helper for UI components
        }}>
            {children}
        </CartContext.Provider>
    );
};
