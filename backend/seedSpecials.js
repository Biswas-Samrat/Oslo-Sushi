require('dotenv').config();
const mongoose = require('mongoose');
const Special = require('./models/Special');

// Force start date to be 1 hour ago to ensure it's "active" now
const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

const specialData = [
    {
        title: 'Chef\'s Signature Roast Lamb',
        description: 'Slow-roasted Otago lamb shoulder with rosemary, garlic, honey-glazed carrots, and mint jus.',
        price: 38,
        category: 'Main',
        startDate: oneHourAgo,
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        available: true,
        status: 'active',
        localFavorite: true,
        tags: ['Seasonal', 'Chef\'s Pick']
    },
    {
        title: 'Fresh Oamaru Blue Cod',
        description: 'Caught this morning, pan-seared with lemon butter, capers, and seasonal greens.',
        price: 34,
        category: 'Main',
        startDate: oneHourAgo,
        endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        available: true,
        status: 'active',
        localFavorite: true,
        tags: ['Fresh Catch']
    }
];

async function seedSpecials() {
    try {
        console.log('🔄 Connecting to MongoDB for Specials...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB connected!');

        console.log('🗑️  Clearing existing specials...');
        await Special.deleteMany({});

        console.log('📝 Inserting specials...');
        const items = await Special.insertMany(specialData);

        console.log(`✅ Successfully inserted ${items.length} specials!`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding specials:', error.message);
        process.exit(1);
    }
}

seedSpecials();
