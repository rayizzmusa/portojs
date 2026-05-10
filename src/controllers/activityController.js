const activityService = require('../services/activityService');

async function getLastTwoActivities(req, res) {
    try {
        const activities = await activityService.getLastTwoActivities();
        return res.json(activities);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function getTypeActivity(req, res) {
    try {
        const typeActivity = await activityService.getTypeActivity(req.params.type);
        return res.json(typeActivity);
    } catch (err) {
        if (err.statusCode) {
            return res.status(err.statusCode).json({ message: err.message });
        }

        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getLastTwoActivities,
    getTypeActivity
};