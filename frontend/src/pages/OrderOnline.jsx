import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { ShoppingBag, Clock, MapPin, Truck, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const OrderOnline = () => {
    const { t } = useLanguage();
    const [orderType, setOrderType] = useState('delivery'); // 'delivery' or 'pickup'

    // Dummy categories for the visual interface
    const categories = [
        { id: 'starters', name: t('starters'), image: 'https://images.unsplash.com/photo-1615361200141-f45040f367be?q=80&w=100&auto=format&fit=crop' },
        { id: 'sushi-rolls', name: t('sushiRolls'), image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=100&auto=format&fit=crop' },
        { id: 'nigiri', name: t('nigiriSashimi'), image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=100&auto=format&fit=crop' },
        { id: 'mains', name: t('mainDishes'), image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=100&auto=format&fit=crop' },
    ];

    return (
        <>
            <Helmet>
                <title>{t('orderOnlineTitle')} - Oslo Sushi Gijón</title>
                <meta
                    name="description"
                    content="Order your favorite sushi online for delivery or pickup from Oslo Sushi Gijón. Fresh, fast, and delicious."
                />
            </Helmet>

            {/* Header/Hero */}

            <section
                className="relative bg-gray-900 text-white h-[300px] flex items-center justify-center"
                style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/order_online_hero.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="section-container text-center relative z-10">
                    <h1 className="text-4xl font-serif font-bold mb-4">{t('orderOnlineTitle')}</h1>
                    <p className="text-gray-100 text-lg">{t('orderOnlineHeroSubtitle')}</p>
                </div>
            </section>

            <div className="section-container py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Sidebar - Order Info */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Order Type Toggle */}
                        <div className="card p-4">
                            <h3 className="font-semibold mb-4 text-lg">{t('howToReceiveOrder')}</h3>
                            <div className="flex bg-gray-100 rounded-lg p-1">
                                <button
                                    onClick={() => setOrderType('delivery')}
                                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${orderType === 'delivery'
                                        ? 'bg-white text-primary-600 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <Truck size={16} />
                                        {t('delivery')}
                                    </div>
                                </button>
                                <button
                                    onClick={() => setOrderType('pickup')}
                                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${orderType === 'pickup'
                                        ? 'bg-white text-primary-600 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <ShoppingBag size={16} />
                                        {t('pickup')}
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Info Cards */}
                        <div className="card p-4">
                            <div className="flex items-start gap-3">
                                <Clock className="text-primary-600 mt-1" size={20} />
                                <div>
                                    <p className="font-semibold text-sm">{t('estimatedTime')}</p>
                                    <p className="text-gray-600 text-sm">
                                        {orderType === 'delivery' ? '45 - 60 mins' : '20 - 30 mins'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="card p-4">
                            <div className="flex items-start gap-3">
                                <MapPin className="text-primary-600 mt-1" size={20} />
                                <div>
                                    <p className="font-semibold text-sm">{t('location')}</p>
                                    <p className="text-gray-600 text-sm">C. Evaristo Valle, 4, 33202 Gijón</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Content - Menu Preview / Call to Action */}
                    <div className="lg:col-span-2">
                        {/* Promo Banner */}
                        <div className="bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl p-6 text-white mb-8 shadow-lg">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold mb-2">{t('firstOrderDiscount')}</h2>
                                    <p className="text-white/90">{t('firstOrderDiscountText')} <span className="font-bold bg-white/20 px-2 py-1 rounded">OSLO10</span></p>
                                </div>
                                <ShoppingBag size={48} className="text-white/20" />
                            </div>
                        </div>

                        {/* Categories Grid */}
                        <h2 className="text-2xl font-bold mb-6">{t('browseMenu')}</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            {categories.map((cat) => (
                                <div key={cat.id} className="group cursor-pointer">
                                    <div className="overflow-hidden rounded-lg mb-2 shadow-md">
                                        <img
                                            src={cat.image}
                                            alt={cat.name}
                                            className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    <p className="font-medium text-center text-sm">{cat.name}</p>
                                </div>
                            ))}
                        </div>

                        {/* External Platform Links (Since this is a frontend demo) */}
                        <div className="text-center p-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">{t('readyToOrder')}</h3>
                            <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                {t('platformNote')}
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <a
                                    href="https://glovoapp.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary flex items-center justify-center gap-2 bg-[#ffc244] text-black border-none hover:bg-[#eebb33]"
                                >
                                    {t('orderOnGlovo')} <ChevronRight size={18} />
                                </a>
                                <a
                                    href="https://ubereats.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary flex items-center justify-center gap-2 bg-[#06C167] text-white border-none hover:bg-[#05a357]"
                                >
                                    {t('orderOnUberEats')} <ChevronRight size={18} />
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderOnline;
