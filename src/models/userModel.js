const db = require('../config/database');

async function findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0] || null;
}

async function findById(id) {
    const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0] || null;
}

module.exports = {
    findByEmail,
    findById
};