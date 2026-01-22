import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ShoppingCart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const location = useLocation();
    const { language, setLanguage, t } = useLanguage();
    const { getCartCount, toggleCart } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Should be hidden if scrolling down AND we've scrolled past the header height (e.g. 100px)
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navLinks = [
        { path: '/', label: 'home' },
        { path: '/menu', label: 'menu' },
        { path: '/order-online', label: 'orderOnline' },
        { path: '/gallery', label: 'gallery' },
        { path: '/booking', label: 'booking' },
        { path: '/contact', label: 'contact' },
        { path: '/about', label: 'about' },
    ];

    const languages = [
        { code: 'es', name: 'Español' },
        { code: 'en', name: 'English' },
        { code: 'fr', name: 'Français' },
        { code: 'de', name: 'Deutsch' },
    ];

    const isActive = (path) => location.pathname === path;

    const handleLanguageChange = (code) => {
        setLanguage(code);
        setIsLangMenuOpen(false);
    };

    return (
        <header
            className={`bg-white shadow-md sticky top-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
                }`}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <img src="/logo.png" alt="Oslo Sushi" className="h-12 w-auto" />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-sm font-medium transition-colors duration-200 hover:text-primary-600 ${isActive(link.path)
                                    ? 'text-primary-600 border-b-2 border-primary-600 pb-1'
                                    : 'text-gray-700'
                                    }`}
                            >
                                {t(link.label)}
                            </Link>
                        ))}

                        {/* Language Selector */}
                        <div className="relative">
                            <button
                                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 focus:outline-none"
                            >
                                <Globe size={20} />
                                <span className="uppercase font-medium text-sm">{language}</span>
                            </button>

                            {isLangMenuOpen && (
                                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => handleLanguageChange(lang.code)}
                                            className={`block w-full text-left px-4 py-2 text-sm ${language === lang.code ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100'}`}
                                        >
                                            {lang.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Cart Icon (Desktop) */}
                        <button
                            onClick={toggleCart}
                            className="relative text-gray-700 hover:text-primary-600 focus:outline-none ml-4"
                            aria-label="Open cart"
                        >
                            <ShoppingCart size={24} />
                            {getCartCount() > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                    {getCartCount()}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Mobile Controls */}
                    <div className="flex md:hidden items-center space-x-4">
                        {/* Cart Icon (Mobile) */}
                        <button
                            onClick={toggleCart}
                            className="relative text-gray-700 p-2"
                            aria-label="Open cart"
                        >
                            <ShoppingCart size={24} />
                            {getCartCount() > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                    {getCartCount()}
                                </span>
                            )}
                        </button>

                        {/* Mobile Language Button */}
                        <button
                            onClick={() => {
                                const currentIndex = languages.findIndex(l => l.code === language);
                                const nextIndex = (currentIndex + 1) % languages.length;
                                setLanguage(languages[nextIndex].code);
                            }}
                            className="text-gray-700"
                        >
                            <span className="uppercase font-bold">{language}</span>
                        </button>

                        <button
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200 animate-fade-in">
                        <div className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`text-base font-medium transition-colors duration-200 hover:text-primary-600 ${isActive(link.path)
                                        ? 'text-primary-600'
                                        : 'text-gray-700'
                                        }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {t(link.label)}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
