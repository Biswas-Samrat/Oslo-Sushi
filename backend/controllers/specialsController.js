const Special = require('../models/Special');

/**
 * Get active specials only (public)
 */
const getActiveSpecials = async (req, res) => {
    try {
        const now = new Date();

        const specials = await Special.find({
            status: 'active',
            startDate: { $lte: now },
            endDate: { $gte: now }
        }).sort({ startDate: 1 });
        console.log(`📡 Returning ${specials.length} active specials`);

        res.status(200).json({
            success: true,
            count: specials.length,
            data: specials
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching active specials',
            error: error.message
        });
    }
};

/**
 * Get all specials with optional status filter (Admin)
 */
const getAllSpecials = async (req, res) => {
    try {
        const { status } = req.query;

        let filter = {};
        if (status) filter.status = status;

        const specials = await Special.find(filter).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: specials.length,
            data: specials
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching specials',
            error: error.message
        });
    }
};

/**
 * Create one or multiple specials (Admin)
 * Accepts single object or array of objects
 */
const createSpecials = async (req, res) => {
    try {
        const data = Array.isArray(req.body) ? req.body : [req.body];

        const specials = await Special.insertMany(data);

        res.status(201).json({
            success: true,
            message: `${specials.length} special(s) created successfully`,
            data: specials
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error creating specials',
            error: error.message
        });
    }
};

/**
 * Update special (Admin)
 */
const updateSpecial = async (req, res) => {
    try {
        const special = await Special.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!special) {
            return res.status(404).json({
                success: false,
                message: 'Special not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Special updated successfully',
            data: special
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating special',
            error: error.message
        });
    }
};

/**
 * Stop a running special (Admin)
 * Changes status to 'stopped'
 */
const stopSpecial = async (req, res) => {
    try {
        const special = await Special.findByIdAndUpdate(
            req.params.id,
            { status: 'stopped' },
            { new: true }
        );

        if (!special) {
            return res.status(404).json({
                success: false,
                message: 'Special not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Special stopped successfully',
            data: special
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error stopping special',
            error: error.message
        });
    }
};

/**
 * Delete special (Admin)
 */
const deleteSpecial = async (req, res) => {
    try {
        const special = await Special.findByIdAndDelete(req.params.id);

        if (!special) {
            return res.status(404).json({
                success: false,
                message: 'Special not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Special deleted successfully',
            data: { id: req.params.id }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting special',
            error: error.message
        });
    }
};

/**
 * Restore special from history to active (Admin)
 */
const restoreSpecial = async (req, res) => {
    try {
        const special = await Special.findByIdAndUpdate(
            req.params.id,
            {
                status: 'active',
                // Optionally update dates if provided in body
                ...(req.body.startDate && { startDate: req.body.startDate }),
                ...(req.body.endDate && { endDate: req.body.endDate })
            },
            { new: true, runValidators: true }
        );

        if (!special) {
            return res.status(404).json({
                success: false,
                message: 'Special not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Special restored to active successfully',
            data: special
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error restoring special',
            error: error.message
        });
    }
};

module.exports = {
    getActiveSpecials,
    getAllSpecials,
    createSpecials,
    updateSpecial,
    stopSpecial,
    deleteSpecial,
    restoreSpecial
};
