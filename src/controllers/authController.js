const authService = require('../services/authService');

async function login(req, res) {
    const { email, password } = req.body;

    try {
        const result = await authService.login({ email, password });
        res.cookie('token', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000
        });

        return res.json({
            message: result.message,
            user: result.user
        });
    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).json({ message: error.message });
        }

        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function logout(req, res) {
    res.clearCookie('token');
    res.redirect('/');
}

module.exports = {
    login, logout
};