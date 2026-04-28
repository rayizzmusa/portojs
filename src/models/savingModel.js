const db = require('../config/database');

async function getTotalByUserId(userId) {
    const [rows] = await db.execute('SELECT COALESCE(SUM(nominals), 0) as total FROM savings where user_id = ? and type_activity = ?', [userId, 'pemasukan']);
    return Number(rows[0].total || 0);
}

async function addSaving(userId, nominals, message) {
    const [rows] = await db.execute('INSERT INTO savings (user_id, type_activity, nominals, message) VALUES (?, ?, ?, ?)', [userId, 'pemasukan', nominals, message]);
    return rows;
}

module.exports = {
    getTotalByUserId
};