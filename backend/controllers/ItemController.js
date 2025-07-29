import Item from '../models/Item.js';
import { validationResult } from 'express-validator';

// Create new item
export const createItem = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, description, price, category, image, stock, featured } = req.body;

        const newItem = new Item({
            name,
            description,
            price,
            category,
            image,
            stock,
            featured
        });

        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        console.error('Error creating item:', error);
        res.status(500).json({ message: 'Error creating item', error: error.message });
    }
};

// Get all items
export const getAllItems = async (req, res) => {
    try {
        const { category, featured, available } = req.query;
        let filter = {};

        if (category) filter.category = category;
        if (featured === 'true') filter.featured = true;
        if (available === 'true') filter.isAvailable = true;

        const items = await Item.find(filter).sort({ createdAt: -1 });
        res.status(200).json(items);
    } catch (error) {
        console.error('Error getting items:', error);
        res.status(500).json({ message: 'Error getting items', error: error.message });
    }
};

// Get item by ID
export const getItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Item.findById(id);
        
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        
        res.status(200).json(item);
    } catch (error) {
        console.error('Error getting item:', error);
        res.status(500).json({ message: 'Error getting item', error: error.message });
    }
};

// Update item
export const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedItem = await Item.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json(updatedItem);
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ message: 'Error updating item', error: error.message });
    }
};

// Delete item
export const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await Item.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ message: 'Error deleting item', error: error.message });
    }
};

// Get featured items
export const getFeaturedItems = async (req, res) => {
    try {
        const items = await Item.find({ featured: true, isAvailable: true })
            .sort({ createdAt: -1 })
            .limit(10);
        
        res.status(200).json(items);
    } catch (error) {
        console.error('Error getting featured items:', error);
        res.status(500).json({ message: 'Error getting featured items', error: error.message });
    }
};

// Update item stock
export const updateItemStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { stock } = req.body;

        const updatedItem = await Item.findByIdAndUpdate(
            id,
            { stock },
            { new: true, runValidators: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json(updatedItem);
    } catch (error) {
        console.error('Error updating item stock:', error);
        res.status(500).json({ message: 'Error updating item stock', error: error.message });
    }
}; 