import express from 'express';
import * as OrderController from '../controllers/OrderController.js'; // Include `.js` at the end in ESM
const router = express.Router();

import { checkAdmin, checkAuth } from '../utils/checkAdmin.js';
import {
    validateCreateOrder,
    validateOrderId,
    validateUserId,
    validateUpdateOrderStatus,
    validateOrderQuery,
} from '../utils/validation.js';


router.post('/', checkAuth, validateCreateOrder, OrderController.createOrder);
// router.get('/', checkAdmin, validateOrderQuery, OrderController.getAllOrders);
// router.get('/:id', checkAuth, validateOrderId, OrderController.getOrderById);
// router.get('/user/:userId', checkAuth, validateUserId, OrderController.getUserOrders);
// router.patch('/:id/status', checkAdmin, validateUpdateOrderStatus, OrderController.updateOrderStatus);
// router.get('/stats', checkAdmin, OrderController.getOrderStats);

export default router;