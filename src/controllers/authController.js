const authService = require('../services/authService');

async function login(req, res) {
    const { email, password } = req.body;

    try {
        const result = await authService.login({ email, password });
        return res.json(result);
    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).json({ message: error.message });
        }

        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    login
};