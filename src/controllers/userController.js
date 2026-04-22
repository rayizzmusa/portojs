const userService = require('../services/userService');

async function getProfile(req, res){
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const token = authHeader.split(' ')[1];

        const userId = token.replace('session-', '');

        if(!userId){
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await userService.getUserProfile(userId);

        return res.json(user);

    }catch (error){
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getProfile
}