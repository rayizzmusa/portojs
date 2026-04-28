const db = require('../config/database');

async function getLastTwoActivities() {
    const [rows] = await db.execute('SELECT * FROM activities ORDER BY id DESC LIMIT 2;');
    return rows;
}

async function getInformation(type) {
    const [rows] = await db.execute('SELECT information_temp FROM activity WHERE type = ? ORDER BY id DESC LIMIT 1;', [type]);
    return rows[0] || null;
}

module.exports = {
    getLastTwoActivities
};