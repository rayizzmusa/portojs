const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('./config/env');

const webRoutes = require('./routes/webRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api', authRoutes);
app.use('/', webRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Route tidak ditemukan' });
});

module.exports = app;