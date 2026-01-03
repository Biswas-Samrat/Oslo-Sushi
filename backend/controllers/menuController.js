const MenuItem = require('../models/MenuItem');

/**
 * Get all menu items
 */
const getAllMenuItems = async (req, res) => {
    try {
        const { category, available } = req.query;

        let filter = {};
        if (category) filter.category = category;
        if (available !== undefined) filter.available = available === 'true';

        const menuItems = await MenuItem.find(filter).sort({ category: 1, name: 1 });
        console.log(`📡 Returning ${menuItems.length} menu items`);

        res.status(200).json({
            success: true,
            count: menuItems.length,
            data: menuItems
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching menu items',
            error: error.message
        });
    }
};

/**
 * Get single menu item by ID
 */
const getMenuItemById = async (req, res) => {
    try {
        const menuItem = await MenuItem.findById(req.params.id);

        if (!menuItem) {
            return res.status(404).json({
                success: false,
                message: 'Menu item not found'
            });
        }

        res.status(200).json({
            success: true,
            data: menuItem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching menu item',
            error: error.message
        });
    }
};

/**
 * Create new menu item (Admin only)
 */
const createMenuItem = async (req, res) => {
    try {
        const menuItem = await MenuItem.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Menu item created successfully',
            data: menuItem
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error creating menu item',
            error: error.message
        });
    }
};

/**
 * Update menu item (Admin only)
 */
const updateMenuItem = async (req, res) => {
    try {
        const menuItem = await MenuItem.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!menuItem) {
            return res.status(404).json({
                success: false,
                message: 'Menu item not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Menu item updated successfully',
            data: menuItem
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating menu item',
            error: error.message
        });
    }
};

/**
 * Delete menu item (Admin only)
 */
const deleteMenuItem = async (req, res) => {
    try {
        const menuItem = await MenuItem.findByIdAndDelete(req.params.id);

        if (!menuItem) {
            return res.status(404).json({
                success: false,
                message: 'Menu item not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Menu item deleted successfully',
            data: { id: req.params.id }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting menu item',
            error: error.message
        });
    }
};

module.exports = {
    getAllMenuItems,
    getMenuItemById,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem
};
