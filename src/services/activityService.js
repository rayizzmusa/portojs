const activityModel = require('../models/activityModel');
const userModel = require('../models/userModel');

async function getLastTwoActivities() {
    const activities = await activityModel.getLastTwoActivities();
    return {
        activities: activities
    }
}

async function getTypeActivity(type) {
    const typeActivity = await activityModel.getInformation(type);

    if (!typeActivity) {
        const error = new Error('infromation temp not found');
        error.statusCode = 401;
        throw error;
    }

    return { information_temp: typeActivity.information_temp, message: 'success' }
}

async function addActivity(userId, type_activity, nominal, information_temp) {
    const user = await userModel.findById(userId);

    if (!user) {
        const error = new Error('user not found');
        error.statusCode = 401;
        throw error;
    }

    const userShortName = user.shortname;
    const activity_message = `${userShortName} ${information_temp} <b>Rp. ${nominal}</b>`;

    const addResult = await activityModel.addActivity(userId, type_activity, activity_message);

    return {
        message: 'add activity success',
        data: {
            id: addResult.id,
            user_id: addResult.user_id,
            type_activity: addResult.type_activity,
            activity_message: addResult.activity_message,
            created_at: addResult.created_at
        }
    }
}

module.exports = {
    getLastTwoActivities,
    getTypeActivity,
    addActivity
};