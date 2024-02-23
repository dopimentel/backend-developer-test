const jobsService = require('../services/jobsService');

const findAll = async (req, res) => {
    if (req.query.status) {
        const { status } = req.query;
        const serviceResponse = await jobsService.findAll(status);
        if (serviceResponse.status === 'SUCCESSFUL') {
            return res.status(200).json(serviceResponse.message);
        }
        return res.status(500).json({ data: serviceResponse.message });
    }
    const serviceResponse = await jobsService.findAll('published');
    if (serviceResponse.status === 'SUCCESSFUL') {
        return res.status(200).json(serviceResponse.message);
    }
    return res.status(500).json({ data: serviceResponse.message });
    };

module.exports = {
    findAll,
};