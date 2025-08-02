import { body, param, query } from 'express-validator';

// Item validation
export const validateCreateItem = [
    body('name')
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('Name is required and must be between 1 and 100 characters'),
    body('price')
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),
    body('category')
        .isIn(['coffee', 'tea', 'snacks', 'accessories', 'other'])
        .withMessage('Category must be one of: coffee, tea, snacks, accessories, other'),
    body('stock')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Stock must be a non-negative integer'),
    body('featured')
        .optional()
        .isBoolean()
        .withMessage('Featured must be a boolean')
];

export const validateUpdateItem = [
    param('id')
        .isMongoId()
        .withMessage('Invalid item ID'),
    body('name')
        .optional()
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('Name must be between 1 and 100 characters'),
    body('price')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),
    body('category')
        .optional()
        .isIn(['coffee', 'tea', 'snacks', 'accessories', 'other'])
        .withMessage('Category must be one of: coffee, tea, snacks, accessories, other'),
    body('stock')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Stock must be a non-negative integer'),
    body('featured')
        .optional()
        .isBoolean()
        .withMessage('Featured must be a boolean')
];

export const validateItemId = [
    param('id')
        .isMongoId()
        .withMessage('Invalid item ID')
];

// Order validation
export const validateCreateOrder = [
    body('userId')
        .isMongoId()
        .withMessage('Invalid user ID'),
    body('items')
        .isArray({ min: 1 })
        .withMessage('At least one item is required'),
    body('items.*.itemId')
        .isMongoId()
        .withMessage('Invalid item ID'),
    body('items.*.name')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Item name is required'),
    body('items.*.price')
        .isFloat({ min: 0 })
        .withMessage('Item price must be a positive number'),
    body('items.*.quantity')
        .isInt({ min: 1 })
        .withMessage('Item quantity must be at least 1'),
    body('totalAmount')
        .isFloat({ min: 0 })
        .withMessage('Total amount must be a positive number'),
    body('paymentMethod')
        .optional()
        .isIn(['cash', 'card', 'online'])
        .withMessage('Payment method must be one of: cash, card, online'),
    body('deliveryAddress')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Delivery address must be less than 500 characters'),
    body('deliveryTime')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Delivery time must be less than 100 characters'),
    body('specialInstructions')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('Special instructions must be less than 1000 characters')
];

export const validateOrderId = [
    param('id')
        .isMongoId()
        .withMessage('Invalid order ID')
];

export const validateUserId = [
    param('userId')
        .isMongoId()
        .withMessage('Invalid user ID')
];

export const validateUpdateOrderStatus = [
    param('id')
        .isMongoId()
        .withMessage('Invalid order ID'),
    body('status')
        .isIn(['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'])
        .withMessage('Invalid order status'),
    body('adminNotes')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('Admin notes must be less than 1000 characters')
];

// User validation
export const validateRegister = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address'),
    body('name')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters'),
    body('phone')
        .trim()
        .isLength({ min: 10, max: 15 })
        .withMessage('Phone number must be between 10 and 15 characters')
];

export const validateLogin = [
    body('telegramId')
        .trim()
        .isLength({ min: 1, max: 50 })
        .withMessage('Telegram ID must be between 1 and 50 characters')
];

export const validateUpdateUser = [
    param('id')
        .isMongoId()
        .withMessage('Invalid user ID'),
    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters'),
    body('phone')
        .optional()
        .trim()
        .isLength({ min: 10, max: 15 })
        .withMessage('Phone number must be between 10 and 15 characters'),
    body('avatar')
        .optional()
        .trim()
        .isURL()
        .withMessage('Avatar must be a valid URL'),
    body('favoriteDrinks')
        .optional()
        .isArray()
        .withMessage('Favorite drinks must be an array'),
    body('dietaryRestrictions')
        .optional()
        .isArray()
        .withMessage('Dietary restrictions must be an array'),
    body('preferredMilk')
        .optional()
        .isIn(['regular', 'skim', 'almond', 'soy', 'oat', 'coconut', 'none'])
        .withMessage('Preferred milk must be one of: regular, skim, almond, soy, oat, coconut, none'),
    body('preferredSweetener')
        .optional()
        .isIn(['none', 'sugar', 'honey', 'stevia', 'splenda', 'agave'])
        .withMessage('Preferred sweetener must be one of: none, sugar, honey, stevia, splenda, agave'),
    body('addresses')
        .optional()
        .isArray()
        .withMessage('Addresses must be an array'),
    body('notificationPreferences')
        .optional()
        .isObject()
        .withMessage('Notification preferences must be an object'),
    body('telegramId')
        .optional()
        .trim()
        .isLength({ min: 1, max: 50 })
        .withMessage('Telegram ID must be between 1 and 50 characters'),
    body('telegramUsername')
        .optional()
        .trim()
        .isLength({ min: 1, max: 50 })
        .withMessage('Telegram username must be between 1 and 50 characters')
];

export const validateChangePassword = [
    body('currentPassword')
        .notEmpty()
        .withMessage('Current password is required'),
    body('newPassword')
        .isLength({ min: 6 })
        .withMessage('New password must be at least 6 characters long')
];

export const validateAddLoyaltyPoints = [
    param('userId')
        .isMongoId()
        .withMessage('Invalid user ID'),
    body('points')
        .isInt({ min: 1 })
        .withMessage('Points must be a positive integer')
];

export const validateAddSpending = [
    param('userId')
        .isMongoId()
        .withMessage('Invalid user ID'),
    body('amount')
        .isFloat({ min: 0 })
        .withMessage('Amount must be a positive number')
];

// Query validation
export const validateItemQuery = [
    query('category')
        .optional()
        .isIn(['coffee', 'tea', 'snacks', 'accessories', 'other'])
        .withMessage('Invalid category'),
    query('featured')
        .optional()
        .isIn(['true', 'false'])
        .withMessage('Featured must be true or false'),
    query('available')
        .optional()
        .isIn(['true', 'false'])
        .withMessage('Available must be true or false')
];

export const validateOrderQuery = [
    query('status')
        .optional()
        .isIn(['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'])
        .withMessage('Invalid order status'),
    query('userId')
        .optional()
        .isMongoId()
        .withMessage('Invalid user ID')
];

export const validateUserQuery = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),
    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit must be between 1 and 100'),
    query('role')
        .optional()
        .isIn(['user', 'admin'])
        .withMessage('Role must be user or admin'),
    query('isActive')
        .optional()
        .isIn(['true', 'false'])
        .withMessage('isActive must be true or false'),
    query('membershipLevel')
        .optional()
        .isIn(['bronze', 'silver', 'gold', 'platinum'])
        .withMessage('Invalid membership level')
]; 