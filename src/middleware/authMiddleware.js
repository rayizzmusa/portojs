// src/middleware/authMiddleware.js
const authMiddleware = (req, res, next) => {
    if (!req.user) return res.redirect('/');
    next();
};

module.exports = authMiddleware;