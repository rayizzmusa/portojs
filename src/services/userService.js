const userModel = require('../models/userModel');

async function getUserProfile(userId){
    const user = await userModel.findById(userId);
    
    if(!user){
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }

    return {
        message: 'User profile fetched successfully',
        user: {
            id: user.id,
            username: user.username,
            email: user.email
        }
    }
}

module.exports = {
    getUserProfile
}