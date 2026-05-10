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

async function addSaving(req, res) {
    const { nominal, pesan } = req.body;
    const userId = req.user.id;
    const information_temp = req.params.information_temp;

    try {
        const addSaving = await savingService.addSaving({
            userId,
            nominal,
            message: pesan,
            information_temp
        });
        return res.json(addSaving);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Gagal menambahkan tabungan' });
    }
}

module.exports = {
    getSavings,
    addSaving
};