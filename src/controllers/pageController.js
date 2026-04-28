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

function logout(req, res) {
    res.clearCookie('token');
    res.redirect('/');
}

module.exports = {
    getLoginPage,
    getDashboardPage,
    logout
};