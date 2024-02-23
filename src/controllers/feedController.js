const jobsService = require('../services/jobsService');

const findAll = async (_req, res) => {
    const serviceResponse = await jobsService.findAll();
    if (serviceResponse.status === 'SUCCESSFUL') {
        return res.status(200).json(serviceResponse.message);
    }
    return res.status(500).json({ data: serviceResponse.message });
    };

module.exports = {
    findAll,
};