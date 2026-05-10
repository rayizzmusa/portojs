const db = require('../config/database');
const savingModel = require('../models/savingModel');
const activityService = require('../services/activityService');

async function getSavings() {
    const rayhan = await savingModel.getTotalByUserId(1);
    const syifa = await savingModel.getTotalByUserId(2);

    return {
        total: rayhan + syifa,
        rayhan,
        syifa
    };
}

async function addSaving({ userId, nominal, message, information_temp }) {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        const result = await savingModel.addSaving({ userId, nominal, message, connection });

        const savingId = result.insertId;

        const resultActivity = await activityService.addActivity(userId, 'pemasukan', nominal, information_temp);

        const activity_message = resultActivity.data.activity_message || "activity message not found";

        await connection.commit();

        return {
            message: 'Sukses Menambahkan Tabungan',
            data: {
                id: savingId,
                user_id: userId,
                type_activity: 'pemasukan',
                nominal,
                message,
                activity_message
            }
        };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

module.exports = {
    getSavings,
    addSaving
};