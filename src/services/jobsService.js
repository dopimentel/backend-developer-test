const jobsModel = require('../models/jobsModel');

const create = async (job) => {
    const newJob = await jobsModel.create(job);
    return { status: 'SUCCESSFUL', message: newJob };
};

module.exports = {
    create,
};
