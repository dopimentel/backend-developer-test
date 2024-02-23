const companiesService = require('../services/companiesService');

const findAll = async (_req, res) => {
  const serviceResponse = await companiesService.findAll();
  if (serviceResponse.status === 'SUCCESSFUL') {
    return res.status(200).json(serviceResponse.message);
  }
  return res.status(500).json({ message: serviceResponse.message });  
};

const findById = async (req, res) => {
  const { id } = req.params;
  const serviceResponse = await companiesService.findById(id);
  if (serviceResponse.status === 'SUCCESSFUL') {
    return res.status(200).json(serviceResponse.message);
  }
  return res.status(404).json({ message: serviceResponse.message });
};

module.exports = {
  findAll,
  findById,
};