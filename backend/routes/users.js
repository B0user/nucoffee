import express from 'express';
import * as UserController from '../controllers/UserController.js';

const router = express.Router();

import { checkAdmin, checkAuth } from '../utils/checkAdmin.js';
import {
    validateRegister,
    validateLogin,
    validateUpdateUser,
    validateChangePassword,
    validateAddLoyaltyPoints,
    validateAddSpending,
    validateUserQuery
} from '../utils/validation.js';



// Authentication routes
router.post('/register', validateRegister, UserController.register);
router.post('/login', validateLogin, UserController.login);

// Public
// router.get('/', checkAdmin, validateUserQuery, UserController.getAllUsers);
// router.get('/search', checkAdmin, UserController.searchUsers);
// router.get('/stats', checkAdmin, UserController.getUserStats);

// Authenticated
router.get('/me', checkAuth, UserController.getCurrentUser);
router.put('/me', checkAuth, UserController.updateCurrentUser);
// router.put('/:id', checkAdmin, validateUpdateUser, UserController.updateUser);
// router.get('/:id', checkAdmin, UserController.getUserById);
// router.delete('/:id', checkAdmin, UserController.deleteUser);
// router.patch('/:id/deactivate', checkAdmin, UserController.deactivateUser);
// router.patch('/:id/reactivate', checkAdmin, UserController.reactivateUser);
// router.put('/:id/password', checkAdmin, validateChangePassword, UserController.changePassword);
// router.post('/:userId/loyalty-points', checkAdmin, validateAddLoyaltyPoints, UserController.addLoyaltyPoints);
// router.post('/:userId/spending', checkAdmin, validateAddSpending, UserController.addSpending);

// Custom
// router.post('/getTelegramId', UserController.getTelegramId);
// router.post('/getLikedUsers', UserController.getLikedUsers);
// router.post('/createInvoiceLink', UserController.createInvoiceLink);
// router.delete('/', UserController.deleteUser);

export default router;
