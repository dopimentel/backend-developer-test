const jobsService = require('../services/jobsService');

const create = async (req, res) => {
    const job = req.body;
    const serviceResponse = await jobsService.create(job);
    if (serviceResponse.status === 'SUCCESSFUL') {
        return res.status(201).json(serviceResponse.message);
    }
    return res.status(500).json({ message: serviceResponse.message });
    };

module.exports = {
    create,
};