const jobsModel = require('../models/jobsModel');
const { sendMessageToSQS } = require('./sqsService');

const findAll = async (status) => {
    if (status) {
        const jobs = await jobsModel.findAll(status);
        return { status: 'SUCCESSFUL', message: jobs };
    }
    const jobs = await jobsModel.findAll();

    return { status: 'SUCCESSFUL', message: jobs };
};

const create = async (job) => {
    const newJob = await jobsModel.create(job);
    await sendMessageToSQS(newJob);
    return { status: 'SUCCESSFUL', message: newJob };
};

module.exports = {
    findAll,
    create,
};
