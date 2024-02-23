const jobsModel = require('../models/jobsModel');
const { sendMessageToSQS } = require('./sqsService');

const create = async (job) => {
    const newJob = await jobsModel.create(job);
    await sendMessageToSQS(newJob);
    return { status: 'SUCCESSFUL', message: newJob };
};

module.exports = {
    create,
};
