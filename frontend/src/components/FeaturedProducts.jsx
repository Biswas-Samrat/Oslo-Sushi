import React, { useState } from 'react';
import { ShoppingBag, ChevronRight, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const products = [
    {
        _id: "featured_1",
        name: "Oslo",
        description: "Salmón, atún, aguacate, brotes de soja, alga nori y sésamo. Normal (11,90€) / XL (14,90€)",
        price: 11.90, // Changed to number
        displayPrice: "€11.90",
        image: "/product/Oslo_1.png",
        alignment: "left"
    },
    {
        _id: "featured_2",
        name: "Skin",
        description: "Piel de salmón, queso crema, cebolla roja, teriyaki y cebollino",
        price: 10.00,
        displayPrice: "€10.00",
        image: "/product/Skin_2.png",
        alignment: "right"
    },
    {
        _id: "featured_3",
        name: "New York",
        description: "Salmón, aguacate, queso crema y sésamo blanco",
        price: 10.00,
        displayPrice: "€10.00",
        image: "/product/New_York_4.png",
        alignment: "left"
    },
    {
        _id: "featured_4",
        name: "Vegano",
        description: "Tomate deshidratado, pepino, aguacate y sésamo",
        price: 10.00,
        displayPrice: "€10.00",
        image: "/product/Vegan_3.png",
        alignment: "right"
    }
];

const FeaturedProductActions = ({ product }) => {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);
    const navigate = useNavigate();

    const handleAddToCart = () => {
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className={`flex flex-wrap gap-4 ${product.alignment === 'left' ? 'justify-center md:justify-start' : 'justify-center md:justify-end'
            }`}>
            <button
                onClick={handleAddToCart}
                className={`flex items-center gap-2 px-8 py-3 rounded-none transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${isAdded ? 'bg-green-600 hover:bg-green-700' : 'bg-[#ff4d00] hover:bg-[#e64600]'
                    } text-white`}
            >
                <span className="uppercase tracking-wider font-semibold text-sm">
                    {isAdded ? 'Added' : 'Add to Cart'}
                </span>
                {isAdded ? <Check size={18} /> : <ShoppingBag size={18} />}
            </button>
            <Link to="/order-online" className="flex items-center gap-2 border border-gray-300 hover:border-gray-900 text-gray-600 hover:text-gray-900 px-8 py-3 rounded-none transition-all duration-300">
                <span className="uppercase tracking-wider font-semibold text-sm">Order Now</span>
                <ChevronRight size={18} />
            </Link>
        </div>
    );
};

const FeaturedProducts = () => {
    return (
        <section className="py-20 bg-[#faf9f6] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {products.map((product) => (
                    <div
                        key={product._id}
                        className={`flex flex-col md:flex-row items-center justify-between mb-32 last:mb-0 ${product.alignment === 'right' ? 'md:flex-row-reverse' : ''
                            }`}
                    >
                        {/* Image Section */}
                        <div
                            className="w-full md:w-1/2 relative flex justify-center items-center"
                        >
                            <div className="relative w-full h-auto max-w-[600px]">
                                {/* Decorative Elements */}
                                <div className="absolute inset-0 bg-primary-100/20 rounded-full blur-3xl transform scale-75" />

                                {/* Static Image */}
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
                                />
                            </div>
                        </div>

                        {/* Content Section */}
                        <div
                            className={`w-full md:w-5/12 mt-12 md:mt-0 text-center ${product.alignment === 'left' ? 'md:text-left' : 'md:text-right'
                                }`}
                        >
                            <h3 className="text-primary-400 font-serif text-lg tracking-widest uppercase mb-2">Signature Roll</h3>
                            <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6 relative inline-block">
                                {product.name}
                            </h2>

                            <div className="flex flex-col gap-2 mb-8">
                                <p className="text-gray-500 text-lg leading-relaxed font-light">
                                    {product.description}
                                </p>
                            </div>

                            <div className={`flex items-center gap-6 mb-8 ${product.alignment === 'left' ? 'justify-center md:justify-start' : 'justify-center md:justify-end'
                                }`}>
                                <span className="text-4xl font-serif text-gray-900">{product.displayPrice}</span>
                            </div>

                            <FeaturedProductActions product={product} />

                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedProducts;
