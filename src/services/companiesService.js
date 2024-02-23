const companiesModel = require('../models/companiesModel');

const findAll = async () => {
    const companies = await companiesModel.findAll();
    return { status: 'SUCCESSFUl', message: companies };
};

const findById = async (companyId) => {
    const company = await companiesModel.findById(companyId);
    if (!company) return { status: 'NOT_FOUND', message: 'Company not found' };
    return { status: 'SUCCESSFUL', message: company };
};

module.exports = {
    findAll,
    findById,
};