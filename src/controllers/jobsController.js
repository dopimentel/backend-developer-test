const jobsService = require('../services/jobsService');

const create = async (req, res) => {
    const job = req.body;
    const serviceResponse = await jobsService.create(job);
    if (serviceResponse.status === 'SUCCESSFUL') {
        return res.status(201).json(serviceResponse.message);
    }
    return res.status(500).json({ message: serviceResponse.message });
    };

const publish = async (req, res) => {
    const { id } = req.params;
    const serviceResponse = await jobsService.publish(id);
    if (serviceResponse.status === 'SUCCESSFUL') {
        return res.status(200).json(serviceResponse.message);
    }
    return res.status(500).json({ message: serviceResponse.message });
    };

const update = async (req, res) => {
    const { id } = req.params;
    const job = req.body;
    const serviceResponse = await jobsService.update(id, job);
    if (serviceResponse.status === 'SUCCESSFUL') {
        return res.status(200).json(serviceResponse.message);
    }
    return res.status(500).json({ message: serviceResponse.message });
    };

const remove = async (req, res) => {
    const { id } = req.params;
    const serviceResponse = await jobsService.remove(id);
    if (serviceResponse.status === 'SUCCESSFUL') {
        return res.status(204).json(serviceResponse.message);
    }
    return res.status(500).json({ message: serviceResponse.message });
    };

module.exports = {
    create,
    publish,
    update,
    remove,
};