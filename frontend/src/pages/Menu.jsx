import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { UtensilsCrossed, Star, Tag, ShoppingCart, Check } from 'lucide-react';
import api from '../api/client';
import { formatNZD } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// Fallback data in case backend fails
const FALLBACK_MENU_ITEMS = [
    // Entrantes (Starters)
    { _id: '1', name: 'Ensalada Wakame', price: 5.90, description: 'Alga Wakame, mango, sésamo y zumo de limón', category: 'Entrantes', available: true },
    { _id: '2', name: 'Arroz Gohan', price: 3.90, description: 'Arroz blanco solo', category: 'Entrantes', available: true },
    { _id: '3', name: 'Tartar de pez mantequilla', price: 12.90, description: 'Cebolla roja, aguacate, kewpie y huevas de salmón', category: 'Entrantes', available: true },
    { _id: '4', name: 'Tartar de salmón', price: 12.90, description: 'Aguacate, cebollino, tomate cherry, zumo de limón y salsa de soja', category: 'Entrantes', available: true },
    { _id: '5', name: 'Tartar vegano', price: 12.90, description: 'Tofu, cebolla, aguacate, cherry y salsa de soja', category: 'Entrantes', available: true },
    { _id: '6', name: 'Ceviche Oslo', price: 13.90, description: 'Pescado del día, cebolla roja, cilantro, jalapeño, cherry, aguacate, cebollino y caviar de aove', category: 'Entrantes', available: true },
    { _id: '7', name: 'Edamame', price: 5.70, description: 'Judías cocidas y salteadas en aceite de sésamo', category: 'Entrantes', available: true },
    { _id: '8', name: 'Pan Bao', price: 6.00, description: 'Relleno de rabo de toro crujiente, cebolla roja encurtida con mirín, brotes tiernos y sésamo', category: 'Entrantes', available: true },
    { _id: '9', name: 'Takoyaki', price: 8.00, description: 'Bolita de harina rellena de pulpo', category: 'Entrantes', available: true },
    { _id: '10', name: 'Gyozas vegetales', price: 6.40, description: 'A la plancha con salsa de chili dulce. 4 unidades (6,40€) / 6 unidades (8,90€)', category: 'Entrantes', available: true },

    // Ramen y Sopas
    { _id: '11', name: 'Ramen de Chashu', price: 14.00, description: 'Sopa de cerdo aderezada con sabor auténtico japonés', category: 'Ramen y Sopas', available: true },
    { _id: '12', name: 'Ramen vegetal 88', price: 12.00, description: 'Sopa de verduras, hongos y algas', category: 'Ramen y Sopas', available: true },
    { _id: '13', name: 'Sopa de Miso', price: 5.50, description: 'Sopa con algas wakame, tofu y coronada con cebollino y alga', category: 'Ramen y Sopas', available: true },

    // Poke Bowls
    { _id: '14', name: 'Mexicano', price: 11.90, description: 'Salmón, sésamo negro, salsa teriyaki, aguacate, totopos, jalapeños y pepino. Normal (11,90€) / XL (14,90€)', category: 'Poke Bowls', available: true },
    { _id: '15', name: 'Tropical', price: 11.90, description: 'Salmón, mango, aguacate, pepino y sésamo. Normal (11,90€) / XL (14,90€)', category: 'Poke Bowls', available: true },
    { _id: '16', name: 'Salmón Teriyaki', price: 11.90, description: 'Salmón, sésamo negro, aguacate, pepino, queso crema, salsa teriyaki y furikake. Normal (11,90€) / XL (14,90€)', category: 'Poke Bowls', available: true },
    { _id: '17', name: 'Oslo', price: 11.90, description: 'Salmón, atún, aguacate, brotes de soja, alga nori y sésamo. Normal (11,90€) / XL (14,90€)', category: 'Poke Bowls', available: true },
    { _id: '18', name: 'Vegetal', price: 11.90, description: 'Hongos shiitake, pepino, aguacate, queso crema y sésamo. Normal (11,90€) / XL (14,90€)', category: 'Poke Bowls', available: true },
    { _id: '19', name: 'Atún rojo', price: 11.90, description: 'Atún en cubos, masago, salsa de soja, aguacate, queso crema, brotes de soja y sésamo negro. Normal (11,90€) / XL (14,90€)', category: 'Poke Bowls', available: true },
    { _id: '20', name: 'Mix', price: 11.90, description: 'Salmón, pez mantequilla, zumo de limón, shichimi, bonito granulado y aove. Normal (11,90€) / XL (14,90€)', category: 'Poke Bowls', available: true },
    { _id: '21', name: 'De Granja', price: 11.90, description: 'Pollo Teriyaki, zanahoria rayada, aguacate, rúcula, brotes de soja, salsa tonkatsu y sésamo. Normal (11,90€) / XL (14,90€)', category: 'Poke Bowls', available: true },
    { _id: '22', name: 'Vegano Hot', price: 11.90, description: 'Mix de vegetales al wok y sésamo. Normal (11,90€) / XL (14,90€)', category: 'Poke Bowls', available: true },
    { _id: '23', name: 'Vegano Tofu', price: 11.90, description: 'Tofu, aguacate, brotes de soja, zanahoria, rúcula, salsa Teriyaki y sésamo. Normal (11,90€) / XL (14,90€)', category: 'Poke Bowls', available: true },

    // Uramakis (8 pieces)
    { _id: '24', name: 'California', price: 10.00, description: 'Surimi, pepino, aguacate y sésamo blanco', category: 'Uramakis', available: true },
    { _id: '25', name: 'New York', price: 10.00, description: 'Salmón, aguacate, queso crema y sésamo blanco', category: 'Uramakis', available: true },
    { _id: '26', name: 'Wakame', price: 10.00, description: 'Salmón, aguacate, wakame y huevas de salmón', category: 'Uramakis', available: true },
    { _id: '27', name: 'On Fire', price: 10.00, description: 'Surimi, aguacate, queso crema, salmón y shichimi flameado', category: 'Uramakis', available: true },
    { _id: '28', name: 'Maguro', price: 10.00, description: 'Atún rojo, aguacate y masago', category: 'Uramakis', available: true },
    { _id: '29', name: 'Crusty', price: 10.00, description: 'Langostino, aguacate, queso crema, mango, jalapeños y totopos', category: 'Uramakis', available: true },
    { _id: '30', name: 'Skin', price: 10.00, description: 'Piel de salmón, queso crema, cebolla roja, teriyaki y cebollino', category: 'Uramakis', available: true },
    { _id: '31', name: 'Chicken', price: 10.00, description: 'Pollo, aguacate, kewpie, rúcula y salsa katsu', category: 'Uramakis', available: true },
    { _id: '32', name: 'Vegetal', price: 10.00, description: 'Hongos shiitake, aguacate, queso crema y sésamo', category: 'Uramakis', available: true },
    { _id: '33', name: 'Vegano', price: 10.00, description: 'Tomate deshidratado, pepino, aguacate y sésamo', category: 'Uramakis', available: true },
    { _id: '34', name: 'Vegano Plus', price: 10.00, description: 'Hongo shiitake y pepino', category: 'Uramakis', available: true },
    { _id: '35', name: 'Caribe', price: 10.00, description: 'Mango, pepino, aguacate, cebollino y crema de wasabi', category: 'Uramakis', available: true },

    // Uramakis Tempura (6 pieces)
    { _id: '36', name: 'Salmón Tempura', price: 9.50, description: 'Aguacate y queso crema', category: 'Uramakis Tempura', available: true },
    { _id: '37', name: 'Langostinos Tempura', price: 9.50, description: 'Aguacate y queso crema', category: 'Uramakis Tempura', available: true },

    // Uramakis Plus (8 pieces)
    { _id: '38', name: 'Mariachi', price: 12.00, description: 'Salmón, queso crema, aguacate, jalapeños y totopos', category: 'Uramakis Plus', available: true },
    { _id: '39', name: 'Oslo Plus', price: 12.00, description: 'Salmón, queso crema, aguacate, huevas y cebollino', category: 'Uramakis Plus', available: true },
    { _id: '40', name: 'Rocket', price: 12.00, description: 'Salmón, aguacate, rúcula y jalapeños', category: 'Uramakis Plus', available: true },
    { _id: '41', name: 'Fire', price: 12.00, description: 'Langostinos, aguacate, salmón y teriyaki flameado', category: 'Uramakis Plus', available: true },
    { _id: '42', name: 'Habana', price: 12.00, description: 'Langostinos, mango, pepino, aguacate, furikake y crema de wasabi', category: 'Uramakis Plus', available: true },

    // Makis Oslo (8 pieces)
    { _id: '43', name: 'Maki Salmón', price: 9.00, description: 'Salmón, aguacate y queso crema', category: 'Makis Oslo', available: true },
    { _id: '44', name: 'Maki Tuna', price: 9.00, description: 'Atún y aguacate', category: 'Makis Oslo', available: true },
    { _id: '45', name: 'Maki Avocado', price: 9.00, description: 'Aguacate y pepino', category: 'Makis Oslo', available: true },
    { _id: '46', name: 'Maki Ebi', price: 9.00, description: 'Langostinos y aguacate', category: 'Makis Oslo', available: true },

    // Nigiris (4 pieces)
    { _id: '47', name: 'Nigiri Salmón', price: 8.50, description: 'Solo (8,50€) / + Topping (9,00€)', category: 'Nigiris', available: true },
    { _id: '48', name: 'Nigiri Atún', price: 8.50, description: 'Solo (8,50€) / + Topping (9,00€)', category: 'Nigiris', available: true },
    { _id: '49', name: 'Nigiri Pez Mantequilla', price: 8.50, description: 'Solo (8,50€) / + Topping (9,00€)', category: 'Nigiris', available: true },
    { _id: '50', name: 'Nigiri Langostinos', price: 8.50, description: 'Solo (8,50€) / + Topping (9,00€)', category: 'Nigiris', available: true },

    // Spring Rolls (6 pieces)
    { _id: '51', name: 'Spring Roll Clásico', price: 9.50, description: 'Salmón, aguacate y queso crema', category: 'Spring Rolls', available: true },
    { _id: '52', name: 'Spring Roll Burner', price: 9.50, description: 'Salmón flameado, aceite de sésamo y aguacate', category: 'Spring Rolls', available: true },
    { _id: '53', name: 'Spring Roll Tuna', price: 9.00, description: 'Atún cocido y aguacate', category: 'Spring Rolls', available: true },

    // Temakis (Cones)
    { _id: '54', name: 'Temaki Salmón', price: 5.10, description: 'Salmón, aguacate y queso crema', category: 'Temakis', available: true },
    { _id: '55', name: 'Temaki Atún', price: 5.10, description: 'Atún, masago y aguacate', category: 'Temakis', available: true },
    { _id: '56', name: 'Temaki Langostino', price: 5.10, description: 'Langostino, aguacate y queso crema', category: 'Temakis', available: true },
    { _id: '57', name: 'Temaki Chicken', price: 5.10, description: 'Pollo, aguacate y queso crema', category: 'Temakis', available: true },
    { _id: '58', name: 'Temaki Vegetal', price: 5.10, description: 'Hongos shiitake, aguacate y pepino', category: 'Temakis', available: true },
    { _id: '59', name: 'Temaki Mexicano', price: 5.10, description: 'Salmón, aguacate y totopos', category: 'Temakis', available: true },

    // Sashimi and Geishas (4 pieces)
    { _id: '60', name: 'Sashimi Salmón', price: 8.50, description: '', category: 'Sashimi and Geishas', available: true },
    { _id: '61', name: 'Sashimi Atún', price: 8.50, description: '', category: 'Sashimi and Geishas', available: true },
    { _id: '62', name: 'Sashimi Pez Mantequilla', price: 8.50, description: '', category: 'Sashimi and Geishas', available: true },
    { _id: '63', name: 'Geishas de salmón', price: 9.00, description: 'Aguacate y queso crema', category: 'Sashimi and Geishas', available: true },

    // Combos
    { _id: '64', name: 'Combo Especial (20 pcs)', price: 26.50, description: '4 California, 4 New York, 4 Salmón Spring Rolls, 4 Salmón Maki, 4 Rockets', category: 'Combos', available: true },
    { _id: '65', name: 'Combo Premium (26 pcs)', price: 34.50, description: '4 Mariachi, 4 Wakame, 4 Nigiri Salmón, 4 Fire, 4 Maguro, 6 Salmón Tempura', category: 'Combos', available: true },
    { _id: '66', name: 'Combo Oslo (52 pcs)', price: 65.50, description: '8 Oslo, 4 Maguro, 4 Crusty, 6 Salmón Makis, 6 Burner Spring Rolls, 6 Niguiris Mixtos, 8 New York, 6 Salmón Tempura, 4 Sashimi', category: 'Combos', available: true },
    { _id: '67', name: 'Combo Nigiri (12 pcs)', price: 23.50, description: '4 Nigiri Salmón, 4 Nigiri Atún, 4 Nigiri Pez Mantequilla', category: 'Combos', available: true },
    { _id: '68', name: 'Combo Salmón (12 pcs)', price: 17.50, description: '4 New York, 3 Salmón Spring Rolls, 2 Makis Salmón, 3 Nigiri salmón', category: 'Combos', available: true },
    { _id: '69', name: 'Combo Vegano o Vegetariano (12 pcs)', price: 15.50, description: '4 Vegano Rolls, 4 Vegano Plus, 4 Makis Avocado', category: 'Combos', available: true },
    { _id: '70', name: 'Combo Boston (12 pcs)', price: 16.50, description: '4 Chicken Uramaki, 4 Skin Uramaki, 4 Spring Rolls Atún Cocido', category: 'Combos', available: true },
    { _id: '71', name: 'Combo Clásico (12 pcs)', price: 21.50, description: '4 New York, 4 Maguro, 4 Nigiri Salmón', category: 'Combos', available: true },
    { _id: '72', name: 'Combo El 16 (16 pcs)', price: 21.50, description: '4 New York, 4 Crusty, 4 On Fire, 4 Oslo', category: 'Combos', available: true },
    { _id: '73', name: 'De la Sushiwoman', price: 16.50, description: 'Selección por la Sushiwoman. 12 pcs (16,50€) / 16 pcs (21,50€)', category: 'Combos', available: true },

    // Postres (Desserts)
    { _id: '74', name: 'Tarta de queso', price: 6.00, description: '', category: 'Postres', available: true },
    { _id: '75', name: 'Carrot Cake', price: 6.00, description: '', category: 'Postres', available: true },
    { _id: '76', name: 'Mochis Helados', price: 2.30, description: 'Fresa o chocolate (precio c/u)', category: 'Postres', available: true },

    // Bebidas (Drinks)
    { _id: '77', name: 'Sapporo', price: 3.20, description: '', category: 'Bebidas', available: true },
    { _id: '78', name: 'Asahi', price: 3.00, description: '', category: 'Bebidas', available: true },
    { _id: '79', name: 'Estrella Galicia', price: 2.80, description: '', category: 'Bebidas', available: true },
    { _id: '80', name: 'Estrella Tostada 0,0', price: 2.90, description: '', category: 'Bebidas', available: true },
    { _id: '81', name: 'Estrella Sin Gluten', price: 2.90, description: '', category: 'Bebidas', available: true },
    { _id: '82', name: 'Radler Limón', price: 2.90, description: '', category: 'Bebidas', available: true },
    { _id: '83', name: 'Pepsi', price: 2.90, description: '', category: 'Bebidas', available: true },
    { _id: '84', name: 'Kas', price: 2.90, description: '', category: 'Bebidas', available: true },
    { _id: '85', name: 'Aquarade', price: 2.90, description: '', category: 'Bebidas', available: true },
    { _id: '86', name: 'Zumo de melocotón', price: 2.90, description: '', category: 'Bebidas', available: true },
    { _id: '87', name: 'Agua 500ml', price: 2.60, description: '', category: 'Bebidas', available: true },
    { _id: '88', name: 'Agua con gas 330ml', price: 2.30, description: '', category: 'Bebidas', available: true },
    { _id: '89', name: 'Sake Karatanba', price: 2.00, description: 'Chupito (2,00€) / Jarra (9,00€) / Botella (29,00€)', category: 'Bebidas', available: true },
    { _id: '90', name: 'Sake Kubota Hyakuju', price: 2.50, description: 'Chupito (2,50€) / Jarra (11,00€) / Botella (31,00€)', category: 'Bebidas', available: true },
    { _id: '91', name: 'Sake Gekkeikan Nigori', price: 2.50, description: 'Chupito (2,50€) / Jarra (11,00€) / Botella (31,00€)', category: 'Bebidas', available: true },
    { _id: '92', name: 'Frangelico', price: 4.50, description: '', category: 'Bebidas', available: true },
    { _id: '93', name: 'Crema', price: 3.00, description: '', category: 'Bebidas', available: true },
    { _id: '94', name: 'Hierbas', price: 3.00, description: '', category: 'Bebidas', available: true },
];

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    const lastScrollY = useRef(0);

    // Extract categories from data
    const categories = ['All', ...new Set(FALLBACK_MENU_ITEMS.map(item => item.category))];

    useEffect(() => {
        fetchMenuItems();

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Should be hidden if scrolling down AND we've scrolled past the header height (e.g. 100px)
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setIsNavbarVisible(false);
            } else {
                setIsNavbarVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const fetchMenuItems = async () => {
        try {
            const response = await api.get('/menu');
            if (response.data.success && response.data.data.length > 0) {
                setMenuItems(response.data.data);
            } else {
                throw new Error('Using fallback data');
            }
        } catch (error) {
            console.log('Using local fallback menu data due to API error:', error.message);
            setMenuItems(FALLBACK_MENU_ITEMS);
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
                <title>Our Menu - Oslo Sushi Gijón</title>
                <meta
                    name="description"
                    content="Explore our exquisite menu featuring fresh local ingredients. Starters, mains, desserts, and kids meals. Fine dining in Oamaru, New Zealand."
                />
            </Helmet>

            {/* Hero Section */}
            <section
                className="relative bg-gray-900 text-white h-[300px] flex items-center justify-center"
                style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/menu-hero.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="section-container text-center relative z-10">
                    <div className="flex justify-center mb-4">
                        <UtensilsCrossed size={48} className="text-secondary-400" />
                    </div>
                    <h1 className="text-5xl font-serif font-bold mb-4">Our Delicious Menu</h1>
                    <p className="text-xl text-gray-100 max-w-2xl mx-auto">
                        Crafted with passion using the finest local ingredients
                    </p>
                </div>
            </section>

            {/* Category Filter */}
            <div className={`bg-white shadow-md sticky z-40 overflow-x-auto transition-all duration-300 ${isNavbarVisible ? 'top-20' : 'top-0'}`}>
                <div className="section-container py-4">
                    <div className="flex gap-3 justify-start md:justify-center min-w-max px-4">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 whitespace-nowrap ${selectedCategory === category
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
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const handleOrderNow = () => {
        navigate('/order-online');
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(item);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="card p-6 hover-lift bg-white flex flex-col h-full">
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
                <p className="text-gray-600 mb-4 text-sm leading-relaxed flex-grow">
                    {item.description}
                </p>
            )}

            {/* Price and Actions */}
            <div className="mt-auto">
                <div className="flex items-center gap-2 mb-4">
                    {hasDiscount && (
                        <span className="text-gray-400 line-through text-sm">
                            €{item.price.toFixed(2)}
                        </span>
                    )}
                    <span className="text-2xl font-bold text-primary-600">
                        €{displayPrice ? displayPrice.toFixed(2) : '0.00'}
                    </span>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={handleOrderNow}
                        className="flex-1 btn-primary text-sm py-2"
                    >
                        Order Now
                    </button>
                    <button
                        onClick={handleAddToCart}
                        className={`p-2 rounded-lg transition-colors ${isAdded
                            ? 'bg-green-100 text-green-600 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-primary-600'
                            }`}
                        title="Add to Cart"
                    >
                        {isAdded ? <Check size={20} /> : <ShoppingCart size={20} />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Menu;
