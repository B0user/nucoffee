import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const checkAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'Invalid token.' });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin role required.' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Admin auth error:', error);
        res.status(401).json({ message: 'Invalid token.' });
    }
};

export const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'Invalid token.' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth error:', error);
        res.status(401).json({ message: 'Invalid token.' });
    }
};
