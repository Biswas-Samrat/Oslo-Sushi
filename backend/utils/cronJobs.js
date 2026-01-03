const Special = require('../models/Special');

/**
 * Cron job function to automatically expire specials
 * Runs hourly to check for specials that have passed their endDate
 */
const expireSpecials = async () => {
    try {
        const now = new Date();

        // Find all active specials that have expired
        const result = await Special.updateMany(
            {
                status: 'active',
                endDate: { $lt: now }
            },
            {
                $set: { status: 'history' }
            }
        );

        if (result.modifiedCount > 0) {
            console.log(`✅ Expired ${result.modifiedCount} special(s) and moved to history`);
        } else {
            console.log('ℹ️  No specials to expire');
        }

        return result;
    } catch (error) {
        console.error('❌ Error expiring specials:', error.message);
        return null;
    }
};

module.exports = { expireSpecials };
