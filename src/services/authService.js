const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

async function login({ email, password }) {
    if (!email || !password) {
        const error = new Error('Email dan password wajib diisi');
        error.statusCode = 400;
        throw error;
    }

    const user = await userModel.findByEmail(email);

    if (!user) {
        const error = new Error('Email atau password salah');
        error.statusCode = 401;
        throw error;
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        const error = new Error('Email atau password salah');
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign({
        id: user.id,
        username: user.username,
        shortname: user.shortname,
        email: user.email
    },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '10m' }
    );

    return {
        message: 'Login berhasil',
        token,
        user: {
            id: user.id,
            username: user.username,
            shortname: user.shortname,
            email: user.email
        }
    };
}

module.exports = {
    login
};