const savingService = require('../services/savingService');

async function getSavings(req, res) {
    try {
        const result = await savingService.getSavings();
        return res.json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getSavings
};