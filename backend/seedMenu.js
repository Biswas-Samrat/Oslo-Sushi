require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');

const menuData = [
    // Starters
    { name: 'Soup of the Day', price: 10, description: 'Served with ciabatta garlic bread', category: 'Starters', available: true },
    { name: 'Seafood Chowder', price: 15, description: 'Option to top with cheesy mash to make a chowder pie for $18', category: 'Starters', available: true },
    { name: 'Garlic Bread', price: 13, description: 'Ciabatta smothered in garlic and herb butter', category: 'Starters', available: true },
    { name: 'Cheesy Bread', price: 18, description: 'Ciabatta with garlic butter, melted cheese, sweet chilli sauce, and aioli', category: 'Starters', available: true },
    { name: 'Blue Cod Sliders', price: 24, description: 'Battered blue cod, lettuce, and tartare sauce on brioche buns; add chips for $30', category: 'Starters', available: true },
    { name: 'Loaded Wedges', price: 24, description: 'Topped with bacon, cheese, sour cream, and sweet chilli sauce', category: 'Starters', available: true, localFavorite: true },

    // Mains
    { name: 'Calamari Salad', price: 28, description: 'Salt and pepper calamari with seasonal salad, lime, chilli, and coriander dressing', category: 'Mains', available: true },
    { name: 'Blue Cod (Small)', price: 32, description: 'Battered OR pan-fried; served with salad and fries OR buttered vegetables with cheese sauce', category: 'Mains', available: true, localFavorite: true },
    { name: 'Blue Cod (Large)', price: 40, description: 'Battered OR pan-fried; served with salad and fries OR buttered vegetables with cheese sauce', category: 'Mains', available: true, localFavorite: true },
    { name: "Fisherman's Basket", price: 28, description: 'Crumbed and battered seafood: blue cod, scallops, squid rings, crab stick, salt & pepper calamari, and prawn sticks; served with fries and tartare sauce', category: 'Mains', available: true },
    { name: 'Creamy Chicken Enchilada', price: 33, description: 'Shredded chicken in mushroom sauce, topped with tomato salsa and sour cream; served with salad and fries', category: 'Mains', available: true },
    { name: 'Lamb Shank (Small)', price: 35, description: 'Braised in red wine and thyme; served with garlic smash potatoes and seasonal vegetables', category: 'Mains', available: true },
    { name: 'Lamb Shank (Large)', price: 45, description: 'Braised in red wine and thyme; served with garlic smash potatoes and seasonal vegetables', category: 'Mains', available: true },
    { name: 'Ribeye Steak', price: 42, description: 'Grilled to liking; served with salad and fries OR roasted potatoes and seasonal vegetables; choice of mushroom sauce OR garlic & herb butter', category: 'Mains', available: true, localFavorite: true },
    { name: 'Roast of the Day (Small)', price: 22, description: 'Slow cooked; served with roast potatoes, buttered vegetables, cheese sauce, and gravy', category: 'Mains', available: true },
    { name: 'Roast of the Day (Medium)', price: 28, description: 'Slow cooked; served with roast potatoes, buttered vegetables, cheese sauce, and gravy', category: 'Mains', available: true },
    { name: 'Roast of the Day (Large)', price: 35, description: 'Slow cooked; served with roast potatoes, buttered vegetables, cheese sauce, and gravy', category: 'Mains', available: true },
    { name: 'Beef Schnitzel', price: 34, description: 'Crumbed and beefed in house; served with chips and salad OR potatoes and seasonal vegetables; choice of gravy OR mushroom sauce', category: 'Mains', available: true },
    { name: 'Salmon', price: 34, description: 'Grilled fillet served with roasted potatoes, seasonal salad, and tartare sauce', category: 'Mains', available: true },
    { name: 'Lambs Fry & Bacon', price: 29, description: 'Pan-seared lamb liver in gravy; served with garlic smashed potatoes, bacon, and seasonal vegetables', category: 'Mains', available: true },
    { name: 'Pasta of the Day', price: 27, description: 'Ask waitstaff for today\'s flavor', category: 'Mains', available: true },
    { name: 'Mushroom Stack (Small)', price: 24, description: 'Pan-toasted portobello mushrooms, grilled halloumi, garlic toasted bread, and crisp lettuce', category: 'Mains', available: true },
    { name: 'Mushroom Stack (Large)', price: 30, description: 'Pan-toasted portobello mushrooms, grilled halloumi, garlic toasted bread, and crisp lettuce', category: 'Mains', available: true },
    { name: 'Garter Salad', price: 25, description: 'Ask waitstaff for today\'s flavors', category: 'Mains', available: true },
    { name: 'Cheese Rolls', price: 14, description: 'Three cheese rolls served with salad', category: 'Mains', available: true },

    // Desserts
    { name: 'Boysenberry ParFait', price: 14, description: 'Boysenberries, vanilla yoghurt, ice cream, and whipped cream', category: 'Desserts', available: true },
    { name: 'Homemade Cheesecake', price: 14, description: 'Served with vanilla ice cream and cream', category: 'Desserts', available: true, localFavorite: true },
    { name: 'Gooey Lemon', price: 14, description: 'Lemon cake topped with caramel sauce and lemon curd; served with cream and ice cream', category: 'Desserts', available: true },
    { name: 'Sticky Date', price: 14, description: 'Warm sticky date, caramel sauce, ice cream, and whipped cream', category: 'Desserts', available: true },
    { name: 'Mississippi Mud Cake', price: 14, description: 'Rich moist chocolate cake with vanilla ice cream and whipped cream', category: 'Desserts', available: true },
    { name: 'Dessert of the Day', price: 14, description: 'Ask waitstaff for today\'s flavor', category: 'Desserts', available: true },
    { name: 'Ice Cream Sunday (Small)', price: 8, description: 'Choice of raspberry, chocolate, caramel, or passionfruit sauce with whipped cream', category: 'Desserts', available: true },
    { name: 'Ice Cream Sunday (Large)', price: 13, description: 'Choice of raspberry, chocolate, caramel, or passionfruit sauce with whipped cream', category: 'Desserts', available: true },

    // Kids
    { name: 'Bowl of Chips', price: 10, description: 'Served with tomato sauce', category: 'Kids', available: true },
    { name: 'Fish & Chips', price: 14, description: 'Served with tomato sauce', category: 'Kids', available: true },
    { name: 'Chicken Nuggets & Chips', price: 14, description: 'Served with tomato sauce', category: 'Kids', available: true },
    { name: 'Mini Hotdog & Chips', price: 14, description: 'Served with tomato sauce', category: 'Kids', available: true },
    { name: 'Junior Roast of the Day', price: 14, description: 'Served with roast potatoes, vegetables, and cheese sauce', category: 'Kids', available: true },
    { name: 'Vegetable Bowl', price: 10, description: 'Steamed vegetables topped with cheesy sauce', category: 'Kids', available: true },
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
        const categories = ['Starters', 'Mains', 'Desserts', 'Kids'];
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
