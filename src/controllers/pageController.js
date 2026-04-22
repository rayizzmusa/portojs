const path = require('path');

function getLoginPage(req, res) {
    return res.sendFile(path.join(__dirname, '..', '..', 'views', 'index.html'));
}

function getDashboardPage(req, res) {
    return res.sendFile(path.join(__dirname, '..', '..', 'views', 'dashboard.html'));
}

module.exports = {
    getLoginPage,
    getDashboardPage
};