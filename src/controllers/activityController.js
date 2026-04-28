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

module.exports = {
    getLastTwoActivities
};