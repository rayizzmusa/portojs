const db = require('../config/database');

async function getLastTwoActivities() {
    const [rows] = await db.execute('SELECT * FROM activities ORDER BY id DESC LIMIT 2;');
    return rows;
}

async function getInformation(type) {
    const [rows] = await db.execute('SELECT information_temp FROM activity_master WHERE type = ? ORDER BY id DESC LIMIT 1;', [type]);
    return rows[0] || null;
}

async function addActivity(userId, type, activity_message) {
    const [rows] = await db.execute('INSERT INTO activities (user_id, type_activity, activity_message) VALUES (?, ?, ?)', [userId, type, activity_message]);
    return rows;
}

module.exports = {
    getLastTwoActivities,
    getInformation,
    addActivity
};