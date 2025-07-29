const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/ItemController');
import { checkAdmin, checkAuth } from '../utils/checkAdmin.js';
import {
    validateCreateItem,
    validateUpdateItem,
    validateItemId,
    validateItemQuery,
} from '../utils/validation.js';
// Public
router.get('/', validateItemQuery, ItemController.getAllItems);
router.get('/featured', ItemController.getFeaturedItems);
router.get('/:id', validateItemId, ItemController.getItemById);

// Admin
router.post('/', checkAdmin, validateCreateItem, ItemController.createItem);
router.put('/:id', checkAdmin, validateUpdateItem, ItemController.updateItem);
router.delete('/:id', checkAdmin, validateItemId, ItemController.deleteItem);
router.patch('/:id/stock', checkAdmin, validateItemId, ItemController.updateItemStock);

export default router;
