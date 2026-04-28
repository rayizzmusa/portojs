const activityModel = require('../models/activityModel');

async function getLastTwoActivities() {
    const activities = await activityModel.getLastTwoActivities();
    return {
        activities : activities
    }
}

module.exports = {
    getLastTwoActivities
};