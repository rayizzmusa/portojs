const path = require('path');

function getLoginPage(req, res) {
    if (req.user) return res.redirect('/dashboard');
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'login.html'));
}

function getDashboardPage(req, res) {
    res.render('pages/dashboard', {
        title: 'Dashboard'
    });
}

function getSavingFormPage(req, res) {
    res.render('pages/addSaving', {
        title: 'Tambah Tabungan'
    });
}

function logout(req, res) {
    res.clearCookie('token');
    res.redirect('/');
}

module.exports = {
    getLoginPage,
    getDashboardPage,
    getSavingFormPage,
    logout
};