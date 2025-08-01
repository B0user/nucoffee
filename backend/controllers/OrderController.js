import Order from '../models/Order.js';
import User from '../models/User.js';
import Item from '../models/Item.js';
import { validationResult } from 'express-validator';
import telegramBot from '../utils/telegramBot.js';

// Create new order
export const createOrder = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            client,
            items,
            totalAmount
        } = req.body;

        // Validate user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate items exist and are available
        // for (const item of items) {
        //     const itemDoc = await Item.findById(item.itemId);
        //     if (!itemDoc) {
        //         return res.status(404).json({ message: `Item ${item.name} not found` });
        //     }
        //     if (!itemDoc.isAvailable) {
        //         return res.status(400).json({ message: `Item ${item.name} is not available` });
        //     }
        //     if (itemDoc.stock < item.quantity) {
        //         return res.status(400).json({ message: `Insufficient stock for ${item.name}` });
        //     }
        // }

        const newOrder = new Order({
            client,
            items,
            totalAmount
        });

        const savedOrder = await newOrder.save();

        // Update stock for items
        // for (const item of items) {
        //     await Item.findByIdAndUpdate(item.itemId, {
        //         $inc: { stock: -item.quantity }
        //     });
        // }

        // Send order to admin via Telegram
        // userId or chatId difference?
        // savedOrder format
        await telegramBot.sendOrderNotification(savedOrder, user);

        res.status(201).json(savedOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
};

// Get all orders (admin)
export const getAllOrders = async (req, res) => {
    try {
        const { status, userId } = req.query;
        let filter = {};

        if (status) filter.status = status;
        if (userId) filter.userId = userId;

        const orders = await Order.find(filter)
            .populate('userId', 'name telegramId')
            .sort({ createdAt: -1 });

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error getting orders:', error);
        res.status(500).json({ message: 'Error getting orders', error: error.message });
    }
};

// Get order by ID
export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id)
            .populate('userId', 'name telegramId')
            .populate('items.itemId');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error('Error getting order:', error);
        res.status(500).json({ message: 'Error getting order', error: error.message });
    }
};

// Get user orders
export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId })
            .populate('items.itemId')
            .sort({ createdAt: -1 });

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error getting user orders:', error);
        res.status(500).json({ message: 'Error getting user orders', error: error.message });
    }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, adminNotes } = req.body;

        const order = await Order.findById(id).populate('userId');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const oldStatus = order.status;
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status, adminNotes },
            { new: true, runValidators: true }
        );

        // Send status update to Telegram
        await telegramBot.sendStatusUpdate(id, oldStatus, status, order.userId);

        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Error updating order status', error: error.message });
    }
};



// Get order statistics
export const getOrderStats = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const pendingOrders = await Order.countDocuments({ status: 'pending' });
        const completedOrders = await Order.countDocuments({ status: 'delivered' });
        const totalRevenue = await Order.aggregate([
            { $match: { status: { $in: ['delivered', 'ready'] } } },
            { $group: { _id: null, total: { $sum: '$totalAmount' } } }
        ]);

        const stats = {
            totalOrders,
            pendingOrders,
            completedOrders,
            totalRevenue: totalRevenue[0]?.total || 0
        };

        res.status(200).json(stats);
    } catch (error) {
        console.error('Error getting order stats:', error);
        res.status(500).json({ message: 'Error getting order stats', error: error.message });
    }
}; 