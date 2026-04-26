const savingModel = require('../models/savingModel');

async function getSavings() {
    const rayhan = await savingModel.getTotalByUserId(1);
    const syifa = await savingModel.getTotalByUserId(2);

    return {
        total: rayhan + syifa,
        rayhan,
        syifa
    };
}

module.exports = {
    getSavings
};