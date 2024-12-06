const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid Token' });
        req.user = user;
        next();
    });
};

const authorizeAdmin = (req, res, next) => {
    const adminApiKey = process.env.ADMIN_API_KEY;
    const requestApiKey = req.header('X-API-KEY');

    if (!adminApiKey || requestApiKey !== adminApiKey) {
        return res.status(403).json({ message: 'Forbidden: Invalid API key' });
    }

    next();
};


module.exports = { authenticateToken, authorizeAdmin };
