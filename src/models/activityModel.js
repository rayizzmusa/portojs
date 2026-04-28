const db = require('../config/database');

async function getLastTwoActivities() {
    const [rows] = await db.execute('SELECT * FROM activities ORDER BY id DESC LIMIT 2;');
    return rows;
}

module.exports = {
    getLastTwoActivities
};