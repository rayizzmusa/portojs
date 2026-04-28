require('./config/env');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressLayouts = require('express-ejs-layouts');
const jwt = require('jsonwebtoken');


const webRoutes = require('./routes/webRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/notyf', express.static(path.join(__dirname, '..', 'node_modules/notyf')));

app.use((req, res, next) => {
    try {
        const token = req.cookies.token;
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decoded;
            res.locals.userName = decoded.username; // otomatis tersedia di semua view
            res.locals.shortName = decoded.shortname;
        } else {
            req.user = null;
            res.locals.userName = null;
        }
    } catch {
        req.user = null;
        res.locals.userName = null;
    }
    next();
});

app.use('/api', authRoutes);
app.use('/', webRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Route tidak ditemukan' });
});

module.exports = app;