const pool = require('./db');

const findAll = async () => {
  try {
    const result = await pool.query('SELECT * FROM companies');
    return result.rows;
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw new Error('Internal Server Error');
  }
};

const findById = async (companyId) => {
  try {
    const result = await pool.query('SELECT * FROM companies WHERE id = $1', [companyId]);
    if (result.rows.length > 0) {
      return result.rows[0];
    } 
    return null;
  } catch (error) {
    console.error('Error fetching company:', error);
    throw new Error('Internal Server Error');
  }
};

module.exports = {
  findAll,
  findById,
};
