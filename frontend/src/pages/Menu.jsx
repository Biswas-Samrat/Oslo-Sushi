import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { UtensilsCrossed, Star, Tag } from 'lucide-react';
import api from '../api/client';
import { formatNZD } from '../utils/helpers';

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Kids'];

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        try {
            const response = await api.get('/menu');
            if (response.data.success) {
                setMenuItems(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching menu:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredItems = selectedCategory === 'All'
        ? menuItems
        : menuItems.filter(item => item.category === selectedCategory);

    const getItemsByCategory = (category) => {
        return menuItems.filter(item => item.category === category);
    };

    return (
        <>
            <Helmet>
                <title>Our Menu - Star and Garter Oamaru</title>
                <meta
                    name="description"
                    content="Explore our exquisite menu featuring fresh local ingredients. Starters, mains, desserts, and kids meals. Fine dining in Oamaru, New Zealand."
                />
            </Helmet>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary-600 to-primary-500 text-white py-16">
                <div className="section-container text-center">
                    <div className="flex justify-center mb-4">
                        <UtensilsCrossed size={48} />
                    </div>
                    <h1 className="text-5xl font-serif font-bold mb-4">Our Menu</h1>
                    <p className="text-xl text-primary-50 max-w-2xl mx-auto">
                        Crafted with passion using the finest local ingredients
                    </p>
                </div>
            </section>

            {/* Category Filter */}
            <div className="bg-white shadow-md sticky top-20 z-40">
                <div className="section-container py-4">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${selectedCategory === category
                                        ? 'bg-primary-500 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Menu Items */}
            <section className="section-container">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
                    </div>
                ) : selectedCategory === 'All' ? (
                    // Show all categories separately
                    categories.slice(1).map((category) => {
                        const items = getItemsByCategory(category);
                        if (items.length === 0) return null;

                        return (
                            <div key={category} className="mb-16">
                                <h2 className="text-4xl font-serif font-bold mb-8 text-center text-primary-700">
                                    {category}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {items.map((item) => (
                                        <MenuItemCard key={item._id} item={item} />
                                    ))}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    // Show filtered category
                    <div>
                        <h2 className="text-4xl font-serif font-bold mb-8 text-center text-primary-700">
                            {selectedCategory}
                        </h2>
                        {filteredItems.length === 0 ? (
                            <p className="text-center text-gray-600 py-12">
                                No items available in this category at the moment.
                            </p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredItems.map((item) => (
                                    <MenuItemCard key={item._id} item={item} />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </section>
        </>
    );
};

const MenuItemCard = ({ item }) => {
    const displayPrice = item.discount > 0 ? item.discountedPrice : item.price;
    const hasDiscount = item.discount > 0;

    return (
        <div className="card p-6 hover-lift">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
                {item.localFavorite && (
                    <span className="badge badge-favorite flex items-center gap-1">
                        <Star size={14} fill="currentColor" />
                        Local Favorite
                    </span>
                )}
                {hasDiscount && (
                    <span className="badge badge-discount flex items-center gap-1">
                        <Tag size={14} />
                        {item.discount}% OFF
                    </span>
                )}
            </div>

            {/* Item Name */}
            <h3 className="text-xl font-semibold mb-2 text-gray-900">{item.name}</h3>

            {/* Description */}
            {item.description && (
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {item.description}
                </p>
            )}

            {/* Price */}
            <div className="flex items-center gap-2">
                {hasDiscount && (
                    <span className="text-gray-400 line-through text-sm">
                        {formatNZD(item.price)}
                    </span>
                )}
                <span className="text-2xl font-bold text-primary-600">
                    {formatNZD(displayPrice)}
                </span>
            </div>
        </div>
    );
};

export default Menu;
