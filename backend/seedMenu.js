require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');

const menuData = [
    // Entrantes (Starters)
    { name: 'Ensalada Wakame', price: 5.90, description: 'Alga Wakame, mango, sésamo y zumo de limón', category: 'Entrantes', available: true },
    { name: 'Arroz Gohan', price: 3.90, description: 'Arroz blanco solo', category: 'Entrantes', available: true },
    { name: 'Tartar de pez mantequilla', price: 12.90, description: 'Cebolla roja, aguacate, kewpie y huevas de salmón', category: 'Entrantes', available: true },
    { name: 'Tartar de salmón', price: 12.90, description: 'Aguacate, cebollino, tomate cherry, zumo de limón y salsa de soja', category: 'Entrantes', available: true },
    { name: 'Tartar vegano', price: 12.90, description: 'Tofu, cebolla, aguacate, cherry y salsa de soja', category: 'Entrantes', available: true },
    { name: 'Ceviche Oslo', price: 13.90, description: 'Pescado del día, cebolla roja, cilantro, jalapeño, cherry, aguacate, cebollino y caviar de aove', category: 'Entrantes', available: true },
    { name: 'Edamame', price: 5.70, description: 'Judías cocidas y salteadas en aceite de sésamo', category: 'Entrantes', available: true },
    { name: 'Pan Bao', price: 6.00, description: 'Relleno de rabo de toro crujiente, cebolla roja encurtida con mirín, brotes tiernos y sésamo', category: 'Entrantes', available: true },
    { name: 'Takoyaki', price: 8.00, description: 'Bolita de harina rellena de pulpo', category: 'Entrantes', available: true },
    { name: 'Gyozas vegetales', price: 6.40, description: 'A la plancha con salsa de chili dulce. 4 unidades (6,40€) / 6 unidades (8,90€)', category: 'Entrantes', available: true },

    // Ramen y Sopas
    { name: 'Ramen de Chashu', price: 14.00, description: 'Sopa de cerdo aderezada con sabor auténtico japonés', category: 'Ramen y Sopas', available: true },
    { name: 'Ramen vegetal 88', price: 12.00, description: 'Sopa de verduras, hongos y algas', category: 'Ramen y Sopas', available: true },
    { name: 'Sopa de Miso', price: 5.50, description: 'Sopa con algas wakame, tofu y coronada con cebollino y alga', category: 'Ramen y Sopas', available: true },

    // Poke Bowls
    { name: 'Mexicano', price: 11.90, description: 'Salmón, sésamo negro, salsa teriyaki, aguacate, totopos, jalapeños y pepino. Normal (11,90€) / XL (14,90€)', category: 'Poke Bowls', available: true },
    { name: 'Tropical', price: 11.90, description: 'Salmón, mango, aguacate, pepino y sésamo. Normal (11,90€) / XL (14,90€)', category: 'Poke Bowls', available: true },
    { name: 'Salmón Teriyaki', price: 11.90, description: 'Salmón, sésamo negro, aguacate, pepino, queso crema, salsa teriyaki y furikake. Normal (11,90€) / XL (14,90€)', category: 'Poke Bowls', available: true },
    { name: 'Oslo', price: 11.90, description: 'Salmón, atún, aguacate, brotes de soja, alga nori y sésamo. Normal (11,90€) / XL (14,90€)', category: 'Poke Bowls', available: true },
    { name: 'Vegetal', price: 11.90, description: 'Hongos shiitake, pepino, aguacate, queso crema y sésamo. Normal (11,90€) / XL (14,90€)', category: 'Poke Bowls', available: true },
    { name: 'Atún rojo', price: 11.90, description: 'Atún en cubos, masago, salsa de soja, aguacate, queso crema, brotes de soja y sésamo negro. Normal (11,90€) / XL (14,90€)', category: 'Poke Bowls', available: true },
    { name: 'Mix', price: 11.90, description: 'Salmón, pez mantequilla, zumo de limón, shichimi, bonito granulado y aove. Normal (11,90€) / XL (14,90€)', category: 'Poke Bowls', available: true },
    { name: 'De Granja', price: 11.90, description: 'Pollo Teriyaki, zanahoria rayada, aguacate, rúcula, brotes de soja, salsa tonkatsu y sésamo. Normal (11,90€) / XL (14,90€)', category: 'Poke Bowls', available: true },
    { name: 'Vegano Hot', price: 11.90, description: 'Mix de vegetales al wok y sésamo. Normal (11,90€) / XL (14,90€)', category: 'Poke Bowls', available: true },
    { name: 'Vegano Tofu', price: 11.90, description: 'Tofu, aguacate, brotes de soja, zanahoria, rúcula, salsa Teriyaki y sésamo. Normal (11,90€) / XL (14,90€)', category: 'Poke Bowls', available: true },

    // Uramakis (8 pieces)
    { name: 'California', price: 10.00, description: 'Surimi, pepino, aguacate y sésamo blanco', category: 'Uramakis', available: true },
    { name: 'New York', price: 10.00, description: 'Salmón, aguacate, queso crema y sésamo blanco', category: 'Uramakis', available: true },
    { name: 'Wakame', price: 10.00, description: 'Salmón, aguacate, wakame y huevas de salmón', category: 'Uramakis', available: true },
    { name: 'On Fire', price: 10.00, description: 'Surimi, aguacate, queso crema, salmón y shichimi flameado', category: 'Uramakis', available: true },
    { name: 'Maguro', price: 10.00, description: 'Atún rojo, aguacate y masago', category: 'Uramakis', available: true },
    { name: 'Crusty', price: 10.00, description: 'Langostino, aguacate, queso crema, mango, jalapeños y totopos', category: 'Uramakis', available: true },
    { name: 'Skin', price: 10.00, description: 'Piel de salmón, queso crema, cebolla roja, teriyaki y cebollino', category: 'Uramakis', available: true },
    { name: 'Chicken', price: 10.00, description: 'Pollo, aguacate, kewpie, rúcula y salsa katsu', category: 'Uramakis', available: true },
    { name: 'Vegetal', price: 10.00, description: 'Hongos shiitake, aguacate, queso crema y sésamo', category: 'Uramakis', available: true },
    { name: 'Vegano', price: 10.00, description: 'Tomate deshidratado, pepino, aguacate y sésamo', category: 'Uramakis', available: true },
    { name: 'Vegano Plus', price: 10.00, description: 'Hongo shiitake y pepino', category: 'Uramakis', available: true },
    { name: 'Caribe', price: 10.00, description: 'Mango, pepino, aguacate, cebollino y crema de wasabi', category: 'Uramakis', available: true },

    // Uramakis Tempura (6 pieces)
    { name: 'Salmón Tempura', price: 9.50, description: 'Aguacate y queso crema', category: 'Uramakis Tempura', available: true },
    { name: 'Langostinos Tempura', price: 9.50, description: 'Aguacate y queso crema', category: 'Uramakis Tempura', available: true },

    // Uramakis Plus (8 pieces)
    { name: 'Mariachi', price: 12.00, description: 'Salmón, queso crema, aguacate, jalapeños y totopos', category: 'Uramakis Plus', available: true },
    { name: 'Oslo Plus', price: 12.00, description: 'Salmón, queso crema, aguacate, huevas y cebollino', category: 'Uramakis Plus', available: true },
    { name: 'Rocket', price: 12.00, description: 'Salmón, aguacate, rúcula y jalapeños', category: 'Uramakis Plus', available: true },
    { name: 'Fire', price: 12.00, description: 'Langostinos, aguacate, salmón y teriyaki flameado', category: 'Uramakis Plus', available: true },
    { name: 'Habana', price: 12.00, description: 'Langostinos, mango, pepino, aguacate, furikake y crema de wasabi', category: 'Uramakis Plus', available: true },

    // Makis Oslo (8 pieces)
    { name: 'Maki Salmón', price: 9.00, description: 'Salmón, aguacate y queso crema', category: 'Makis Oslo', available: true },
    { name: 'Maki Tuna', price: 9.00, description: 'Atún y aguacate', category: 'Makis Oslo', available: true },
    { name: 'Maki Avocado', price: 9.00, description: 'Aguacate y pepino', category: 'Makis Oslo', available: true },
    { name: 'Maki Ebi', price: 9.00, description: 'Langostinos y aguacate', category: 'Makis Oslo', available: true },

    // Nigiris (4 pieces)
    { name: 'Nigiri Salmón', price: 8.50, description: 'Solo (8,50€) / + Topping (9,00€)', category: 'Nigiris', available: true },
    { name: 'Nigiri Atún', price: 8.50, description: 'Solo (8,50€) / + Topping (9,00€)', category: 'Nigiris', available: true },
    { name: 'Nigiri Pez Mantequilla', price: 8.50, description: 'Solo (8,50€) / + Topping (9,00€)', category: 'Nigiris', available: true },
    { name: 'Nigiri Langostinos', price: 8.50, description: 'Solo (8,50€) / + Topping (9,00€)', category: 'Nigiris', available: true },

    // Spring Rolls (6 pieces)
    { name: 'Spring Roll Clásico', price: 9.50, description: 'Salmón, aguacate y queso crema', category: 'Spring Rolls', available: true },
    { name: 'Spring Roll Burner', price: 9.50, description: 'Salmón flameado, aceite de sésamo y aguacate', category: 'Spring Rolls', available: true },
    { name: 'Spring Roll Tuna', price: 9.00, description: 'Atún cocido y aguacate', category: 'Spring Rolls', available: true },

    // Temakis (Cones)
    { name: 'Temaki Salmón', price: 5.10, description: 'Salmón, aguacate y queso crema', category: 'Temakis', available: true },
    { name: 'Temaki Atún', price: 5.10, description: 'Atún, masago y aguacate', category: 'Temakis', available: true },
    { name: 'Temaki Langostino', price: 5.10, description: 'Langostino, aguacate y queso crema', category: 'Temakis', available: true },
    { name: 'Temaki Chicken', price: 5.10, description: 'Pollo, aguacate y queso crema', category: 'Temakis', available: true },
    { name: 'Temaki Vegetal', price: 5.10, description: 'Hongos shiitake, aguacate y pepino', category: 'Temakis', available: true },
    { name: 'Temaki Mexicano', price: 5.10, description: 'Salmón, aguacate y totopos', category: 'Temakis', available: true },

    // Sashimi and Geishas (4 pieces)
    { name: 'Sashimi Salmón', price: 8.50, description: '', category: 'Sashimi and Geishas', available: true },
    { name: 'Sashimi Atún', price: 8.50, description: '', category: 'Sashimi and Geishas', available: true },
    { name: 'Sashimi Pez Mantequilla', price: 8.50, description: '', category: 'Sashimi and Geishas', available: true },
    { name: 'Geishas de salmón', price: 9.00, description: 'Aguacate y queso crema', category: 'Sashimi and Geishas', available: true },

    // Combos
    { name: 'Combo Especial (20 pcs)', price: 26.50, description: '4 California, 4 New York, 4 Salmón Spring Rolls, 4 Salmón Maki, 4 Rockets', category: 'Combos', available: true },
    { name: 'Combo Premium (26 pcs)', price: 34.50, description: '4 Mariachi, 4 Wakame, 4 Nigiri Salmón, 4 Fire, 4 Maguro, 6 Salmón Tempura', category: 'Combos', available: true },
    { name: 'Combo Oslo (52 pcs)', price: 65.50, description: '8 Oslo, 4 Maguro, 4 Crusty, 6 Salmón Makis, 6 Burner Spring Rolls, 6 Niguiris Mixtos, 8 New York, 6 Salmón Tempura, 4 Sashimi', category: 'Combos', available: true },
    { name: 'Combo Nigiri (12 pcs)', price: 23.50, description: '4 Nigiri Salmón, 4 Nigiri Atún, 4 Nigiri Pez Mantequilla', category: 'Combos', available: true },
    { name: 'Combo Salmón (12 pcs)', price: 17.50, description: '4 New York, 3 Salmón Spring Rolls, 2 Makis Salmón, 3 Nigiri salmón', category: 'Combos', available: true },
    { name: 'Combo Vegano o Vegetariano (12 pcs)', price: 15.50, description: '4 Vegano Rolls, 4 Vegano Plus, 4 Makis Avocado', category: 'Combos', available: true },
    { name: 'Combo Boston (12 pcs)', price: 16.50, description: '4 Chicken Uramaki, 4 Skin Uramaki, 4 Spring Rolls Atún Cocido', category: 'Combos', available: true },
    { name: 'Combo Clásico (12 pcs)', price: 21.50, description: '4 New York, 4 Maguro, 4 Nigiri Salmón', category: 'Combos', available: true },
    { name: 'Combo El 16 (16 pcs)', price: 21.50, description: '4 New York, 4 Crusty, 4 On Fire, 4 Oslo', category: 'Combos', available: true },
    { name: 'De la Sushiwoman', price: 16.50, description: 'Selección por la Sushiwoman. 12 pcs (16,50€) / 16 pcs (21,50€)', category: 'Combos', available: true },

    // Postres (Desserts)
    { name: 'Tarta de queso', price: 6.00, description: '', category: 'Postres', available: true },
    { name: 'Carrot Cake', price: 6.00, description: '', category: 'Postres', available: true },
    { name: 'Mochis Helados', price: 2.30, description: 'Fresa o chocolate (precio c/u)', category: 'Postres', available: true },

    // Bebidas (Drinks)
    { name: 'Sapporo', price: 3.20, description: '', category: 'Bebidas', available: true },
    { name: 'Asahi', price: 3.00, description: '', category: 'Bebidas', available: true },
    { name: 'Estrella Galicia', price: 2.80, description: '', category: 'Bebidas', available: true },
    { name: 'Estrella Tostada 0,0', price: 2.90, description: '', category: 'Bebidas', available: true },
    { name: 'Estrella Sin Gluten', price: 2.90, description: '', category: 'Bebidas', available: true },
    { name: 'Radler Limón', price: 2.90, description: '', category: 'Bebidas', available: true },
    { name: 'Pepsi', price: 2.90, description: '', category: 'Bebidas', available: true },
    { name: 'Kas', price: 2.90, description: '', category: 'Bebidas', available: true },
    { name: 'Aquarade', price: 2.90, description: '', category: 'Bebidas', available: true },
    { name: 'Zumo de melocotón', price: 2.90, description: '', category: 'Bebidas', available: true },
    { name: 'Agua 500ml', price: 2.60, description: '', category: 'Bebidas', available: true },
    { name: 'Agua con gas 330ml', price: 2.30, description: '', category: 'Bebidas', available: true },
    { name: 'Sake Karatanba', price: 2.00, description: 'Chupito (2,00€) / Jarra (9,00€) / Botella (29,00€)', category: 'Bebidas', available: true },
    { name: 'Sake Kubota Hyakuju', price: 2.50, description: 'Chupito (2,50€) / Jarra (11,00€) / Botella (31,00€)', category: 'Bebidas', available: true },
    { name: 'Sake Gekkeikan Nigori', price: 2.50, description: 'Chupito (2,50€) / Jarra (11,00€) / Botella (31,00€)', category: 'Bebidas', available: true },
    { name: 'Frangelico', price: 4.50, description: '', category: 'Bebidas', available: true },
    { name: 'Crema', price: 3.00, description: '', category: 'Bebidas', available: true },
    { name: 'Hierbas', price: 3.00, description: '', category: 'Bebidas', available: true },
];

async function seedMenu() {
    try {
        console.log('🔄 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB connected!');

        console.log('🗑️  Clearing existing menu items...');
        await MenuItem.deleteMany({});

        console.log('📝 Inserting menu items...');
        const items = await MenuItem.insertMany(menuData);

        console.log(`✅ Successfully inserted ${items.length} menu items!`);
        console.log('\nMenu items by category:');
        const categories = [...new Set(items.map(item => item.category))];
        for (const category of categories) {
            const count = items.filter(item => item.category === category).length;
            console.log(`  - ${category}: ${count} items`);
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding menu:', error.message);
        process.exit(1);
    }
}

seedMenu();
